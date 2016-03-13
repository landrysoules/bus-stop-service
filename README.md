# bus-stop-service
Service powering bus-stop mobile app.


## Contributing

1. Fork it ( https://github.com/[my-github-username]/bus-stop-service/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Instructions

By piping to bunyan, you will obtain nice formatted logs.

## Unit tests
Nodejs has its solution for modules, therefore you don't need to wrap your modules in IIFE functions.  
Actually if you do it, ```rewire``` won't be able to change dependencies, leading to untestable app !
