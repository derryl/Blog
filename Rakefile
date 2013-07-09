# rake post title="A Title"
# rake link href="http://www.example.com"

require 'rubygems'
require 'rake'
require 'yaml'
require 'time'
require 'uri'

SOURCE = "app"
CONFIG = {
  'themes'  => File.join(SOURCE, "_includes", "themes"),
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts'   => File.join(SOURCE, "_posts/editorial"),
  'links'   => File.join(SOURCE, "_posts/links"),
  'post_ext' => "md",
}

# Path configuration helper
module JB
  class Path
    SOURCE = "."
    Paths = {
      :layouts => "_layouts",
      :themes => "_includes/themes",
      :theme_assets => "assets/themes",
      :theme_packages => "_theme_packages",
      :posts => "_posts"
    }
    
    def self.base
      SOURCE
    end

    # build a path relative to configured path settings.
    def self.build(path, opts = {})
      opts[:root] ||= SOURCE
      path = "#{opts[:root]}/#{Paths[path.to_sym]}/#{opts[:node]}".split("/")
      path.compact!
      File.__send__ :join, path
    end
  
  end #Path
end #JB

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1, tag2]]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts ""
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts 'description: ""'
    post.puts "category: editorial"
    post.puts "tags: []"
    post.puts ""
    post.puts "---"
    post.puts ""
    post.puts "\##{title.gsub(/-/,' ')}"
  end

  `open -a "Mou" #{filename}`
end # task :post



# Usage: rake link href="http://www.example.com"
desc "Begin a new post in #{CONFIG['links']}"
task :link do
  abort("rake aborted: '#{CONFIG['links']}' directory not found.") unless FileTest.directory?(CONFIG['links'])
  href = ENV["href"] || ' '
  title = ENV["title"] || "external-link"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['links'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating a new link: #{filename}"
  open(filename, 'w') do |link|
    link.puts "---"
    link.puts ""
    link.puts "layout: post"
    link.puts "title: \"#{title.gsub(/-/,' ')}\""
    # link.puts 'description: ""'
    link.puts "href: \"#{href}\""
    link.puts "category: links"
    link.puts "tags: []"
    link.puts ""
    link.puts "---"
    link.puts ""
    # link.puts "\##{title.gsub(/-/,' ')}"
  end

  `open -a "Mou" #{filename}`
end # task :link


# def get_stdin(message)
#   print message
#   STDIN.gets.chomp
# end

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }