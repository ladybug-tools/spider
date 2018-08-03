(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/components/ExtrudeText.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Text2 = require('js/components/Text');

var _Text3 = _interopRequireDefault(_Text2);

var _Debug = require('js/core/Debug');

var _Debug2 = _interopRequireDefault(_Debug);

var _FontToGeometryFactory = require('js/components/FontToGeometryFactory');

var _FontToGeometryFactory2 = _interopRequireDefault(_FontToGeometryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// create text from extruding a shape created from a json text
var ExtrudeText = function (_Text) {
    _inherits(ExtrudeText, _Text);

    function ExtrudeText() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ExtrudeText);

        var _this = _possibleConstructorReturn(this, (ExtrudeText.__proto__ || Object.getPrototypeOf(ExtrudeText)).call(this));

        _this.material = [new THREE.MeshPhongMaterial({
            flatShading: true,
            color: 0xda6746,
            emissive: 0xc34752,
            specular: 0x0000ff,
            shininess: 90
        }), new THREE.MeshPhongMaterial({
            flatShading: true,
            color: 0xeedcce,
            emissive: 0x887a72,
            specular: 0xffffff,
            shininess: 30
        })];
        _this.geometry = new THREE.BoxBufferGeometry(.1, .1, .1);
        _this.geometry.computeBoundingBox();
        _this.text_object = new THREE.Mesh(_this.geometry, _this.material);
        _this.move_object = new THREE.Object3D();
        _this.move_object.add(_this.text_object);
        _this.add(_this.move_object);
        _this.set_text(config);
        return _this;
    }

    _createClass(ExtrudeText, [{
        key: 'set_text',
        value: function set_text(config) {
            //this method initilize every variable needed for the text
            // we neeed to declare a context here so that we are able to get it inside the loader's callback.
            var context = this;

            this.text = config.text || 'Sanchesin es un buen muchacho';
            //otherwise we cant check later
            if (!config.extrude) config.extrude = {};

            var size = config.size || 100;

            //extruding is creating a shape and using extrude settings to extrude that shape
            var extrudeSettings = {
                steps: config.extrude.steps || 2,
                amount: config.extrude.amount || 1,
                bevelEnabled: config.extrude.bevel || config.extrude.bevelThickness || config.extrude.bevelSize || config.extrude.bevelSegments ? true : false,
                bevelThickness: config.extrude.bevelThickness || 5,
                bevelSize: config.extrude.bevelSize || 5,
                bevelSegments: config.extrude.bevelSegments || 1
            };

            if (config.front) {
                // using given material
                if (config.front.material) {
                    this.material[0] = config.front.material;
                } else {
                    this.material[0].color.set(config.front.color || 0xda6746);
                    this.material[0].emissive.set(config.front.emissive || 0x0000ff);
                    this.material[0].specular.set(config.front.specular || 0xc34752);
                    this.material[0].shininess = config.front.shininess || 90;
                    this.material[0].opacity = config.front.opacity || config.front.opacity === 0 ? config.front.opacity : 1;
                    this.material[0].transparent = this.material[0].opacity < 1 ? true : false;
                }
            }

            if (config.sides) {
                if (config.sides.material) {
                    this.material[1] = config.sides.material;
                } else {
                    this.material[1].color.set(config.sides.color || 0xeedcce);
                    this.material[1].emissive.set(config.sides.emissive || 0x887a72);
                    this.material[1].specular.set(config.sides.specular || 0xffffff);
                    this.material[1].shininess = config.sides.shininess || 30;
                    this.material[1].opacity = config.sides.opacity || config.sides.opacity === 0 ? config.sides.opacity : 1;
                    this.material[1].transparent = this.material[1].opacity < 1 ? true : false;
                }
            }

            // we clean the last used goemetry in order free ram usage
            if (context.geometry) {
                context.geometry.dispose();
            }

            // we load a 3d font model
            var loader = new THREE.FontLoader();
            _FontToGeometryFactory2.default.create_geometry({
                text: context.text,
                size: size,
                callback: function callback(shapes) {
                    context.geometry = new THREE.ExtrudeBufferGeometry(shapes, extrudeSettings);
                    context.geometry.computeBoundingBox();
                    var xMid = -0.5 * (context.geometry.boundingBox.max.x - context.geometry.boundingBox.min.x); // * (config.set_to_middle ? 0.5 : 1);
                    var yMid = -0.5 * (context.geometry.boundingBox.max.y - context.geometry.boundingBox.min.y);
                    var zMid = -0.5 * (context.geometry.boundingBox.max.z - context.geometry.boundingBox.min.z);

                    context.geometry.translate(xMid, yMid, zMid);

                    /////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////
                    // move text a bit to the left according to the depthness
                    if (config.push_left && config.push_up) {
                        var i = context.geometry.attributes.position.array.length / 3;
                        while (i--) {
                            context.geometry.attributes.position.array[i * 3] += context.geometry.attributes.position.array[i * 3 + 2] * config.push_left;
                            context.geometry.attributes.position.array[i * 3 + 1] -= context.geometry.attributes.position.array[i * 3 + 2] * config.push_up;
                        }
                        context.geometry.attributes.position.needsUpdate = true;
                    }
                    if (config.push_up && !config.push_left) {
                        var _i = context.geometry.attributes.position.array.length / 3;
                        while (_i--) {
                            context.geometry.attributes.position.array[_i * 3 + 1] -= context.geometry.attributes.position.array[_i * 3 + 2] * config.push_up;
                        }
                        context.geometry.attributes.position.needsUpdate = true;
                    }
                    if (config.push_left && !config.push_up) {
                        var _i2 = context.geometry.attributes.position.array.length / 3;
                        while (_i2--) {
                            context.geometry.attributes.position.array[_i2 * 3] += context.geometry.attributes.position.array[_i2 * 3 + 2] * config.push_left;
                        }
                        context.geometry.attributes.position.needsUpdate = true;
                    }

                    /////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////


                    // we only change the geometry of the 3d object to save up memory
                    context.text_object.geometry = context.geometry;

                    //helper bounding box
                    if (config.helper) {
                        var helper = new THREE.Box3Helper(context.geometry.boundingBox, 0xff0000);
                        context.move_object.add(helper);
                    }
                }
            });
        }
    }, {
        key: 'get_size',
        value: function get_size() {
            return this.text_object.boundingBox.getSize();
        }
    }, {
        key: 'update',
        value: function update(TIME, camera, c) {

            this.lookAt(camera.position.x, camera.position.y, camera.position.z);

            this.rotation.copy(camera.rotation);

            //this method update the text, as the first parameters will receive the time. See core/TIME module
        }
    }, {
        key: 'get_size',
        value: function get_size() {
            return this.geometry.boundingBox.getSize();
        }
    }]);

    return ExtrudeText;
}(_Text3.default);

exports.default = ExtrudeText;
});

;require.register("js/components/FontToGeometryFactory.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //this class loads a JSON font types and generates shapes with it
//THIS MODULE EXPORT A SINGLETON OBJECT, NOT A CLASS

var _Config = require('js/core/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FontToGeometryFactory = function () {
    function FontToGeometryFactory() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, FontToGeometryFactory);

        this.loader = new THREE.FontLoader();

        // excecuted when textures are ready
        this.ready = false;
        this.waiting_calls = [];
        //this.load_fonts()
    }

    _createClass(FontToGeometryFactory, [{
        key: 'load_fonts',
        value: function load_fonts(path) {
            console.log(path);
            var context = this;
            this.loader.load(path, function (font) {
                context.font = font;
                context.ready = true;
                context.onReady();
            });
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            if (this.waiting_calls) {
                var i = this.waiting_calls.length;
                while (i--) {
                    this.create_geometry(this.waiting_calls[i]);
                }
            }
        }
        // {text, size, callback, debug}

    }, {
        key: 'create_geometry',
        value: function create_geometry(args) {
            // we need to load every single png files before actually being able to draw one of them
            // we stock the calls into waiting_texture array
            if (!this.ready) {
                this.waiting_calls.push(args);
                return false;
            }

            var shapes = this.font.generateShapes(args.text, args.size, 4);

            args.callback(shapes);
            return true;
        }
    }]);

    return FontToGeometryFactory;
}();
//singleton pattern


var fontToGeometryFactory = new FontToGeometryFactory();
module.exports = fontToGeometryFactory;
});

require.register("js/components/Text.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//class import resourceManager from 'js/singletons/ResourceManager';

//this is an abstract class
var Text = function (_THREE$Object3D) {
	_inherits(Text, _THREE$Object3D);

	function Text() {
		_classCallCheck(this, Text);

		return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));
	}

	_createClass(Text, [{
		key: "set_text",
		value: function set_text() {
			//everything but data initialization, this should be changed when text change. 
		}
	}, {
		key: "update",
		value: function update(TIME, camera) {
			this.lookAt(camera.position);
			//this method update the text, as the first parameters will receive the time. See core/TIME module
		}
	}]);

	return Text;
}(THREE.Object3D);

exports.default = Text;
});

;require.register("js/core/Config.js", function(exports, require, module) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
  _classCallCheck(this, Config);

  this.font_path = undefined;
};

var config = new Config();
module.exports = config;
});

require.register("js/core/Debug.js", function(exports, require, module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = function () {
  function Debug() {
    _classCallCheck(this, Debug);

    this.Vector3_one = new THREE.Vector3(1, 1, 1);
    this.Vector3_zero = new THREE.Vector3(0, 0, 0);

    this.canvas_renderer = undefined;
  }

  _createClass(Debug, [{
    key: "init",
    value: function init(webgl) {
      this.webgl = webgl;

      this.ctx = undefined;

      // var cln = webgl.dom.cloneNode(false);
      // cln.id = "canvas_debug";
      // $(cln).css("position", "absolute");
      // webgl.dom.parentElement.insertBefore(cln, webgl.dom);
      // this.ctx = cln.getContext('2d');

      // this.ctx.clearRect(0, 0, cln.width, cln.height);
      // this.ctx.fillStyle =  "rgba(255, 0, 0, 1)";
    }
  }, {
    key: "draw_rectangle",
    value: function draw_rectangle(position_2d, width, height, color) {
      this.ctx.fillStyle = color || "rgba(255, 0, 0, 1)";
      this.ctx.fillRect(position_2d.x - width / 2, this.ctx.canvas.height - position_2d.y - height / 2, width, height);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.ctx) this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }, {
    key: "draw_line_2D",
    value: function draw_line_2D(from, to, color) {
      this.ctx.strokeStyle = color || "rgba(255, 0, 0, 1)";
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }, {
    key: "draw_line",
    value: function draw_line(from, to, color) {
      color = color || 0xff0000;
      var mat = new THREE.LineBasicMaterial({ color: color });
      var geo = new THREE.Geometry();
      geo.vertices.push(from);
      geo.vertices.push(to);
      var line = new THREE.Line(geo, mat);
      this.webgl.add(line);
      return line;
    }
  }, {
    key: "draw_cube",
    value: function draw_cube(args) {
      var size = args.size;
      var pos = args.pos;
      var scene = args.scene;
      var color = args.color;
      size = size || 1;
      color = color || 0xff0000;
      var geometry = new THREE.BoxGeometry(size, size, size);
      var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.copy(pos || new THREE.Vector3());
      if (scene) {
        scene.add(cube);
      }
      return cube;
    }
  }, {
    key: "draw_curve",
    value: function draw_curve(curve, options) {
      var offset = new THREE.Vector3(0, 0, 0);
      if (options) offset.y = options.offset || 0;

      for (var i = 0; i < curve.length - 1; i++) {
        this.draw_line(curve[i].clone().add(offset), curve[i + 1].clone().add(offset));
      }
    }
  }]);

  return Debug;
}();

var DEBUG = new Debug();
module.exports = DEBUG;
});

require.register("text.js", function(exports, require, module) {
'use strict';

var _ExtrudeText = require('js/components/ExtrudeText');

var _ExtrudeText2 = _interopRequireDefault(_ExtrudeText);

var _FontToGeometryFactory = require('js/components/FontToGeometryFactory');

var _FontToGeometryFactory2 = _interopRequireDefault(_FontToGeometryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// text = require('text')
// new text.ExtrudeTest({text : 'your text', size : 30});
// the support update(Time, Camera) and set_text({text : 'your text', size : 30})

// extrude geometry also accepts 
// extrude.steps
// extrude.amount
// extrude.bevel
// extrude.bevelThickness
// extrude.bevelSize
// extrude.bevelSize
module.exports = function (parameters) {
	console.log(parameters);
	_FontToGeometryFactory2.default.load_fonts(parameters.font_paths);
	return Text = {
		ExtrudeText: _ExtrudeText2.default
	};
};
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=text.js.map