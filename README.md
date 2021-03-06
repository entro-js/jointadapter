# jointadapter

#### Adapter for JointJS

Adds the ability to load plugins in JointJS

<b>DEMO:</b> https://plnkr.co/wmdVNUlBVFom2l3eYDhC?p=preview

##### Included is a joint adapter plugin that extends support for joint with lodash version >= v4.0

Tested with:
- lodash: 4.6.1
- jQuery: 2.2.1
- Backbone: 1.2.1
- joint: 0.9.10*
- jointadapter: 1.0.0

( *Requires adapter version, see comment below)

Steps:

1: Load joint.adapter.js followed by adapters/joint.adapters.lodash.js

2: Load joint (adapter version), from the following repository: https://github.com/entro-js/joint/tree/v0.9.10-adapter

    <link rel="stylesheet" href="//rawgit.com/entro-js/joint/v0.9.10-adapter/dist/joint.css" />
    
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.6.1/lodash.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone-min.js"></script>
    
    <script src="//rawgit.com/entro-js/jointadapter/master/joint.adapter.js"></script>
    <script src="//rawgit.com/entro-js/jointadapter/master/adapters/joint.adapters.lodash.js"></script>
    <script src="//rawgit.com/entro-js/joint/v0.9.10-adapter/dist/joint.min.js"></script>
  


