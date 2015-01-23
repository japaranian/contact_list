require 'active_record'

ActiveRecord::Base.establish_connection({
  :adapter => "postgresql",
  :host => "localhost",
  :database => "contact_list",
  :username => "Japaranian"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)
