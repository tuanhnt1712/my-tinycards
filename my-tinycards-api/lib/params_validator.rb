module ParamsValidator
  extend ActiveSupport::Concern

  included do
    def validate_params attrs
      missing_attrs = check_require_attributes attrs, params
      raise APIError::Params::Missing.new(missing_attrs) unless missing_attrs.empty?
    end

    private
    def has_all_param_attributes? attrs
      check_require_attributes attrs, params
    end

    def check_require_attributes attrs, params, missing_attrs = []
      attrs.each do |param|
        case param
        when Symbol
          missing_attrs << param unless params.has_key?(param.to_s)
        when Hash
          param.keys.each do |param_key|
            if has_nested_attribute?(params, param_key.to_s)
              check_require_attributes param[param_key], params[param_key], missing_attrs
            else
              missing_attrs << param_key
            end
          end
        end
      end
      missing_attrs
    end

    def has_nested_attribute? params, param_key
      params[param_key] && (params[param_key].is_a?(ActionController::Parameters) || params[param_key].present?)
    end
  end

  class_methods do
    def validate_params options = {}
      attrs = options[:require] || []
      action_options = options[:on] || []

      if attrs && attrs.any?
        actions = action_options.empty? ? {} : {only: action_options}
        before_action(actions) do
          validate_params(attrs)
        end
      end
    end
  end
end
