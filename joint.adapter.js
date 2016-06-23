(function (root, factory) {

  // AMD
  if(typeof define === "function" && define.amd) define([], function(){ return factory(root); });

  // CommonJS / NodeJS
  else if(typeof module === "object" && module.exports) module.exports = factory(root);

  // Plain JS
  else factory(root);

}(this, function (root) {

  var VERSION = '1.0.0';

  // Bind adapter to joint instance
  function rebind(joint, adapter) {
    if (typeof joint === 'object' && joint) joint.adapter = adapter;
  }

  function runPlugins(value, list, result, callback) {
    result = result || {};

    if (list.length) list.forEach(function (plugin) {
      var res = plugin(value) || {};

      // Add plugin to result list
      if (res.name) result[res.name.replace(/\./g, '_')] = res;
    });

    if (callback) callback(value);
  }

  // Run all preload plugins
  function preload(dependencies, callback) {
    runPlugins(dependencies || [], this.plugins.preload, this.result.preload, callback);
  }

  // Run all load plugins
  function load(joint, callback) {

    // Bind to joint object
    rebind(joint, this);
    runPlugins(joint, this.plugins.load, this.result.load, callback);
  }

  // JointAdapter object
  function JointAdapter() {
    var _this = this;

    function addPlugin(plugin, list) {
      if (list.indexOf(plugin) === -1) list.push(plugin);
    }

    function addPreloadPlugin(plugin) {
      addPlugin(plugin, _this.plugins.preload);
    }

    function addLoadPlugin(plugin) {
      addPlugin(plugin, _this.plugins.load);
    }

    _this.plugins = {
      preload:  [],
      load:     []
    };

    // Map of all loaded plugins
    _this.result = {
      preload:  {},
      load:     {}
    };

    _this.actions = {
      addPreloadPlugin: addPreloadPlugin,
      addPlugin:        addLoadPlugin
    };

    _this.VERSION = VERSION;
  }

  JointAdapter.prototype.preload  = preload;
  JointAdapter.prototype.load     = load;

  if (!root.joint) root.joint = {};

  return root.joint.adapter = new JointAdapter();
}));
