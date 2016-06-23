/**
 * Joint Adapter - lodash 1.0.0
 *
 *
 * Author: Magnus Henning
 * Entro AS (http://www.entro.no/)
 */

(function(root) {

  var joint   = root.joint;
  var adapter = root.joint && root.joint.adapter;

  var plugin  = {

    name:         'joint.adapter.lodash',

    // Reference to dependencies object
    dependencies: null,

    // Overridden instance
    lodash:       null,

    // Original instance
    _lodash:      null
  };
  
  // Check that joint + joint.adapter is defined
  if (!joint)   throw Error(plugin.name + ': joint not found.');
  if (!adapter) throw Error(plugin.name + ': joint.adapter not found.');

  function adapterLodash(dependencies) {

    plugin.dependencies = dependencies;

    // Reference to original instance
    var lodash = plugin._lodash = dependencies.lodash;

    // Override local instance of lodash >= 4.0 to avoid breaking changes with JointJS
    if (lodash && lodash.VERSION >= '4') {

      function getSplitArguments(args, options) {

        options = options || { isPlainCollection:  false };

        var firstObject = options.isPlainCollection ? null : args[0];
        var thisArg     = null;
        var customizer  = null;
        var sources     = lodash.chain(args)
                .drop(options.isPlainCollection ? 0 : 1)
                .map(function (o) {

                  // Set thisArg
                  if (lodash.isFunction(customizer)) thisArg = o;

                  // Set customizer
                  if (lodash.isFunction(o)) customizer = o;

                  return o;
                })
                .takeWhile(function (o) {
                  return !lodash.isFunction(o);
                })
                .value() || [];

        var argArray = (firstObject ? [firstObject] : [])
            .concat(sources)
            .concat(customizer ? [lodash.bind(customizer, thisArg)] : []);

        return {
          options:        options,
          firstObject:    firstObject,
          thisArg:        thisArg,
          customizer:     customizer,
          sources:        sources,
          argArray:       argArray
        }
      }

      // Create pristine lodash instance
      var _ = lodash.runInContext();
      _.mixin({
        each: function (collection, iteratee, thisArg) {
          return lodash.forEach(collection, thisArg ? lodash.bind(iteratee, thisArg) : iteratee);
        },
        extend: function (object) {
          var splitArgs = getSplitArguments(arguments);
          return lodash.assignWith.apply(this, splitArgs.argArray);

        },
        contains: function () {
          return lodash.includes.apply(null, arguments);
        },
        filter: function () {
          var splitArgs = getSplitArguments(arguments, { isPlainCollection: true });
          return lodash.filter.apply(this, splitArgs.argArray);
        },
        foldl: function () {
          return lodash.reduce.apply(this, arguments);
        },
        invoke: function (collection) {
          return lodash.isArray(collection) ?
              lodash.invokeMap.apply(this, arguments) :
              lodash.invoke.apply(arguments);
        },
        map: function (collection, iteratee, thisArg) {
          return lodash.map(collection, thisArg ? lodash.bind(iteratee, thisArg) : iteratee);
        },
        pluck: function (collection, path) {
          return lodash.map(collection, path);
        },
        sortedIndex: function (array, value, iteratee, thisArgs) {
          return lodash.isFunction(iteratee) ?
              lodash.sortedIndexBy(array, value, thisArgs ? lodash.bind(iteratee, thisArgs) : iteratee) :
              lodash.sortedIndex(array, value);
        },
        transform: function (object, iteratee, accumulator, thisArg) {
          return lodash.transform(collection, thisArg ? lodash.bind(iteratee, thisArg) : iteratee, accumulator);
        },
        unique: lodash.uniq
      });

      // Override with new implementation
      dependencies.lodash = plugin.lodash = _;
      
      return plugin;
    }
  }

  // Add to preload stage
  adapter.actions.addPreloadPlugin(adapterLodash);

}(this));
