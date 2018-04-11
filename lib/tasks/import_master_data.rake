require "csv"

namespace :master_data do
  desc "ReCreate master data"
  task import: :environment do
    [].each do |model|
      create_master model
    end
  end

  desc "ReCreate individual master data"
  task model_import: :environment do
    model = ENV["MODEL"].constantize
    create_master model
  end

  desc "ReCreate dummy data"
  task dummies_import: :environment do
    [].each do |model|
      create_master model, "dummies"
    end
  end

  desc "ReCreate individual dummy data"
  task dummy_individually_import: :environment do
    model = ENV["MODEL"].constantize
    create_master model, "dummies"
  end
end

def create_master model, folder = "masters"
  puts "== Load #{model}"
  CSV.foreach(Rails.root.join("db", folder, "#{model.table_name}.csv"), headers: true) do |row|
    attrs = row.to_h.symbolize_keys
    instance = model.find_by(id: attrs[:id]) || model.new
    instance.assign_attributes attrs
    instance.save validate: false
  end
end
