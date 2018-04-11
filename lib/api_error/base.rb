module APIError
  class Base < StandardError
    include ActiveModel::Serialization

    attr_reader :code, :message

    def initialize
      error_type = I18n.t self.class.name.underscore.gsub(%r{\/}, ".")
      error_type.each do |attr, value|
        instance_variable_set("@#{attr}".to_sym, value)
      end
    end
  end

  #raise error in controller, example: raise APIError::Client::NotFound.new unless User.find(1)
  module Client
    class NotFound < APIError::Base
    end
    class InvalidAccessToken < APIError::Base
    end
    class AccessDeny < APIError::Base
    end
    class AppExpired < APIError::Base
    end
  end

  module Params
    class Required < APIError::Base
    end

    class Missing < APIError::Base
      attr_reader :error_fields

      def initialize error_fields
        error_type = I18n.t self.class.name.underscore.gsub(%r{\/}, ".")
        error_type.each do |attr, value|
          instance_variable_set("@#{attr}".to_sym, value)
        end
        @error_fields = error_fields
      end
    end
  end

  module Server
    class InternalError < APIError::Base
    end
    class BadGateway < APIError::Base
    end
  end

  module Authorize
    class TokenExpired < APIError::Base
    end

    class TokenUnknown < APIError::Base
    end

    class DoorkeeperError < APIError::Base
    end

    class InvalidConfirmationToken < APIError::Base
    end

    class UserActivated < APIError::Base
    end

    class UserInactive < APIError::Base
    end

    class TokenRevoked < APIError::Base
    end

    class Unauthorized < APIError::Base
    end
  end
end
