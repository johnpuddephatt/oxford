trap 'kill %1' SIGINT
bundle exec jekyll serve --incremental & sleep 5s; npm run watch
