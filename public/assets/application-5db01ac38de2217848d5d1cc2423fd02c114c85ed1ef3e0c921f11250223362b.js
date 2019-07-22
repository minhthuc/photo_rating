/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */

(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define("ELEMENT",["vue"],t):"object"==typeof exports?exports.ELEMENT=t(require("vue")):e.ELEMENT=t(e.Vue)}("undefined"!=typeof self?self:this,function(e){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=49)}([function(t,i){t.exports=e},function(e,t,i){var n=i(4);e.exports=function(e,t,i){return void 0===i?n(e,t,!1):n(e,i,!1!==t)}},function(e,t,i){var n;!function(r){"use strict";var s={},a=/d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,o="[^\\s]+",l=/\[([^]*?)\]/gm,u=function(){};function c(e,t){for(var i=[],n=0,r=e.length;n<r;n++)i.push(e[n].substr(0,t));return i}function h(e){return function(t,i,n){var r=n[e].indexOf(i.charAt(0).toUpperCase()+i.substr(1).toLowerCase());~r&&(t.month=r)}}function d(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var p=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],f=["January","February","March","April","May","June","July","August","September","October","November","December"],m=c(f,3),v=c(p,3);s.i18n={dayNamesShort:v,dayNames:p,monthNamesShort:m,monthNames:f,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var g={D:function(e){return e.getDay()},DD:function(e){return d(e.getDay())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDate()},dd:function(e){return d(e.getDate())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return d(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},yy:function(e){return d(String(e.getFullYear()),4).substr(2)},yyyy:function(e){return d(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return d(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return d(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return d(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return d(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return d(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return d(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+d(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},b={d:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+o,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],yy:["\\d\\d?",function(e,t){var i=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?i-1:i)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],yyyy:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],D:["\\d\\d?",u],ddd:[o,u],MMM:[o,h("monthNamesShort")],MMMM:[o,h("monthNames")],a:[o,function(e,t,i){var n=t.toLowerCase();n===i.amPm[0]?e.isPm=!1:n===i.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var i,n=(t+"").match(/([+-]|\d\d)/gi);n&&(i=60*n[1]+parseInt(n[2],10),e.timezoneOffset="+"===n[0]?i:-i)}]};b.dd=b.d,b.dddd=b.ddd,b.DD=b.D,b.mm=b.m,b.hh=b.H=b.HH=b.h,b.MM=b.M,b.ss=b.s,b.A=b.a,s.masks={default:"ddd MMM dd yyyy HH:mm:ss",shortDate:"M/D/yy",mediumDate:"MMM d, yyyy",longDate:"MMMM d, yyyy",fullDate:"dddd, MMMM d, yyyy",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},s.format=function(e,t,i){var n=i||s.i18n;if("number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date in fecha.format");t=s.masks[t]||t||s.masks.default;var r=[];return(t=(t=t.replace(l,function(e,t){return r.push(t),"@@@"})).replace(a,function(t){return t in g?g[t](e,n):t.slice(1,t.length-1)})).replace(/@@@/g,function(){return r.shift()})},s.parse=function(e,t,i){var n=i||s.i18n;if("string"!=typeof t)throw new Error("Invalid format in fecha.parse");if(t=s.masks[t]||t,e.length>1e3)return null;var r={},o=[],u=[];t=t.replace(l,function(e,t){return u.push(t),"@@@"});var c,h=(c=t,c.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(a,function(e){if(b[e]){var t=b[e];return o.push(t[1]),"("+t[0]+")"}return e});h=h.replace(/@@@/g,function(){return u.shift()});var d=e.match(new RegExp(h,"i"));if(!d)return null;for(var p=1;p<d.length;p++)o[p-1](r,d[p],n);var f,m=new Date;return!0===r.isPm&&null!=r.hour&&12!=+r.hour?r.hour=+r.hour+12:!1===r.isPm&&12==+r.hour&&(r.hour=0),null!=r.timezoneOffset?(r.minute=+(r.minute||0)-+r.timezoneOffset,f=new Date(Date.UTC(r.year||m.getFullYear(),r.month||0,r.day||1,r.hour||0,r.minute||0,r.second||0,r.millisecond||0))):f=new Date(r.year||m.getFullYear(),r.month||0,r.day||1,r.hour||0,r.minute||0,r.second||0,r.millisecond||0),f},e.exports?e.exports=s:void 0===(n=function(){return s}.call(t,i,t,e))||(e.exports=n)}()},function(e,t,i){"use strict";t.__esModule=!0;var n=a(i(65)),r=a(i(77)),s="function"==typeof r.default&&"symbol"==typeof n.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};function a(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof r.default&&"symbol"===s(n.default)?function(e){return void 0===e?"undefined":s(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":s(e)}},function(e,t){e.exports=function(e,t,i,n){var r,s=0;return"boolean"!=typeof t&&(n=i,i=t,t=void 0),function(){var a=this,o=Number(new Date)-s,l=arguments;function u(){s=Number(new Date),i.apply(a,l)}n&&!r&&u(),r&&clearTimeout(r),void 0===n&&o>e?u():!0!==t&&(r=setTimeout(n?function(){r=void 0}:u,void 0===n?e-o:e))}}},function(e,t){var i=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=i)},function(e,t){var i=/^(attrs|props|on|nativeOn|class|style|hook)$/;function n(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}}e.exports=function(e){return e.reduce(function(e,t){var r,s,a,o,l;for(a in t)if(r=e[a],s=t[a],r&&i.test(a))if("class"===a&&("string"==typeof r&&(l=r,e[a]=r={},r[l]=!0),"string"==typeof s&&(l=s,t[a]=s={},s[l]=!0)),"on"===a||"nativeOn"===a||"hook"===a)for(o in s)r[o]=n(r[o],s[o]);else if(Array.isArray(r))e[a]=r.concat(s);else if(Array.isArray(s))e[a]=[r].concat(s);else for(o in s)r[o]=s[o];else e[a]=t[a];return e},{})}},function(e,t){var i={}.hasOwnProperty;e.exports=function(e,t){return i.call(e,t)}},function(e,t,i){"use strict";t.__esModule=!0;var n,r=i(56),s=(n=r)&&n.__esModule?n:{default:n};t.default=s.default||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}},function(e,t,i){var n=i(10),r=i(18);e.exports=i(11)?function(e,t,i){return n.f(e,t,r(1,i))}:function(e,t,i){return e[t]=i,e}},function(e,t,i){var n=i(17),r=i(36),s=i(24),a=Object.defineProperty;t.f=i(11)?Object.defineProperty:function(e,t,i){if(n(e),t=s(t,!0),n(i),r)try{return a(e,t,i)}catch(e){}if("get"in i||"set"in i)throw TypeError("Accessors not supported!");return"value"in i&&(e[t]=i.value),e}},function(e,t,i){e.exports=!i(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,i){var n=i(39),r=i(25);e.exports=function(e){return n(r(e))}},function(e,t,i){var n=i(28)("wks"),r=i(21),s=i(5).Symbol,a="function"==typeof s;(e.exports=function(e){return n[e]||(n[e]=a&&s[e]||(a?s:r)("Symbol."+e))}).store=n},function(e,t){var i=e.exports={version:"2.6.2"};"number"==typeof __e&&(__e=i)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,i){var n=i(15);e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,i){var n=i(38),r=i(29);e.exports=Object.keys||function(e){return n(e,r)}},function(e,t){e.exports=!0},function(e,t){var i=0,n=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++i+n).toString(36))}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,i){var n=i(5),r=i(14),s=i(59),a=i(9),o=i(7),l=function(e,t,i){var u,c,h,d=e&l.F,p=e&l.G,f=e&l.S,m=e&l.P,v=e&l.B,g=e&l.W,b=p?r:r[t]||(r[t]={}),y=b.prototype,w=p?n:f?n[t]:(n[t]||{}).prototype;for(u in p&&(i=t),i)(c=!d&&w&&void 0!==w[u])&&o(b,u)||(h=c?w[u]:i[u],b[u]=p&&"function"!=typeof w[u]?i[u]:v&&c?s(h,n):g&&w[u]==h?function(e){var t=function(t,i,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,i)}return new e(t,i,n)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(h):m&&"function"==typeof h?s(Function.call,h):h,m&&((b.virtual||(b.virtual={}))[u]=h,e&l.R&&y&&!y[u]&&a(y,u,h)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,t,i){var n=i(15);e.exports=function(e,t){if(!n(e))return e;var i,r;if(t&&"function"==typeof(i=e.toString)&&!n(r=i.call(e)))return r;if("function"==typeof(i=e.valueOf)&&!n(r=i.call(e)))return r;if(!t&&"function"==typeof(i=e.toString)&&!n(r=i.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){var i=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:i)(e)}},function(e,t,i){var n=i(28)("keys"),r=i(21);e.exports=function(e){return n[e]||(n[e]=r(e))}},function(e,t,i){var n=i(14),r=i(5),s=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(e.exports=function(e,t){return s[e]||(s[e]=void 0!==t?t:{})})("versions",[]).push({version:n.version,mode:i(20)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t){e.exports={}},function(e,t,i){var n=i(10).f,r=i(7),s=i(13)("toStringTag");e.exports=function(e,t,i){e&&!r(e=i?e:e.prototype,s)&&n(e,s,{configurable:!0,value:t})}},function(e,t,i){t.f=i(13)},function(e,t,i){var n=i(5),r=i(14),s=i(20),a=i(33),o=i(10).f;e.exports=function(e){var t=r.Symbol||(r.Symbol=s?{}:n.Symbol||{});"_"==e.charAt(0)||e in t||o(t,e,{value:a.f(e)})}},function(e,t,i){var n=i(4),r=i(1);e.exports={throttle:n,debounce:r}},function(e,t,i){e.exports=!i(11)&&!i(16)(function(){return 7!=Object.defineProperty(i(37)("div"),"a",{get:function(){return 7}}).a})},function(e,t,i){var n=i(15),r=i(5).document,s=n(r)&&n(r.createElement);e.exports=function(e){return s?r.createElement(e):{}}},function(e,t,i){var n=i(7),r=i(12),s=i(62)(!1),a=i(27)("IE_PROTO");e.exports=function(e,t){var i,o=r(e),l=0,u=[];for(i in o)i!=a&&n(o,i)&&u.push(i);for(;t.length>l;)n(o,i=t[l++])&&(~s(u,i)||u.push(i));return u}},function(e,t,i){var n=i(40);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==n(e)?e.split(""):Object(e)}},function(e,t){var i={}.toString;e.exports=function(e){return i.call(e).slice(8,-1)}},function(e,t,i){var n=i(25);e.exports=function(e){return Object(n(e))}},function(e,t,i){"use strict";var n=i(20),r=i(23),s=i(43),a=i(9),o=i(31),l=i(69),u=i(32),c=i(72),h=i(13)("iterator"),d=!([].keys&&"next"in[].keys()),p=function(){return this};e.exports=function(e,t,i,f,m,v,g){l(i,t,f);var b,y,w,x=function(e){if(!d&&e in S)return S[e];switch(e){case"keys":case"values":return function(){return new i(this,e)}}return function(){return new i(this,e)}},_=t+" Iterator",C="values"==m,k=!1,S=e.prototype,D=S[h]||S["@@iterator"]||m&&S[m],$=D||x(m),E=m?C?x("entries"):$:void 0,T="Array"==t&&S.entries||D;if(T&&(w=c(T.call(new e)))!==Object.prototype&&w.next&&(u(w,_,!0),n||"function"==typeof w[h]||a(w,h,p)),C&&D&&"values"!==D.name&&(k=!0,$=function(){return D.call(this)}),n&&!g||!d&&!k&&S[h]||a(S,h,$),o[t]=$,o[_]=p,m)if(b={values:C?$:x("values"),keys:v?$:x("keys"),entries:E},g)for(y in b)y in S||s(S,y,b[y]);else r(r.P+r.F*(d||k),t,b);return b}},function(e,t,i){e.exports=i(9)},function(e,t,i){var n=i(17),r=i(70),s=i(29),a=i(27)("IE_PROTO"),o=function(){},l=function(){var e,t=i(37)("iframe"),n=s.length;for(t.style.display="none",i(71).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;n--;)delete l.prototype[s[n]];return l()};e.exports=Object.create||function(e,t){var i;return null!==e?(o.prototype=n(e),i=new o,o.prototype=null,i[a]=e):i=l(),void 0===t?i:r(i,t)}},function(e,t,i){var n=i(38),r=i(29).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,r)}},function(e,t,i){"use strict";var n=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===r}(e)}(e)};var r="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function s(e,t){var i;return t&&!0===t.clone&&n(e)?o((i=e,Array.isArray(i)?[]:{}),e,t):e}function a(e,t,i){var r=e.slice();return t.forEach(function(t,a){void 0===r[a]?r[a]=s(t,i):n(t)?r[a]=o(e[a],t,i):-1===e.indexOf(t)&&r.push(s(t,i))}),r}function o(e,t,i){var r=Array.isArray(t);return r===Array.isArray(e)?r?((i||{arrayMerge:a}).arrayMerge||a)(e,t,i):function(e,t,i){var r={};return n(e)&&Object.keys(e).forEach(function(t){r[t]=s(e[t],i)}),Object.keys(t).forEach(function(a){n(t[a])&&e[a]?r[a]=o(e[a],t[a],i):r[a]=s(t[a],i)}),r}(e,t,i):s(t,i)}o.all=function(e,t){if(!Array.isArray(e)||e.length<2)throw new Error("first argument should be an array with at least two elements");return e.reduce(function(e,i){return o(e,i,t)})};var l=o;e.exports=l},function(e,t,i){"use strict";(function(e){var i=function(){if("undefined"!=typeof Map)return Map;function e(e,t){var i=-1;return e.some(function(e,n){return e[0]===t&&(i=n,!0)}),i}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var i=e(this.__entries__,t),n=this.__entries__[i];return n&&n[1]},t.prototype.set=function(t,i){var n=e(this.__entries__,t);~n?this.__entries__[n][1]=i:this.__entries__.push([t,i])},t.prototype.delete=function(t){var i=this.__entries__,n=e(i,t);~n&&i.splice(n,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var i=0,n=this.__entries__;i<n.length;i++){var r=n[i];e.call(t,r[1],r[0])}},t}()}(),n="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,r=void 0!==e&&e.Math===Math?e:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),s="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(r):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)},a=2;var o=20,l=["top","right","bottom","left","width","height","size","weight"],u="undefined"!=typeof MutationObserver,c=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var i=!1,n=!1,r=0;function o(){i&&(i=!1,e()),n&&u()}function l(){s(o)}function u(){var e=Date.now();if(i){if(e-r<a)return;n=!0}else i=!0,n=!1,setTimeout(l,t);r=e}return u}(this.refresh.bind(this),o)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,i=t.indexOf(e);~i&&t.splice(i,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter(function(e){return e.gatherActive(),e.hasActive()});return e.forEach(function(e){return e.broadcastActive()}),e.length>0},e.prototype.connect_=function(){n&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),u?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){n&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,i=void 0===t?"":t;l.some(function(e){return!!~i.indexOf(e)})&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),h=function(e,t){for(var i=0,n=Object.keys(t);i<n.length;i++){var r=n[i];Object.defineProperty(e,r,{value:t[r],enumerable:!1,writable:!1,configurable:!0})}return e},d=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||r},p=y(0,0,0,0);function f(e){return parseFloat(e)||0}function m(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];return t.reduce(function(t,i){return t+f(e["border-"+i+"-width"])},0)}function v(e){var t=e.clientWidth,i=e.clientHeight;if(!t&&!i)return p;var n=d(e).getComputedStyle(e),r=function(e){for(var t={},i=0,n=["top","right","bottom","left"];i<n.length;i++){var r=n[i],s=e["padding-"+r];t[r]=f(s)}return t}(n),s=r.left+r.right,a=r.top+r.bottom,o=f(n.width),l=f(n.height);if("border-box"===n.boxSizing&&(Math.round(o+s)!==t&&(o-=m(n,"left","right")+s),Math.round(l+a)!==i&&(l-=m(n,"top","bottom")+a)),!function(e){return e===d(e).document.documentElement}(e)){var u=Math.round(o+s)-t,c=Math.round(l+a)-i;1!==Math.abs(u)&&(o-=u),1!==Math.abs(c)&&(l-=c)}return y(r.left,r.top,o,l)}var g="undefined"!=typeof SVGGraphicsElement?function(e){return e instanceof d(e).SVGGraphicsElement}:function(e){return e instanceof d(e).SVGElement&&"function"==typeof e.getBBox};function b(e){return n?g(e)?function(e){var t=e.getBBox();return y(0,0,t.width,t.height)}(e):v(e):p}function y(e,t,i,n){return{x:e,y:t,width:i,height:n}}var w=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=y(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=b(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),x=function(){return function(e,t){var i,n,r,s,a,o,l,u=(n=(i=t).x,r=i.y,s=i.width,a=i.height,o="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,l=Object.create(o.prototype),h(l,{x:n,y:r,width:s,height:a,top:r,right:n+s,bottom:a+r,left:n}),l);h(this,{target:e,contentRect:u})}}(),_=function(){function e(e,t,n){if(this.activeObservations_=[],this.observations_=new i,"function"!=typeof e)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=t,this.callbackCtx_=n}return e.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof d(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new w(e)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof d(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(t){t.isActive()&&e.activeObservations_.push(t)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map(function(e){return new x(e.target,e.broadcastRect())});this.callback_.call(e,t,e),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),C="undefined"!=typeof WeakMap?new WeakMap:new i,k=function(){return function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=c.getInstance(),n=new _(t,i,this);C.set(this,n)}}();["observe","unobserve","disconnect"].forEach(function(e){k.prototype[e]=function(){var t;return(t=C.get(this))[e].apply(t,arguments)}});var S=void 0!==r.ResizeObserver?r.ResizeObserver:k;t.a=S}).call(this,i(51))},function(e,t,i){e.exports=i(52)},function(e,t,i){e.exports=i(88)},function(e,t,i){var n,r;void 0===(r="function"==typeof(n=function(){"use strict";var e=window,t={placement:"bottom",gpuAcceleration:!0,offset:0,boundariesElement:"viewport",boundariesPadding:5,preventOverflowOrder:["left","right","top","bottom"],flipBehavior:"flip",arrowElement:"[x-arrow]",arrowOffset:0,modifiers:["shift","offset","preventOverflow","keepTogether","arrow","flip","applyStyle"],modifiersIgnored:[],forceAbsolute:!1};function i(e,i,n){this._reference=e.jquery?e[0]:e,this.state={};var r=null==i,s=i&&"[object Object]"===Object.prototype.toString.call(i);return this._popper=r||s?this.parse(s?i:{}):i.jquery?i[0]:i,this._options=Object.assign({},t,n),this._options.modifiers=this._options.modifiers.map(function(e){if(-1===this._options.modifiersIgnored.indexOf(e))return"applyStyle"===e&&this._popper.setAttribute("x-placement",this._options.placement),this.modifiers[e]||e}.bind(this)),this.state.position=this._getPosition(this._popper,this._reference),c(this._popper,{position:this.state.position,top:0}),this.update(),this._setupEventListeners(),this}function n(t){var i=t.style.display,n=t.style.visibility;t.style.display="block",t.style.visibility="hidden",t.offsetWidth;var r=e.getComputedStyle(t),s=parseFloat(r.marginTop)+parseFloat(r.marginBottom),a=parseFloat(r.marginLeft)+parseFloat(r.marginRight),o={width:t.offsetWidth+a,height:t.offsetHeight+s};return t.style.display=i,t.style.visibility=n,o}function r(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function s(e){var t=Object.assign({},e);return t.right=t.left+t.width,t.bottom=t.top+t.height,t}function a(e,t){var i,n=0;for(i in e){if(e[i]===t)return n;n++}return null}function o(t,i){var n=e.getComputedStyle(t,null);return n[i]}function l(t){var i=t.offsetParent;return i!==e.document.body&&i?i:e.document.documentElement}function u(t){var i=t.parentNode;return i?i===e.document?e.document.body.scrollTop||e.document.body.scrollLeft?e.document.body:e.document.documentElement:-1!==["scroll","auto"].indexOf(o(i,"overflow"))||-1!==["scroll","auto"].indexOf(o(i,"overflow-x"))||-1!==["scroll","auto"].indexOf(o(i,"overflow-y"))?i:u(t.parentNode):t}function c(e,t){Object.keys(t).forEach(function(i){var n,r="";-1!==["width","height","top","right","bottom","left"].indexOf(i)&&""!==(n=t[i])&&!isNaN(parseFloat(n))&&isFinite(n)&&(r="px"),e.style[i]=t[i]+r})}function h(e){var t={width:e.offsetWidth,height:e.offsetHeight,left:e.offsetLeft,top:e.offsetTop};return t.right=t.left+t.width,t.bottom=t.top+t.height,t}function d(e){var t=e.getBoundingClientRect(),i=-1!=navigator.userAgent.indexOf("MSIE"),n=i&&"HTML"===e.tagName?-e.scrollTop:t.top;return{left:t.left,top:n,right:t.right,bottom:t.bottom,width:t.right-t.left,height:t.bottom-n}}function p(t){for(var i=["","ms","webkit","moz","o"],n=0;n<i.length;n++){var r=i[n]?i[n]+t.charAt(0).toUpperCase()+t.slice(1):t;if(void 0!==e.document.body.style[r])return r}return null}return i.prototype.destroy=function(){return this._popper.removeAttribute("x-placement"),this._popper.style.left="",this._popper.style.position="",this._popper.style.top="",this._popper.style[p("transform")]="",this._removeEventListeners(),this._options.removeOnDestroy&&this._popper.remove(),this},i.prototype.update=function(){var e={instance:this,styles:{}};e.placement=this._options.placement,e._originalPlacement=this._options.placement,e.offsets=this._getOffsets(this._popper,this._reference,e.placement),e.boundaries=this._getBoundaries(e,this._options.boundariesPadding,this._options.boundariesElement),e=this.runModifiers(e,this._options.modifiers),"function"==typeof this.state.updateCallback&&this.state.updateCallback(e)},i.prototype.onCreate=function(e){return e(this),this},i.prototype.onUpdate=function(e){return this.state.updateCallback=e,this},i.prototype.parse=function(t){var i={tagName:"div",classNames:["popper"],attributes:[],parent:e.document.body,content:"",contentType:"text",arrowTagName:"div",arrowClassNames:["popper__arrow"],arrowAttributes:["x-arrow"]};t=Object.assign({},i,t);var n=e.document,r=n.createElement(t.tagName);if(o(r,t.classNames),l(r,t.attributes),"node"===t.contentType?r.appendChild(t.content.jquery?t.content[0]:t.content):"html"===t.contentType?r.innerHTML=t.content:r.textContent=t.content,t.arrowTagName){var s=n.createElement(t.arrowTagName);o(s,t.arrowClassNames),l(s,t.arrowAttributes),r.appendChild(s)}var a=t.parent.jquery?t.parent[0]:t.parent;if("string"==typeof a){if((a=n.querySelectorAll(t.parent)).length>1&&console.warn("WARNING: the given `parent` query("+t.parent+") matched more than one element, the first one will be used"),0===a.length)throw"ERROR: the given `parent` doesn't exists!";a=a[0]}return a.length>1&&a instanceof Element==0&&(console.warn("WARNING: you have passed as parent a list of elements, the first one will be used"),a=a[0]),a.appendChild(r),r;function o(e,t){t.forEach(function(t){e.classList.add(t)})}function l(e,t){t.forEach(function(t){e.setAttribute(t.split(":")[0],t.split(":")[1]||"")})}},i.prototype._getPosition=function(t,i){return l(i),this._options.forceAbsolute?"absolute":function t(i){return i!==e.document.body&&("fixed"===o(i,"position")||(i.parentNode?t(i.parentNode):i))}(i)?"fixed":"absolute"},i.prototype._getOffsets=function(e,t,i){i=i.split("-")[0];var r={};r.position=this.state.position;var s="fixed"===r.position,a=function(e,t,i){var n=d(e),r=d(t);if(i){var s=u(t);r.top+=s.scrollTop,r.bottom+=s.scrollTop,r.left+=s.scrollLeft,r.right+=s.scrollLeft}return{top:n.top-r.top,left:n.left-r.left,bottom:n.top-r.top+n.height,right:n.left-r.left+n.width,width:n.width,height:n.height}}(t,l(e),s),o=n(e);return-1!==["right","left"].indexOf(i)?(r.top=a.top+a.height/2-o.height/2,r.left="left"===i?a.left-o.width:a.right):(r.left=a.left+a.width/2-o.width/2,r.top="top"===i?a.top-o.height:a.bottom),r.width=o.width,r.height=o.height,{popper:r,reference:a}},i.prototype._setupEventListeners=function(){if(this.state.updateBound=this.update.bind(this),e.addEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement){var t=u(this._reference);t!==e.document.body&&t!==e.document.documentElement||(t=e),t.addEventListener("scroll",this.state.updateBound),this.state.scrollTarget=t}},i.prototype._removeEventListeners=function(){e.removeEventListener("resize",this.state.updateBound),"window"!==this._options.boundariesElement&&this.state.scrollTarget&&(this.state.scrollTarget.removeEventListener("scroll",this.state.updateBound),this.state.scrollTarget=null),this.state.updateBound=null},i.prototype._getBoundaries=function(t,i,n){var r,s,a={};if("window"===n){var o=e.document.body,c=e.document.documentElement;r=Math.max(o.scrollHeight,o.offsetHeight,c.clientHeight,c.scrollHeight,c.offsetHeight),a={top:0,right:Math.max(o.scrollWidth,o.offsetWidth,c.clientWidth,c.scrollWidth,c.offsetWidth),bottom:r,left:0}}else if("viewport"===n){var d=l(this._popper),p=u(this._popper),f=h(d),m="fixed"===t.offsets.popper.position?0:(s=p)==document.body?Math.max(document.documentElement.scrollTop,document.body.scrollTop):s.scrollTop,v="fixed"===t.offsets.popper.position?0:function(e){return e==document.body?Math.max(document.documentElement.scrollLeft,document.body.scrollLeft):e.scrollLeft}(p);a={top:0-(f.top-m),right:e.document.documentElement.clientWidth-(f.left-v),bottom:e.document.documentElement.clientHeight-(f.top-m),left:0-(f.left-v)}}else a=l(this._popper)===n?{top:0,left:0,right:n.clientWidth,bottom:n.clientHeight}:h(n);return a.left+=i,a.right-=i,a.top=a.top+i,a.bottom=a.bottom-i,a},i.prototype.runModifiers=function(e,t,i){var n=t.slice();return void 0!==i&&(n=this._options.modifiers.slice(0,a(this._options.modifiers,i))),n.forEach(function(t){var i;(i=t)&&"[object Function]"==={}.toString.call(i)&&(e=t.call(this,e))}.bind(this)),e},i.prototype.isModifierRequired=function(e,t){var i=a(this._options.modifiers,e);return!!this._options.modifiers.slice(0,i).filter(function(e){return e===t}).length},i.prototype.modifiers={},i.prototype.modifiers.applyStyle=function(e){var t,i={position:e.offsets.popper.position},n=Math.round(e.offsets.popper.left),r=Math.round(e.offsets.popper.top);return this._options.gpuAcceleration&&(t=p("transform"))?(i[t]="translate3d("+n+"px, "+r+"px, 0)",i.top=0,i.left=0):(i.left=n,i.top=r),Object.assign(i,e.styles),c(this._popper,i),this._popper.setAttribute("x-placement",e.placement),this.isModifierRequired(this.modifiers.applyStyle,this.modifiers.arrow)&&e.offsets.arrow&&c(e.arrowElement,e.offsets.arrow),e},i.prototype.modifiers.shift=function(e){var t=e.placement,i=t.split("-")[0],n=t.split("-")[1];if(n){var r=e.offsets.reference,a=s(e.offsets.popper),o={y:{start:{top:r.top},end:{top:r.top+r.height-a.height}},x:{start:{left:r.left},end:{left:r.left+r.width-a.width}}},l=-1!==["bottom","top"].indexOf(i)?"x":"y";e.offsets.popper=Object.assign(a,o[l][n])}return e},i.prototype.modifiers.preventOverflow=function(e){var t=this._options.preventOverflowOrder,i=s(e.offsets.popper),n={left:function(){var t=i.left;return i.left<e.boundaries.left&&(t=Math.max(i.left,e.boundaries.left)),{left:t}},right:function(){var t=i.left;return i.right>e.boundaries.right&&(t=Math.min(i.left,e.boundaries.right-i.width)),{left:t}},top:function(){var t=i.top;return i.top<e.boundaries.top&&(t=Math.max(i.top,e.boundaries.top)),{top:t}},bottom:function(){var t=i.top;return i.bottom>e.boundaries.bottom&&(t=Math.min(i.top,e.boundaries.bottom-i.height)),{top:t}}};return t.forEach(function(t){e.offsets.popper=Object.assign(i,n[t]())}),e},i.prototype.modifiers.keepTogether=function(e){var t=s(e.offsets.popper),i=e.offsets.reference,n=Math.floor;return t.right<n(i.left)&&(e.offsets.popper.left=n(i.left)-t.width),t.left>n(i.right)&&(e.offsets.popper.left=n(i.right)),t.bottom<n(i.top)&&(e.offsets.popper.top=n(i.top)-t.height),t.top>n(i.bottom)&&(e.offsets.popper.top=n(i.bottom)),e},i.prototype.modifiers.flip=function(e){if(!this.isModifierRequired(this.modifiers.flip,this.modifiers.preventOverflow))return console.warn("WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!"),e;if(e.flipped&&e.placement===e._originalPlacement)return e;var t=e.placement.split("-")[0],i=r(t),n=e.placement.split("-")[1]||"",a=[];return(a="flip"===this._options.flipBehavior?[t,i]:this._options.flipBehavior).forEach(function(o,l){if(t===o&&a.length!==l+1){t=e.placement.split("-")[0],i=r(t);var u=s(e.offsets.popper),c=-1!==["right","bottom"].indexOf(t);(c&&Math.floor(e.offsets.reference[t])>Math.floor(u[i])||!c&&Math.floor(e.offsets.reference[t])<Math.floor(u[i]))&&(e.flipped=!0,e.placement=a[l+1],n&&(e.placement+="-"+n),e.offsets.popper=this._getOffsets(this._popper,this._reference,e.placement).popper,e=this.runModifiers(e,this._options.modifiers,this._flip))}}.bind(this)),e},i.prototype.modifiers.offset=function(e){var t=this._options.offset,i=e.offsets.popper;return-1!==e.placement.indexOf("left")?i.top-=t:-1!==e.placement.indexOf("right")?i.top+=t:-1!==e.placement.indexOf("top")?i.left-=t:-1!==e.placement.indexOf("bottom")&&(i.left+=t),e},i.prototype.modifiers.arrow=function(e){var t=this._options.arrowElement,i=this._options.arrowOffset;if("string"==typeof t&&(t=this._popper.querySelector(t)),!t)return e;if(!this._popper.contains(t))return console.warn("WARNING: `arrowElement` must be child of its popper element!"),e;if(!this.isModifierRequired(this.modifiers.arrow,this.modifiers.keepTogether))return console.warn("WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!"),e;var r={},a=e.placement.split("-")[0],o=s(e.offsets.popper),l=e.offsets.reference,u=-1!==["left","right"].indexOf(a),c=u?"height":"width",h=u?"top":"left",d=u?"left":"top",p=u?"bottom":"right",f=n(t)[c];l[p]-f<o[h]&&(e.offsets.popper[h]-=o[h]-(l[p]-f)),l[h]+f>o[p]&&(e.offsets.popper[h]+=l[h]+f-o[p]);var m=l[h]+(i||l[c]/2-f/2)-o[h];return m=Math.max(Math.min(o[c]-f-8,m),8),r[h]=m,r[d]="",e.offsets.arrow=r,e.arrowElement=t,e},Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),i=1;i<arguments.length;i++){var n=arguments[i];if(null!=n){n=Object(n);for(var r=Object.keys(n),s=0,a=r.length;s<a;s++){var o=r[s],l=Object.getOwnPropertyDescriptor(n,o);void 0!==l&&l.enumerable&&(t[o]=n[o])}}}return t}}),i})?n.call(t,i,t,e):n)||(e.exports=r)},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t,i){"use strict";var n=i(53),r=i(54),s=10,a=40,o=800;function l(e){var t=0,i=0,n=0,r=0;return"detail"in e&&(i=e.detail),"wheelDelta"in e&&(i=-e.wheelDelta/120),"wheelDeltaY"in e&&(i=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=i,i=0),n=t*s,r=i*s,"deltaY"in e&&(r=e.deltaY),"deltaX"in e&&(n=e.deltaX),(n||r)&&e.deltaMode&&(1==e.deltaMode?(n*=a,r*=a):(n*=o,r*=o)),n&&!t&&(t=n<1?-1:1),r&&!i&&(i=r<1?-1:1),{spinX:t,spinY:i,pixelX:n,pixelY:r}}l.getEventType=function(){return n.firefox()?"DOMMouseScroll":r("wheel")?"wheel":"mousewheel"},e.exports=l},function(e,t){var i,n,r,s,a,o,l,u,c,h,d,p,f,m,v,g=!1;function b(){if(!g){g=!0;var e=navigator.userAgent,t=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e),b=/(Mac OS X)|(Windows)|(Linux)/.exec(e);if(p=/\b(iPhone|iP[ao]d)/.exec(e),f=/\b(iP[ao]d)/.exec(e),h=/Android/i.exec(e),m=/FBAN\/\w+;/i.exec(e),v=/Mobile/i.exec(e),d=!!/Win64/.exec(e),t){(i=t[1]?parseFloat(t[1]):t[5]?parseFloat(t[5]):NaN)&&document&&document.documentMode&&(i=document.documentMode);var y=/(?:Trident\/(\d+.\d+))/.exec(e);o=y?parseFloat(y[1])+4:i,n=t[2]?parseFloat(t[2]):NaN,r=t[3]?parseFloat(t[3]):NaN,(s=t[4]?parseFloat(t[4]):NaN)?(t=/(?:Chrome\/(\d+\.\d+))/.exec(e),a=t&&t[1]?parseFloat(t[1]):NaN):a=NaN}else i=n=r=a=s=NaN;if(b){if(b[1]){var w=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);l=!w||parseFloat(w[1].replace("_","."))}else l=!1;u=!!b[2],c=!!b[3]}else l=u=c=!1}}var y={ie:function(){return b()||i},ieCompatibilityMode:function(){return b()||o>i},ie64:function(){return y.ie()&&d},firefox:function(){return b()||n},opera:function(){return b()||r},webkit:function(){return b()||s},safari:function(){return y.webkit()},chrome:function(){return b()||a},windows:function(){return b()||u},osx:function(){return b()||l},linux:function(){return b()||c},iphone:function(){return b()||p},mobile:function(){return b()||p||f||h||v},nativeApp:function(){return b()||m},android:function(){return b()||h},ipad:function(){return b()||f}};e.exports=y},function(e,t,i){"use strict";var n,r=i(55);r.canUseDOM&&(n=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")),e.exports=function(e,t){if(!r.canUseDOM||t&&!("addEventListener"in document))return!1;var i="on"+e,s=i in document;if(!s){var a=document.createElement("div");a.setAttribute(i,"return;"),s="function"==typeof a[i]}return!s&&n&&"wheel"===e&&(s=document.implementation.hasFeature("Events.wheel","3.0")),s}},function(e,t,i){"use strict";var n=!("undefined"==typeof window||!window.document||!window.document.createElement),r={canUseDOM:n,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:n&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:n&&!!window.screen,isInWorker:!n};e.exports=r},function(e,t,i){e.exports={default:i(57),__esModule:!0}},function(e,t,i){i(58),e.exports=i(14).Object.assign},function(e,t,i){var n=i(23);n(n.S+n.F,"Object",{assign:i(61)})},function(e,t,i){var n=i(60);e.exports=function(e,t,i){if(n(e),void 0===t)return e;switch(i){case 1:return function(i){return e.call(t,i)};case 2:return function(i,n){return e.call(t,i,n)};case 3:return function(i,n,r){return e.call(t,i,n,r)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,i){"use strict";var n=i(19),r=i(30),s=i(22),a=i(41),o=i(39),l=Object.assign;e.exports=!l||i(16)(function(){var e={},t={},i=Symbol(),n="abcdefghijklmnopqrst";return e[i]=7,n.split("").forEach(function(e){t[e]=e}),7!=l({},e)[i]||Object.keys(l({},t)).join("")!=n})?function(e,t){for(var i=a(e),l=arguments.length,u=1,c=r.f,h=s.f;l>u;)for(var d,p=o(arguments[u++]),f=c?n(p).concat(c(p)):n(p),m=f.length,v=0;m>v;)h.call(p,d=f[v++])&&(i[d]=p[d]);return i}:l},function(e,t,i){var n=i(12),r=i(63),s=i(64);e.exports=function(e){return function(t,i,a){var o,l=n(t),u=r(l.length),c=s(a,u);if(e&&i!=i){for(;u>c;)if((o=l[c++])!=o)return!0}else for(;u>c;c++)if((e||c in l)&&l[c]===i)return e||c||0;return!e&&-1}}},function(e,t,i){var n=i(26),r=Math.min;e.exports=function(e){return e>0?r(n(e),9007199254740991):0}},function(e,t,i){var n=i(26),r=Math.max,s=Math.min;e.exports=function(e,t){return(e=n(e))<0?r(e+t,0):s(e,t)}},function(e,t,i){e.exports={default:i(66),__esModule:!0}},function(e,t,i){i(67),i(73),e.exports=i(33).f("iterator")},function(e,t,i){"use strict";var n=i(68)(!0);i(42)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,i=this._i;return i>=t.length?{value:void 0,done:!0}:(e=n(t,i),this._i+=e.length,{value:e,done:!1})})},function(e,t,i){var n=i(26),r=i(25);e.exports=function(e){return function(t,i){var s,a,o=String(r(t)),l=n(i),u=o.length;return l<0||l>=u?e?"":void 0:(s=o.charCodeAt(l))<55296||s>56319||l+1===u||(a=o.charCodeAt(l+1))<56320||a>57343?e?o.charAt(l):s:e?o.slice(l,l+2):a-56320+(s-55296<<10)+65536}}},function(e,t,i){"use strict";var n=i(44),r=i(18),s=i(32),a={};i(9)(a,i(13)("iterator"),function(){return this}),e.exports=function(e,t,i){e.prototype=n(a,{next:r(1,i)}),s(e,t+" Iterator")}},function(e,t,i){var n=i(10),r=i(17),s=i(19);e.exports=i(11)?Object.defineProperties:function(e,t){r(e);for(var i,a=s(t),o=a.length,l=0;o>l;)n.f(e,i=a[l++],t[i]);return e}},function(e,t,i){var n=i(5).document;e.exports=n&&n.documentElement},function(e,t,i){var n=i(7),r=i(41),s=i(27)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),n(e,s)?e[s]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,i){i(74);for(var n=i(5),r=i(9),s=i(31),a=i(13)("toStringTag"),o="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<o.length;l++){var u=o[l],c=n[u],h=c&&c.prototype;h&&!h[a]&&r(h,a,u),s[u]=s.Array}},function(e,t,i){"use strict";var n=i(75),r=i(76),s=i(31),a=i(12);e.exports=i(42)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,i=this._i++;return!e||i>=e.length?(this._t=void 0,r(1)):r(0,"keys"==t?i:"values"==t?e[i]:[i,e[i]])},"values"),s.Arguments=s.Array,n("keys"),n("values"),n("entries")},function(e,t){e.exports=function(){}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,i){e.exports={default:i(78),__esModule:!0}},function(e,t,i){i(79),i(85),i(86),i(87),e.exports=i(14).Symbol},function(e,t,i){"use strict";var n=i(5),r=i(7),s=i(11),a=i(23),o=i(43),l=i(80).KEY,u=i(16),c=i(28),h=i(32),d=i(21),p=i(13),f=i(33),m=i(34),v=i(81),g=i(82),b=i(17),y=i(15),w=i(12),x=i(24),_=i(18),C=i(44),k=i(83),S=i(84),D=i(10),$=i(19),E=S.f,T=D.f,M=k.f,P=n.Symbol,N=n.JSON,O=N&&N.stringify,I=p("_hidden"),F=p("toPrimitive"),A={}.propertyIsEnumerable,L=c("symbol-registry"),V=c("symbols"),B=c("op-symbols"),z=Object.prototype,H="function"==typeof P,R=n.QObject,W=!R||!R.prototype||!R.prototype.findChild,j=s&&u(function(){return 7!=C(T({},"a",{get:function(){return T(this,"a",{value:7}).a}})).a})?function(e,t,i){var n=E(z,t);n&&delete z[t],T(e,t,i),n&&e!==z&&T(z,t,n)}:T,q=function(e){var t=V[e]=C(P.prototype);return t._k=e,t},Y=H&&"symbol"==typeof P.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof P},K=function(e,t,i){return e===z&&K(B,t,i),b(e),t=x(t,!0),b(i),r(V,t)?(i.enumerable?(r(e,I)&&e[I][t]&&(e[I][t]=!1),i=C(i,{enumerable:_(0,!1)})):(r(e,I)||T(e,I,_(1,{})),e[I][t]=!0),j(e,t,i)):T(e,t,i)},G=function(e,t){b(e);for(var i,n=v(t=w(t)),r=0,s=n.length;s>r;)K(e,i=n[r++],t[i]);return e},U=function(e){var t=A.call(this,e=x(e,!0));return!(this===z&&r(V,e)&&!r(B,e))&&(!(t||!r(this,e)||!r(V,e)||r(this,I)&&this[I][e])||t)},X=function(e,t){if(e=w(e),t=x(t,!0),e!==z||!r(V,t)||r(B,t)){var i=E(e,t);return!i||!r(V,t)||r(e,I)&&e[I][t]||(i.enumerable=!0),i}},J=function(e){for(var t,i=M(w(e)),n=[],s=0;i.length>s;)r(V,t=i[s++])||t==I||t==l||n.push(t);return n},Z=function(e){for(var t,i=e===z,n=M(i?B:w(e)),s=[],a=0;n.length>a;)!r(V,t=n[a++])||i&&!r(z,t)||s.push(V[t]);return s};H||(o((P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(i){this===z&&t.call(B,i),r(this,I)&&r(this[I],e)&&(this[I][e]=!1),j(this,e,_(1,i))};return s&&W&&j(z,e,{configurable:!0,set:t}),q(e)}).prototype,"toString",function(){return this._k}),S.f=X,D.f=K,i(45).f=k.f=J,i(22).f=U,i(30).f=Z,s&&!i(20)&&o(z,"propertyIsEnumerable",U,!0),f.f=function(e){return q(p(e))}),a(a.G+a.W+a.F*!H,{Symbol:P});for(var Q="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;Q.length>ee;)p(Q[ee++]);for(var te=$(p.store),ie=0;te.length>ie;)m(te[ie++]);a(a.S+a.F*!H,"Symbol",{for:function(e){return r(L,e+="")?L[e]:L[e]=P(e)},keyFor:function(e){if(!Y(e))throw TypeError(e+" is not a symbol!");for(var t in L)if(L[t]===e)return t},useSetter:function(){W=!0},useSimple:function(){W=!1}}),a(a.S+a.F*!H,"Object",{create:function(e,t){return void 0===t?C(e):G(C(e),t)},defineProperty:K,defineProperties:G,getOwnPropertyDescriptor:X,getOwnPropertyNames:J,getOwnPropertySymbols:Z}),N&&a(a.S+a.F*(!H||u(function(){var e=P();return"[null]"!=O([e])||"{}"!=O({a:e})||"{}"!=O(Object(e))})),"JSON",{stringify:function(e){for(var t,i,n=[e],r=1;arguments.length>r;)n.push(arguments[r++]);if(i=t=n[1],(y(t)||void 0!==e)&&!Y(e))return g(t)||(t=function(e,t){if("function"==typeof i&&(t=i.call(this,e,t)),!Y(t))return t}),n[1]=t,O.apply(N,n)}}),P.prototype[F]||i(9)(P.prototype,F,P.prototype.valueOf),h(P,"Symbol"),h(Math,"Math",!0),h(n.JSON,"JSON",!0)},function(e,t,i){var n=i(21)("meta"),r=i(15),s=i(7),a=i(10).f,o=0,l=Object.isExtensible||function(){return!0},u=!i(16)(function(){return l(Object.preventExtensions({}))}),c=function(e){a(e,n,{value:{i:"O"+ ++o,w:{}}})},h=e.exports={KEY:n,NEED:!1,fastKey:function(e,t){if(!r(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!s(e,n)){if(!l(e))return"F";if(!t)return"E";c(e)}return e[n].i},getWeak:function(e,t){if(!s(e,n)){if(!l(e))return!0;if(!t)return!1;c(e)}return e[n].w},onFreeze:function(e){return u&&h.NEED&&l(e)&&!s(e,n)&&c(e),e}}},function(e,t,i){var n=i(19),r=i(30),s=i(22);e.exports=function(e){var t=n(e),i=r.f;if(i)for(var a,o=i(e),l=s.f,u=0;o.length>u;)l.call(e,a=o[u++])&&t.push(a);return t}},function(e,t,i){var n=i(40);e.exports=Array.isArray||function(e){return"Array"==n(e)}},function(e,t,i){var n=i(12),r=i(45).f,s={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return a&&"[object Window]"==s.call(e)?function(e){try{return r(e)}catch(e){return a.slice()}}(e):r(n(e))}},function(e,t,i){var n=i(22),r=i(18),s=i(12),a=i(24),o=i(7),l=i(36),u=Object.getOwnPropertyDescriptor;t.f=i(11)?u:function(e,t){if(e=s(e),t=a(t,!0),l)try{return u(e,t)}catch(e){}if(o(e,t))return r(!n.f.call(e,t),e[t])}},function(e,t){},function(e,t,i){i(34)("asyncIterator")},function(e,t,i){i(34)("observable")},function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",{staticClass:"el-pager",on:{click:e.onPagerClick}},[e.pageCount>0?i("li",{staticClass:"number",class:{active:1===e.currentPage,disabled:e.disabled}},[e._v("1")]):e._e(),e.showPrevMore?i("li",{staticClass:"el-icon more btn-quickprev",class:[e.quickprevIconClass,{disabled:e.disabled}],on:{mouseenter:function(t){e.onMouseenter("left")},mouseleave:function(t){e.quickprevIconClass="el-icon-more"}}}):e._e(),e._l(e.pagers,function(t){return i("li",{key:t,staticClass:"number",class:{active:e.currentPage===t,disabled:e.disabled}},[e._v(e._s(t))])}),e.showNextMore?i("li",{staticClass:"el-icon more btn-quicknext",class:[e.quicknextIconClass,{disabled:e.disabled}],on:{mouseenter:function(t){e.onMouseenter("right")},mouseleave:function(t){e.quicknextIconClass="el-icon-more"}}}):e._e(),e.pageCount>1?i("li",{staticClass:"number",class:{active:e.currentPage===e.pageCount,disabled:e.disabled}},[e._v(e._s(e.pageCount))]):e._e()],2)};function r(e,t,i,n,r,s,a,o){var l,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=i,u._compiled=!0),n&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=l):r&&(l=o?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(e,t){return l.call(t),c(e,t)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,l):[l]}return{exports:e,options:u}}n._withStripped=!0;var s=r({name:"ElPager",props:{currentPage:Number,pageCount:Number,pagerCount:Number,disabled:Boolean},watch:{showPrevMore:function(e){e||(this.quickprevIconClass="el-icon-more")},showNextMore:function(e){e||(this.quicknextIconClass="el-icon-more")}},methods:{onPagerClick:function(e){var t=e.target;if("UL"!==t.tagName&&!this.disabled){var i=Number(e.target.textContent),n=this.pageCount,r=this.currentPage,s=this.pagerCount-2;-1!==t.className.indexOf("more")&&(-1!==t.className.indexOf("quickprev")?i=r-s:-1!==t.className.indexOf("quicknext")&&(i=r+s)),isNaN(i)||(i<1&&(i=1),i>n&&(i=n)),i!==r&&this.$emit("change",i)}},onMouseenter:function(e){this.disabled||("left"===e?this.quickprevIconClass="el-icon-d-arrow-left":this.quicknextIconClass="el-icon-d-arrow-right")}},computed:{pagers:function(){var e=this.pagerCount,t=(e-1)/2,i=Number(this.currentPage),n=Number(this.pageCount),r=!1,s=!1;n>e&&(i>e-t&&(r=!0),i<n-t&&(s=!0));var a=[];if(r&&!s)for(var o=n-(e-2);o<n;o++)a.push(o);else if(!r&&s)for(var l=2;l<e;l++)a.push(l);else if(r&&s)for(var u=Math.floor(e/2)-1,c=i-u;c<=i+u;c++)a.push(c);else for(var h=2;h<n;h++)a.push(h);return this.showPrevMore=r,this.showNextMore=s,a}},data:function(){return{current:null,showPrevMore:!1,showNextMore:!1,quicknextIconClass:"el-icon-more",quickprevIconClass:"el-icon-more"}}},n,[],!1,null,null,null);s.options.__file="packages/pagination/src/pager.vue";var a=s.exports,o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleClose,expression:"handleClose"}],staticClass:"el-select",class:[e.selectSize?"el-select--"+e.selectSize:""],on:{click:function(t){return t.stopPropagation(),e.toggleMenu(t)}}},[e.multiple?i("div",{ref:"tags",staticClass:"el-select__tags",style:{"max-width":e.inputWidth-32+"px",width:"100%"}},[e.collapseTags&&e.selected.length?i("span",[i("el-tag",{attrs:{closable:!e.selectDisabled,size:e.collapseTagSize,hit:e.selected[0].hitState,type:"info","disable-transitions":""},on:{close:function(t){e.deleteTag(t,e.selected[0])}}},[i("span",{staticClass:"el-select__tags-text"},[e._v(e._s(e.selected[0].currentLabel))])]),e.selected.length>1?i("el-tag",{attrs:{closable:!1,size:e.collapseTagSize,type:"info","disable-transitions":""}},[i("span",{staticClass:"el-select__tags-text"},[e._v("+ "+e._s(e.selected.length-1))])]):e._e()],1):e._e(),e.collapseTags?e._e():i("transition-group",{on:{"after-leave":e.resetInputHeight}},e._l(e.selected,function(t){return i("el-tag",{key:e.getValueKey(t),attrs:{closable:!e.selectDisabled,size:e.collapseTagSize,hit:t.hitState,type:"info","disable-transitions":""},on:{close:function(i){e.deleteTag(i,t)}}},[i("span",{staticClass:"el-select__tags-text"},[e._v(e._s(t.currentLabel))])])}),1),e.filterable?i("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],ref:"input",staticClass:"el-select__input",class:[e.selectSize?"is-"+e.selectSize:""],style:{"flex-grow":"1",width:e.inputLength/(e.inputWidth-32)+"%","max-width":e.inputWidth-42+"px"},attrs:{type:"text",disabled:e.selectDisabled,autocomplete:e.autoComplete||e.autocomplete},domProps:{value:e.query},on:{focus:e.handleFocus,blur:function(t){e.softFocus=!1},click:function(e){e.stopPropagation()},keyup:e.managePlaceholder,keydown:[e.resetInputState,function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"]))return null;t.preventDefault(),e.navigateOptions("next")},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"]))return null;t.preventDefault(),e.navigateOptions("prev")},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?(t.preventDefault(),e.selectOption(t)):null},function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;t.stopPropagation(),t.preventDefault(),e.visible=!1},function(t){return"button"in t||!e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete","Del"])?e.deletePrevTag(t):null}],compositionstart:e.handleComposition,compositionupdate:e.handleComposition,compositionend:e.handleComposition,input:[function(t){t.target.composing||(e.query=t.target.value)},e.debouncedQueryChange]}}):e._e()],1):e._e(),i("el-input",{ref:"reference",class:{"is-focus":e.visible},attrs:{type:"text",placeholder:e.currentPlaceholder,name:e.name,id:e.id,autocomplete:e.autoComplete||e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1},on:{focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keyup:function(t){return e.debouncedOnInputChange(t)},keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"]))return null;t.stopPropagation(),t.preventDefault(),e.navigateOptions("next")},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"]))return null;t.stopPropagation(),t.preventDefault(),e.navigateOptions("prev")},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?(t.preventDefault(),e.selectOption(t)):null},function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;t.stopPropagation(),t.preventDefault(),e.visible=!1},function(t){if(!("button"in t)&&e._k(t.keyCode,"tab",9,t.key,"Tab"))return null;e.visible=!1}],paste:function(t){return e.debouncedOnInputChange(t)},mouseenter:function(t){e.inputHovering=!0},mouseleave:function(t){e.inputHovering=!1}},model:{value:e.selectedLabel,callback:function(t){e.selectedLabel=t},expression:"selectedLabel"}},[e.$slots.prefix?i("template",{slot:"prefix"},[e._t("prefix")],2):e._e(),i("template",{slot:"suffix"},[i("i",{directives:[{name:"show",rawName:"v-show",value:!e.showClose,expression:"!showClose"}],class:["el-select__caret","el-input__icon","el-icon-"+e.iconClass]}),e.showClose?i("i",{staticClass:"el-select__caret el-input__icon el-icon-circle-close",on:{click:e.handleClearClick}}):e._e()])],2),i("transition",{attrs:{name:"el-zoom-in-top"},on:{"before-enter":e.handleMenuEnter,"after-leave":e.doDestroy}},[i("el-select-menu",{directives:[{name:"show",rawName:"v-show",value:e.visible&&!1!==e.emptyText,expression:"visible && emptyText !== false"}],ref:"popper",attrs:{"append-to-body":e.popperAppendToBody}},[i("el-scrollbar",{directives:[{name:"show",rawName:"v-show",value:e.options.length>0&&!e.loading,expression:"options.length > 0 && !loading"}],ref:"scrollbar",class:{"is-empty":!e.allowCreate&&e.query&&0===e.filteredOptionsCount},attrs:{tag:"ul","wrap-class":"el-select-dropdown__wrap","view-class":"el-select-dropdown__list"}},[e.showNewOption?i("el-option",{attrs:{value:e.query,created:""}}):e._e(),e._t("default")],2),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&0===e.options.length)?[e.$slots.empty?e._t("empty"):i("p",{staticClass:"el-select-dropdown__empty"},[e._v("\n          "+e._s(e.emptyText)+"\n        ")])]:e._e()],2)],1)],1)};o._withStripped=!0;var l={methods:{dispatch:function(e,t,i){for(var n=this.$parent||this.$root,r=n.$options.componentName;n&&(!r||r!==e);)(n=n.$parent)&&(r=n.$options.componentName);n&&n.$emit.apply(n,[t].concat(i))},broadcast:function(e,t,i){(function e(t,i,n){this.$children.forEach(function(r){r.$options.componentName===t?r.$emit.apply(r,[i].concat(n)):e.apply(r,[t,i].concat([n]))})}).call(this,e,t,i)}}},u=function(e){return{methods:{focus:function(){this.$refs[e].focus()}}}},c=i(0),h=i.n(c),d=i(46),p=i.n(d);function f(e){return"[object String]"===Object.prototype.toString.call(e)}function m(e){return"[object Object]"===Object.prototype.toString.call(e)}function v(e){return e&&e.nodeType===Node.ELEMENT_NODE}var g=function(e){return e&&"[object Function]"==={}.toString.call(e)},b=function(e){return void 0===e},y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w=Object.prototype.hasOwnProperty;function x(){}function _(e,t){return w.call(e,t)}function C(e,t){for(var i in t)e[i]=t[i];return e}var k=function(e,t){for(var i=(t=t||"").split("."),n=e,r=null,s=0,a=i.length;s<a;s++){var o=i[s];if(!n)break;if(s===a-1){r=n[o];break}n=n[o]}return r};function S(e,t,i){for(var n=e,r=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),s=0,a=r.length;s<a-1&&(n||i);++s){var o=r[s];if(!(o in n)){if(i)throw new Error("please transfer a valid prop path to form item!");break}n=n[o]}return{o:n,k:r[s],v:n?n[r[s]]:null}}var D=function(){return Math.floor(1e4*Math.random())},$=function(e,t){if(e===t)return!0;if(!(e instanceof Array))return!1;if(!(t instanceof Array))return!1;if(e.length!==t.length)return!1;for(var i=0;i!==e.length;++i)if(e[i]!==t[i])return!1;return!0},E=function(e,t){for(var i=0;i!==e.length;++i)if(t(e[i]))return i;return-1},T=function(e,t){var i=E(e,t);return-1!==i?e[i]:void 0},M=function(e){return Array.isArray(e)?e:e?[e]:[]},P=function(e){var t=/([^-])([A-Z])/g;return e.replace(t,"$1-$2").replace(t,"$1-$2").toLowerCase()},N=function(e){return f(e)?e.charAt(0).toUpperCase()+e.slice(1):e},O=function(e,t){var i=m(e),n=m(t);return i&&n?JSON.stringify(e)===JSON.stringify(t):!i&&!n&&String(e)===String(t)},I=function(e,t){return Array.isArray(e)&&Array.isArray(t)?function(e,t){if(t=t||[],(e=e||[]).length!==t.length)return!1;for(var i=0;i<e.length;i++)if(!O(e[i],t[i]))return!1;return!0}(e,t):O(e,t)},F=function(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return!e;if(e instanceof Error)return""===e.message;switch(Object.prototype.toString.call(e)){case"[object String]":case"[object Array]":return!e.length;case"[object File]":case"[object Map]":case"[object Set]":return!e.size;case"[object Object]":return!Object.keys(e).length}return!1},A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L=/(%|)\{([0-9a-zA-Z_]+)\}/g,V=function(e){return function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return 1===i.length&&"object"===A(i[0])&&(i=i[0]),i&&i.hasOwnProperty||(i={}),e.replace(L,function(t,n,r,s){var a=void 0;return"{"===e[s-1]&&"}"===e[s+t.length]?r:null==(a=_(i,r)?i[r]:null)?"":a})}}(h.a),B={el:{colorpicker:{confirm:"确定",clear:"清空"},datepicker:{now:"此刻",today:"今天",cancel:"取消",clear:"清空",confirm:"确定",selectDate:"选择日期",selectTime:"选择时间",startDate:"开始日期",startTime:"开始时间",endDate:"结束日期",endTime:"结束时间",prevYear:"前一年",nextYear:"后一年",prevMonth:"上个月",nextMonth:"下个月",year:"年",month1:"1 月",month2:"2 月",month3:"3 月",month4:"4 月",month5:"5 月",month6:"6 月",month7:"7 月",month8:"8 月",month9:"9 月",month10:"10 月",month11:"11 月",month12:"12 月",weeks:{sun:"日",mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六"},months:{jan:"一月",feb:"二月",mar:"三月",apr:"四月",may:"五月",jun:"六月",jul:"七月",aug:"八月",sep:"九月",oct:"十月",nov:"十一月",dec:"十二月"}},select:{loading:"加载中",noMatch:"无匹配数据",noData:"无数据",placeholder:"请选择"},cascader:{noMatch:"无匹配数据",loading:"加载中",placeholder:"请选择",noData:"暂无数据"},pagination:{goto:"前往",pagesize:"条/页",total:"共 {total} 条",pageClassifier:"页"},messagebox:{title:"提示",confirm:"确定",cancel:"取消",error:"输入的数据不合法!"},upload:{deleteTip:"按 delete 键可删除",delete:"删除",preview:"查看图片",continue:"继续上传"},table:{emptyText:"暂无数据",confirmFilter:"筛选",resetFilter:"重置",clearFilter:"全部",sumText:"合计"},tree:{emptyText:"暂无数据"},transfer:{noMatch:"无匹配数据",noData:"无数据",titles:["列表 1","列表 2"],filterPlaceholder:"请输入搜索内容",noCheckedFormat:"共 {total} 项",hasCheckedFormat:"已选 {checked}/{total} 项"},image:{error:"加载失败"},pageHeader:{title:"返回"}}},z=!1,H=function(){var e=Object.getPrototypeOf(this||h.a).$t;if("function"==typeof e&&h.a.locale)return z||(z=!0,h.a.locale(h.a.config.lang,p()(B,h.a.locale(h.a.config.lang)||{},{clone:!0}))),e.apply(this,arguments)},R=function(e,t){var i=H.apply(this,arguments);if(null!=i)return i;for(var n=e.split("."),r=B,s=0,a=n.length;s<a;s++){if(i=r[n[s]],s===a-1)return V(i,t);if(!i)return"";r=i}return""},W={use:function(e){B=e||B},t:R,i18n:function(e){H=e||H}},j={methods:{t:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return R.apply(this,t)}}},q=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:["textarea"===e.type?"el-textarea":"el-input",e.inputSize?"el-input--"+e.inputSize:"",{"is-disabled":e.inputDisabled,"is-exceed":e.inputExceed,"el-input-group":e.$slots.prepend||e.$slots.append,"el-input-group--append":e.$slots.append,"el-input-group--prepend":e.$slots.prepend,"el-input--prefix":e.$slots.prefix||e.prefixIcon,"el-input--suffix":e.$slots.suffix||e.suffixIcon||e.clearable||e.showPassword}],on:{mouseenter:function(t){e.hovering=!0},mouseleave:function(t){e.hovering=!1}}},["textarea"!==e.type?[e.$slots.prepend?i("div",{staticClass:"el-input-group__prepend"},[e._t("prepend")],2):e._e(),"textarea"!==e.type?i("input",e._b({ref:"input",staticClass:"el-input__inner",attrs:{tabindex:e.tabindex,type:e.showPassword?e.passwordVisible?"text":"password":e.type,disabled:e.inputDisabled,readonly:e.readonly,autocomplete:e.autoComplete||e.autocomplete,"aria-label":e.label},on:{compositionstart:e.handleCompositionStart,compositionend:e.handleCompositionEnd,input:e.handleInput,focus:e.handleFocus,blur:e.handleBlur,change:e.handleChange}},"input",e.$attrs,!1)):e._e(),e.$slots.prefix||e.prefixIcon?i("span",{staticClass:"el-input__prefix"},[e._t("prefix"),e.prefixIcon?i("i",{staticClass:"el-input__icon",class:e.prefixIcon}):e._e()],2):e._e(),e.getSuffixVisible()?i("span",{staticClass:"el-input__suffix"},[i("span",{staticClass:"el-input__suffix-inner"},[e.showClear&&e.showPwdVisible&&e.isWordLimitVisible?e._e():[e._t("suffix"),e.suffixIcon?i("i",{staticClass:"el-input__icon",class:e.suffixIcon}):e._e()],e.showClear?i("i",{staticClass:"el-input__icon el-icon-circle-close el-input__clear",on:{click:e.clear}}):e._e(),e.showPwdVisible?i("i",{staticClass:"el-input__icon el-icon-view el-input__clear",on:{click:e.handlePasswordVisible}}):e._e(),e.isWordLimitVisible?i("span",{staticClass:"el-input__count"},[i("span",{staticClass:"el-input__count-inner"},[e._v("\n            "+e._s(e.textLength)+"/"+e._s(e.upperLimit)+"\n          ")])]):e._e()],2),e.validateState?i("i",{staticClass:"el-input__icon",class:["el-input__validateIcon",e.validateIcon]}):e._e()]):e._e(),e.$slots.append?i("div",{staticClass:"el-input-group__append"},[e._t("append")],2):e._e()]:i("textarea",e._b({ref:"textarea",staticClass:"el-textarea__inner",style:e.textareaStyle,attrs:{tabindex:e.tabindex,disabled:e.inputDisabled,readonly:e.readonly,autocomplete:e.autoComplete||e.autocomplete,"aria-label":e.label},on:{compositionstart:e.handleCompositionStart,compositionend:e.handleCompositionEnd,input:e.handleInput,focus:e.handleFocus,blur:e.handleBlur,change:e.handleChange}},"textarea",e.$attrs,!1)),e.isWordLimitVisible&&"textarea"===e.type?i("span",{staticClass:"el-input__count"},[e._v(e._s(e.textLength)+"/"+e._s(e.upperLimit))]):e._e()],2)};q._withStripped=!0;var Y={mounted:function(){},methods:{getMigratingConfig:function(){return{props:{},events:{}}}}},K=void 0,G="\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n",U=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;K||(K=document.createElement("textarea"),document.body.appendChild(K));var n=function(e){var t=window.getComputedStyle(e),i=t.getPropertyValue("box-sizing"),n=parseFloat(t.getPropertyValue("padding-bottom"))+parseFloat(t.getPropertyValue("padding-top")),r=parseFloat(t.getPropertyValue("border-bottom-width"))+parseFloat(t.getPropertyValue("border-top-width"));return{contextStyle:U.map(function(e){return e+":"+t.getPropertyValue(e)}).join(";"),paddingSize:n,borderSize:r,boxSizing:i}}(e),r=n.paddingSize,s=n.borderSize,a=n.boxSizing,o=n.contextStyle;K.setAttribute("style",o+";"+G),K.value=e.value||e.placeholder||"";var l=K.scrollHeight,u={};"border-box"===a?l+=s:"content-box"===a&&(l-=r),K.value="";var c=K.scrollHeight-r;if(null!==t){var h=c*t;"border-box"===a&&(h=h+r+s),l=Math.max(h,l),u.minHeight=h+"px"}if(null!==i){var d=c*i;"border-box"===a&&(d=d+r+s),l=Math.min(d,l)}return u.height=l+"px",K.parentNode&&K.parentNode.removeChild(K),K=null,u}var J=function(e){for(var t=1,i=arguments.length;t<i;t++){var n=arguments[t]||{};for(var r in n)if(n.hasOwnProperty(r)){var s=n[r];void 0!==s&&(e[r]=s)}}return e},Z=r({name:"ElInput",componentName:"ElInput",mixins:[l,Y],inheritAttrs:!1,inject:{elForm:{default:""},elFormItem:{default:""}},data:function(){return{textareaCalcStyle:{},hovering:!1,focused:!1,isComposing:!1,passwordVisible:!1}},props:{value:[String,Number],size:String,resize:String,form:String,disabled:Boolean,readonly:Boolean,type:{type:String,default:"text"},autosize:{type:[Boolean,Object],default:!1},autocomplete:{type:String,default:"off"},autoComplete:{type:String,validator:function(e){return!0}},validateEvent:{type:Boolean,default:!0},suffixIcon:String,prefixIcon:String,label:String,clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},tabindex:String},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},validateState:function(){return this.elFormItem?this.elFormItem.validateState:""},needStatusIcon:function(){return!!this.elForm&&this.elForm.statusIcon},validateIcon:function(){return{validating:"el-icon-loading",success:"el-icon-circle-check",error:"el-icon-circle-close"}[this.validateState]},textareaStyle:function(){return J({},this.textareaCalcStyle,{resize:this.resize})},inputSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},inputDisabled:function(){return this.disabled||(this.elForm||{}).disabled},nativeInputValue:function(){return null===this.value||void 0===this.value?"":String(this.value)},showClear:function(){return this.clearable&&!this.inputDisabled&&!this.readonly&&this.nativeInputValue&&(this.focused||this.hovering)},showPwdVisible:function(){return this.showPassword&&!this.inputDisabled&&!this.readonly&&(!!this.nativeInputValue||this.focused)},isWordLimitVisible:function(){return this.showWordLimit&&this.$attrs.maxlength&&("text"===this.type||"textarea"===this.type)&&!this.inputDisabled&&!this.readonly&&!this.showPassword},upperLimit:function(){return this.$attrs.maxlength},textLength:function(){return"number"==typeof this.value?String(this.value).length:(this.value||"").length},inputExceed:function(){return this.isWordLimitVisible&&this.textLength>this.upperLimit}},watch:{value:function(e){this.$nextTick(this.resizeTextarea),this.validateEvent&&this.dispatch("ElFormItem","el.form.change",[e])},nativeInputValue:function(){this.setNativeInputValue()},type:function(){var e=this;this.$nextTick(function(){e.setNativeInputValue(),e.resizeTextarea(),e.updateIconOffset()})}},methods:{focus:function(){this.getInput().focus()},blur:function(){this.getInput().blur()},getMigratingConfig:function(){return{props:{icon:"icon is removed, use suffix-icon / prefix-icon instead.","on-icon-click":"on-icon-click is removed."},events:{click:"click is removed."}}},handleBlur:function(e){this.focused=!1,this.$emit("blur",e),this.validateEvent&&this.dispatch("ElFormItem","el.form.blur",[this.value])},select:function(){this.getInput().select()},resizeTextarea:function(){if(!this.$isServer){var e=this.autosize;if("textarea"===this.type)if(e){var t=e.minRows,i=e.maxRows;this.textareaCalcStyle=X(this.$refs.textarea,t,i)}else this.textareaCalcStyle={minHeight:X(this.$refs.textarea).minHeight}}},setNativeInputValue:function(){var e=this.getInput();e&&e.value!==this.nativeInputValue&&(e.value=this.nativeInputValue)},handleFocus:function(e){this.focused=!0,this.$emit("focus",e)},handleCompositionStart:function(){this.isComposing=!0},handleCompositionEnd:function(e){this.isComposing=!1,this.handleInput(e)},handleInput:function(e){this.isComposing||e.target.value!==this.nativeInputValue&&(this.$emit("input",e.target.value),this.$nextTick(this.setNativeInputValue))},handleChange:function(e){this.$emit("change",e.target.value)},calcIconOffset:function(e){var t=[].slice.call(this.$el.querySelectorAll(".el-input__"+e)||[]);if(t.length){for(var i=null,n=0;n<t.length;n++)if(t[n].parentNode===this.$el){i=t[n];break}if(i){var r={suffix:"append",prefix:"prepend"}[e];this.$slots[r]?i.style.transform="translateX("+("suffix"===e?"-":"")+this.$el.querySelector(".el-input-group__"+r).offsetWidth+"px)":i.removeAttribute("style")}}},updateIconOffset:function(){this.calcIconOffset("prefix"),this.calcIconOffset("suffix")},clear:function(){this.$emit("input",""),this.$emit("change",""),this.$emit("clear")},handlePasswordVisible:function(){this.passwordVisible=!this.passwordVisible,this.focus()},getInput:function(){return this.$refs.input||this.$refs.textarea},getSuffixVisible:function(){return this.$slots.suffix||this.suffixIcon||this.showClear||this.showPassword||this.isWordLimitVisible||this.validateState&&this.needStatusIcon}},created:function(){this.$on("inputSelect",this.select)},mounted:function(){this.setNativeInputValue(),this.resizeTextarea(),this.updateIconOffset()},updated:function(){this.$nextTick(this.updateIconOffset)}},q,[],!1,null,null,null);Z.options.__file="packages/input/src/input.vue";var Q=Z.exports;Q.install=function(e){e.component(Q.name,Q)};var ee=Q,te=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-select-dropdown el-popper",class:[{"is-multiple":this.$parent.multiple},this.popperClass],style:{minWidth:this.minWidth}},[this._t("default")],2)};te._withStripped=!0;"function"==typeof Symbol&&Symbol.iterator;var ie=h.a.prototype.$isServer,ne=/([\:\-\_]+(.))/g,re=/^moz([A-Z])/,se=ie?0:Number(document.documentMode),ae=function(e){return(e||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")},oe=function(e){return e.replace(ne,function(e,t,i,n){return n?i.toUpperCase():i}).replace(re,"Moz$1")},le=!ie&&document.addEventListener?function(e,t,i){e&&t&&i&&e.addEventListener(t,i,!1)}:function(e,t,i){e&&t&&i&&e.attachEvent("on"+t,i)},ue=!ie&&document.removeEventListener?function(e,t,i){e&&t&&e.removeEventListener(t,i,!1)}:function(e,t,i){e&&t&&e.detachEvent("on"+t,i)};function ce(e,t){if(!e||!t)return!1;if(-1!==t.indexOf(" "))throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function he(e,t){if(e){for(var i=e.className,n=(t||"").split(" "),r=0,s=n.length;r<s;r++){var a=n[r];a&&(e.classList?e.classList.add(a):ce(e,a)||(i+=" "+a))}e.classList||(e.className=i)}}function de(e,t){if(e&&t){for(var i=t.split(" "),n=" "+e.className+" ",r=0,s=i.length;r<s;r++){var a=i[r];a&&(e.classList?e.classList.remove(a):ce(e,a)&&(n=n.replace(" "+a+" "," ")))}e.classList||(e.className=ae(n))}}var pe=se<9?function(e,t){if(!ie){if(!e||!t)return null;"float"===(t=oe(t))&&(t="styleFloat");try{switch(t){case"opacity":try{return e.filters.item("alpha").opacity/100}catch(e){return 1}default:return e.style[t]||e.currentStyle?e.currentStyle[t]:null}}catch(i){return e.style[t]}}}:function(e,t){if(!ie){if(!e||!t)return null;"float"===(t=oe(t))&&(t="cssFloat");try{var i=document.defaultView.getComputedStyle(e,"");return e.style[t]||i?i[t]:null}catch(i){return e.style[t]}}};var fe=function(e,t){if(!ie)return pe(e,null!==t||void 0!==t?t?"overflow-y":"overflow-x":"overflow").match(/(scroll|auto)/)},me=function(e,t){if(!ie){for(var i=e;i;){if([window,document,document.documentElement].includes(i))return window;if(fe(i,t))return i;i=i.parentNode}return i}},ve=!1,ge=!1,be=void 0,ye=function(){if(!h.a.prototype.$isServer){var e=xe.modalDom;return e?ve=!0:(ve=!1,e=document.createElement("div"),xe.modalDom=e,e.addEventListener("touchmove",function(e){e.preventDefault(),e.stopPropagation()}),e.addEventListener("click",function(){xe.doOnModalClick&&xe.doOnModalClick()})),e}},we={},xe={modalFade:!0,getInstance:function(e){return we[e]},register:function(e,t){e&&t&&(we[e]=t)},deregister:function(e){e&&(we[e]=null,delete we[e])},nextZIndex:function(){return xe.zIndex++},modalStack:[],doOnModalClick:function(){var e=xe.modalStack[xe.modalStack.length-1];if(e){var t=xe.getInstance(e.id);t&&t.closeOnClickModal&&t.close()}},openModal:function(e,t,i,n,r){if(!h.a.prototype.$isServer&&e&&void 0!==t){this.modalFade=r;for(var s=this.modalStack,a=0,o=s.length;a<o;a++){if(s[a].id===e)return}var l=ye();if(he(l,"v-modal"),this.modalFade&&!ve&&he(l,"v-modal-enter"),n)n.trim().split(/\s+/).forEach(function(e){return he(l,e)});setTimeout(function(){de(l,"v-modal-enter")},200),i&&i.parentNode&&11!==i.parentNode.nodeType?i.parentNode.appendChild(l):document.body.appendChild(l),t&&(l.style.zIndex=t),l.tabIndex=0,l.style.display="",this.modalStack.push({id:e,zIndex:t,modalClass:n})}},closeModal:function(e){var t=this.modalStack,i=ye();if(t.length>0){var n=t[t.length-1];if(n.id===e){if(n.modalClass)n.modalClass.trim().split(/\s+/).forEach(function(e){return de(i,e)});t.pop(),t.length>0&&(i.style.zIndex=t[t.length-1].zIndex)}else for(var r=t.length-1;r>=0;r--)if(t[r].id===e){t.splice(r,1);break}}0===t.length&&(this.modalFade&&he(i,"v-modal-leave"),setTimeout(function(){0===t.length&&(i.parentNode&&i.parentNode.removeChild(i),i.style.display="none",xe.modalDom=void 0),de(i,"v-modal-leave")},200))}};Object.defineProperty(xe,"zIndex",{configurable:!0,get:function(){return ge||(be=be||(h.a.prototype.$ELEMENT||{}).zIndex||2e3,ge=!0),be},set:function(e){be=e}});h.a.prototype.$isServer||window.addEventListener("keydown",function(e){if(27===e.keyCode){var t=function(){if(!h.a.prototype.$isServer&&xe.modalStack.length>0){var e=xe.modalStack[xe.modalStack.length-1];if(!e)return;return xe.getInstance(e.id)}}();t&&t.closeOnPressEscape&&(t.handleClose?t.handleClose():t.handleAction?t.handleAction("cancel"):t.close())}});var _e=xe,Ce=void 0,ke=function(){if(h.a.prototype.$isServer)return 0;if(void 0!==Ce)return Ce;var e=document.createElement("div");e.className="el-scrollbar__wrap",e.style.visibility="hidden",e.style.width="100px",e.style.position="absolute",e.style.top="-9999px",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var i=document.createElement("div");i.style.width="100%",e.appendChild(i);var n=i.offsetWidth;return e.parentNode.removeChild(e),Ce=t-n},Se=1,De=void 0,$e={props:{visible:{type:Boolean,default:!1},openDelay:{},closeDelay:{},zIndex:{},modal:{type:Boolean,default:!1},modalFade:{type:Boolean,default:!0},modalClass:{},modalAppendToBody:{type:Boolean,default:!1},lockScroll:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!1}},beforeMount:function(){this._popupId="popup-"+Se++,_e.register(this._popupId,this)},beforeDestroy:function(){_e.deregister(this._popupId),_e.closeModal(this._popupId),this.restoreBodyStyle()},data:function(){return{opened:!1,bodyPaddingRight:null,computedBodyPaddingRight:0,withoutHiddenClass:!0,rendered:!1}},watch:{visible:function(e){var t=this;if(e){if(this._opening)return;this.rendered?this.open():(this.rendered=!0,h.a.nextTick(function(){t.open()}))}else this.close()}},methods:{open:function(e){var t=this;this.rendered||(this.rendered=!0);var i=J({},this.$props||this,e);this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),clearTimeout(this._openTimer);var n=Number(i.openDelay);n>0?this._openTimer=setTimeout(function(){t._openTimer=null,t.doOpen(i)},n):this.doOpen(i)},doOpen:function(e){if(!this.$isServer&&(!this.willOpen||this.willOpen())&&!this.opened){this._opening=!0;var t=this.$el,i=e.modal,n=e.zIndex;if(n&&(_e.zIndex=n),i&&(this._closing&&(_e.closeModal(this._popupId),this._closing=!1),_e.openModal(this._popupId,_e.nextZIndex(),this.modalAppendToBody?void 0:t,e.modalClass,e.modalFade),e.lockScroll)){this.withoutHiddenClass=!ce(document.body,"el-popup-parent--hidden"),this.withoutHiddenClass&&(this.bodyPaddingRight=document.body.style.paddingRight,this.computedBodyPaddingRight=parseInt(pe(document.body,"paddingRight"),10)),De=ke();var r=document.documentElement.clientHeight<document.body.scrollHeight,s=pe(document.body,"overflowY");De>0&&(r||"scroll"===s)&&this.withoutHiddenClass&&(document.body.style.paddingRight=this.computedBodyPaddingRight+De+"px"),he(document.body,"el-popup-parent--hidden")}"static"===getComputedStyle(t).position&&(t.style.position="absolute"),t.style.zIndex=_e.nextZIndex(),this.opened=!0,this.onOpen&&this.onOpen(),this.doAfterOpen()}},doAfterOpen:function(){this._opening=!1},close:function(){var e=this;if(!this.willClose||this.willClose()){null!==this._openTimer&&(clearTimeout(this._openTimer),this._openTimer=null),clearTimeout(this._closeTimer);var t=Number(this.closeDelay);t>0?this._closeTimer=setTimeout(function(){e._closeTimer=null,e.doClose()},t):this.doClose()}},doClose:function(){this._closing=!0,this.onClose&&this.onClose(),this.lockScroll&&setTimeout(this.restoreBodyStyle,200),this.opened=!1,this.doAfterClose()},doAfterClose:function(){_e.closeModal(this._popupId),this._closing=!1},restoreBodyStyle:function(){this.modal&&this.withoutHiddenClass&&(document.body.style.paddingRight=this.bodyPaddingRight,de(document.body,"el-popup-parent--hidden")),this.withoutHiddenClass=!0}}},Ee=h.a.prototype.$isServer?function(){}:i(50),Te=function(e){return e.stopPropagation()},Me={props:{transformOrigin:{type:[Boolean,String],default:!0},placement:{type:String,default:"bottom"},boundariesPadding:{type:Number,default:5},reference:{},popper:{},offset:{default:0},value:Boolean,visibleArrow:Boolean,arrowOffset:{type:Number,default:35},appendToBody:{type:Boolean,default:!0},popperOptions:{type:Object,default:function(){return{gpuAcceleration:!1}}}},data:function(){return{showPopper:!1,currentPlacement:""}},watch:{value:{immediate:!0,handler:function(e){this.showPopper=e,this.$emit("input",e)}},showPopper:function(e){this.disabled||(e?this.updatePopper():this.destroyPopper(),this.$emit("input",e))}},methods:{createPopper:function(){var e=this;if(!this.$isServer&&(this.currentPlacement=this.currentPlacement||this.placement,/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement))){var t=this.popperOptions,i=this.popperElm=this.popperElm||this.popper||this.$refs.popper,n=this.referenceElm=this.referenceElm||this.reference||this.$refs.reference;!n&&this.$slots.reference&&this.$slots.reference[0]&&(n=this.referenceElm=this.$slots.reference[0].elm),i&&n&&(this.visibleArrow&&this.appendArrow(i),this.appendToBody&&document.body.appendChild(this.popperElm),this.popperJS&&this.popperJS.destroy&&this.popperJS.destroy(),t.placement=this.currentPlacement,t.offset=this.offset,t.arrowOffset=this.arrowOffset,this.popperJS=new Ee(n,i,t),this.popperJS.onCreate(function(t){e.$emit("created",e),e.resetTransformOrigin(),e.$nextTick(e.updatePopper)}),"function"==typeof t.onUpdate&&this.popperJS.onUpdate(t.onUpdate),this.popperJS._popper.style.zIndex=_e.nextZIndex(),this.popperElm.addEventListener("click",Te))}},updatePopper:function(){var e=this.popperJS;e?(e.update(),e._popper&&(e._popper.style.zIndex=_e.nextZIndex())):this.createPopper()},doDestroy:function(e){!this.popperJS||this.showPopper&&!e||(this.popperJS.destroy(),this.popperJS=null)},destroyPopper:function(){this.popperJS&&this.resetTransformOrigin()},resetTransformOrigin:function(){if(this.transformOrigin){var e=this.popperJS._popper.getAttribute("x-placement").split("-")[0],t={top:"bottom",bottom:"top",left:"right",right:"left"}[e];this.popperJS._popper.style.transformOrigin="string"==typeof this.transformOrigin?this.transformOrigin:["top","bottom"].indexOf(e)>-1?"center "+t:t+" center"}},appendArrow:function(e){var t=void 0;if(!this.appended){for(var i in this.appended=!0,e.attributes)if(/^_v-/.test(e.attributes[i].name)){t=e.attributes[i].name;break}var n=document.createElement("div");t&&n.setAttribute(t,""),n.setAttribute("x-arrow",""),n.className="popper__arrow",e.appendChild(n)}}},beforeDestroy:function(){this.doDestroy(!0),this.popperElm&&this.popperElm.parentNode===document.body&&(this.popperElm.removeEventListener("click",Te),document.body.removeChild(this.popperElm))},deactivated:function(){this.$options.beforeDestroy[0].call(this)}},Pe=r({name:"ElSelectDropdown",componentName:"ElSelectDropdown",mixins:[Me],props:{placement:{default:"bottom-start"},boundariesPadding:{default:0},popperOptions:{default:function(){return{gpuAcceleration:!1}}},visibleArrow:{default:!0},appendToBody:{type:Boolean,default:!0}},data:function(){return{minWidth:""}},computed:{popperClass:function(){return this.$parent.popperClass}},watch:{"$parent.inputWidth":function(){this.minWidth=this.$parent.$el.getBoundingClientRect().width+"px"}},mounted:function(){var e=this;this.referenceElm=this.$parent.$refs.reference.$el,this.$parent.popperElm=this.popperElm=this.$el,this.$on("updatePopper",function(){e.$parent.visible&&e.updatePopper()}),this.$on("destroyPopper",this.destroyPopper)}},te,[],!1,null,null,null);Pe.options.__file="packages/select/src/select-dropdown.vue";var Ne=Pe.exports,Oe=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-select-dropdown__item",class:{selected:e.itemSelected,"is-disabled":e.disabled||e.groupDisabled||e.limitReached,hover:e.hover},on:{mouseenter:e.hoverItem,click:function(t){return t.stopPropagation(),e.selectOptionClick(t)}}},[e._t("default",[i("span",[e._v(e._s(e.currentLabel))])])],2)};Oe._withStripped=!0;var Ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Fe=r({mixins:[l],name:"ElOption",componentName:"ElOption",inject:["select"],props:{value:{required:!0},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},data:function(){return{index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}},computed:{isObject:function(){return"[object object]"===Object.prototype.toString.call(this.value).toLowerCase()},currentLabel:function(){return this.label||(this.isObject?"":this.value)},currentValue:function(){return this.value||this.label||""},itemSelected:function(){return this.select.multiple?this.contains(this.select.value,this.value):this.isEqual(this.value,this.select.value)},limitReached:function(){return!!this.select.multiple&&(!this.itemSelected&&(this.select.value||[]).length>=this.select.multipleLimit&&this.select.multipleLimit>0)}},watch:{currentLabel:function(){this.created||this.select.remote||this.dispatch("ElSelect","setSelected")},value:function(e,t){var i=this.select,n=i.remote,r=i.valueKey;if(!this.created&&!n){if(r&&"object"===(void 0===e?"undefined":Ie(e))&&"object"===(void 0===t?"undefined":Ie(t))&&e[r]===t[r])return;this.dispatch("ElSelect","setSelected")}}},methods:{isEqual:function(e,t){if(this.isObject){var i=this.select.valueKey;return k(e,i)===k(t,i)}return e===t},contains:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];if(this.isObject){var i=this.select.valueKey;return e&&e.some(function(e){return k(e,i)===k(t,i)})}return e&&e.indexOf(t)>-1},handleGroupDisabled:function(e){this.groupDisabled=e},hoverItem:function(){this.disabled||this.groupDisabled||(this.select.hoverIndex=this.select.options.indexOf(this))},selectOptionClick:function(){!0!==this.disabled&&!0!==this.groupDisabled&&this.dispatch("ElSelect","handleOptionClick",[this,!0])},queryChange:function(e){this.visible=new RegExp(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return String(e).replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}(e),"i").test(this.currentLabel)||this.created,this.visible||this.select.filteredOptionsCount--}},created:function(){this.select.options.push(this),this.select.cachedOptions.push(this),this.select.optionsCount++,this.select.filteredOptionsCount++,this.$on("queryChange",this.queryChange),this.$on("handleGroupDisabled",this.handleGroupDisabled)},beforeDestroy:function(){this.select.onOptionDestroy(this.select.options.indexOf(this))}},Oe,[],!1,null,null,null);Fe.options.__file="packages/select/src/option.vue";var Ae=Fe.exports,Le=r({name:"ElTag",props:{text:String,closable:Boolean,type:String,hit:Boolean,disableTransitions:Boolean,color:String,size:String,effect:{type:String,default:"light",validator:function(e){return-1!==["dark","light","plain"].indexOf(e)}}},methods:{handleClose:function(e){e.stopPropagation(),this.$emit("close",e)},handleClick:function(e){this.$emit("click",e)}},computed:{tagSize:function(){return this.size||(this.$ELEMENT||{}).size}},render:function(e){var t=this.type,i=this.tagSize,n=this.hit,r=this.effect,s=e("span",{class:["el-tag",t?"el-tag--"+t:"",i?"el-tag--"+i:"",r?"el-tag--"+r:"",n&&"is-hit"],style:{backgroundColor:this.color},on:{click:this.handleClick}},[this.$slots.default,this.closable&&e("i",{class:"el-tag__close el-icon-close",on:{click:this.handleClose}})]);return this.disableTransitions?s:e("transition",{attrs:{name:"el-zoom-in-center"}},[s])}},void 0,void 0,!1,null,null,null);Le.options.__file="packages/tag/src/tag.vue";var Ve=Le.exports;Ve.install=function(e){e.component(Ve.name,Ve)};var Be=Ve,ze=i(47),He="undefined"==typeof window,Re=function(e){var t=e,i=Array.isArray(t),n=0;for(t=i?t:t[Symbol.iterator]();;){var r;if(i){if(n>=t.length)break;r=t[n++]}else{if((n=t.next()).done)break;r=n.value}var s=r.target.__resizeListeners__||[];s.length&&s.forEach(function(e){e()})}},We=function(e,t){He||(e.__resizeListeners__||(e.__resizeListeners__=[],e.__ro__=new ze.a(Re),e.__ro__.observe(e)),e.__resizeListeners__.push(t))},je=function(e,t){e&&e.__resizeListeners__&&(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),e.__resizeListeners__.length||e.__ro__.disconnect())},qe={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}};function Ye(e){var t=e.move,i=e.size,n=e.bar,r={},s="translate"+n.axis+"("+t+"%)";return r[n.size]=i,r.transform=s,r.msTransform=s,r.webkitTransform=s,r}var Ke={name:"Bar",props:{vertical:Boolean,size:String,move:Number},computed:{bar:function(){return qe[this.vertical?"vertical":"horizontal"]},wrap:function(){return this.$parent.wrap}},render:function(e){var t=this.size,i=this.move,n=this.bar;return e("div",{class:["el-scrollbar__bar","is-"+n.key],on:{mousedown:this.clickTrackHandler}},[e("div",{ref:"thumb",class:"el-scrollbar__thumb",on:{mousedown:this.clickThumbHandler},style:Ye({size:t,move:i,bar:n})})])},methods:{clickThumbHandler:function(e){e.ctrlKey||2===e.button||(this.startDrag(e),this[this.bar.axis]=e.currentTarget[this.bar.offset]-(e[this.bar.client]-e.currentTarget.getBoundingClientRect()[this.bar.direction]))},clickTrackHandler:function(e){var t=100*(Math.abs(e.target.getBoundingClientRect()[this.bar.direction]-e[this.bar.client])-this.$refs.thumb[this.bar.offset]/2)/this.$el[this.bar.offset];this.wrap[this.bar.scroll]=t*this.wrap[this.bar.scrollSize]/100},startDrag:function(e){e.stopImmediatePropagation(),this.cursorDown=!0,le(document,"mousemove",this.mouseMoveDocumentHandler),le(document,"mouseup",this.mouseUpDocumentHandler),document.onselectstart=function(){return!1}},mouseMoveDocumentHandler:function(e){if(!1!==this.cursorDown){var t=this[this.bar.axis];if(t){var i=100*(-1*(this.$el.getBoundingClientRect()[this.bar.direction]-e[this.bar.client])-(this.$refs.thumb[this.bar.offset]-t))/this.$el[this.bar.offset];this.wrap[this.bar.scroll]=i*this.wrap[this.bar.scrollSize]/100}}},mouseUpDocumentHandler:function(e){this.cursorDown=!1,this[this.bar.axis]=0,ue(document,"mousemove",this.mouseMoveDocumentHandler),document.onselectstart=null}},destroyed:function(){ue(document,"mouseup",this.mouseUpDocumentHandler)}},Ge={name:"ElScrollbar",components:{Bar:Ke},props:{native:Boolean,wrapStyle:{},wrapClass:{},viewClass:{},viewStyle:{},noresize:Boolean,tag:{type:String,default:"div"}},data:function(){return{sizeWidth:"0",sizeHeight:"0",moveX:0,moveY:0}},computed:{wrap:function(){return this.$refs.wrap}},render:function(e){var t=ke(),i=this.wrapStyle;if(t){var n="-"+t+"px",r="margin-bottom: "+n+"; margin-right: "+n+";";Array.isArray(this.wrapStyle)?(i=function(e){for(var t={},i=0;i<e.length;i++)e[i]&&C(t,e[i]);return t}(this.wrapStyle)).marginRight=i.marginBottom=n:"string"==typeof this.wrapStyle?i+=r:i=r}var s=e(this.tag,{class:["el-scrollbar__view",this.viewClass],style:this.viewStyle,ref:"resize"},this.$slots.default),a=e("div",{ref:"wrap",style:i,on:{scroll:this.handleScroll},class:[this.wrapClass,"el-scrollbar__wrap",t?"":"el-scrollbar__wrap--hidden-default"]},[[s]]),o=void 0;return o=this.native?[e("div",{ref:"wrap",class:[this.wrapClass,"el-scrollbar__wrap"],style:i},[[s]])]:[a,e(Ke,{attrs:{move:this.moveX,size:this.sizeWidth}}),e(Ke,{attrs:{vertical:!0,move:this.moveY,size:this.sizeHeight}})],e("div",{class:"el-scrollbar"},o)},methods:{handleScroll:function(){var e=this.wrap;this.moveY=100*e.scrollTop/e.clientHeight,this.moveX=100*e.scrollLeft/e.clientWidth},update:function(){var e,t,i=this.wrap;i&&(e=100*i.clientHeight/i.scrollHeight,t=100*i.clientWidth/i.scrollWidth,this.sizeHeight=e<100?e+"%":"",this.sizeWidth=t<100?t+"%":"")}},mounted:function(){this.native||(this.$nextTick(this.update),!this.noresize&&We(this.$refs.resize,this.update))},beforeDestroy:function(){this.native||!this.noresize&&je(this.$refs.resize,this.update)},install:function(e){e.component(Ge.name,Ge)}},Ue=Ge,Xe=i(1),Je=i.n(Xe),Ze=[],Qe="@@clickoutsideContext",et=void 0,tt=0;function it(e,t,i){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!(i&&i.context&&n.target&&r.target)||e.contains(n.target)||e.contains(r.target)||e===n.target||i.context.popperElm&&(i.context.popperElm.contains(n.target)||i.context.popperElm.contains(r.target))||(t.expression&&e[Qe].methodName&&i.context[e[Qe].methodName]?i.context[e[Qe].methodName]():e[Qe].bindingFn&&e[Qe].bindingFn())}}!h.a.prototype.$isServer&&le(document,"mousedown",function(e){return et=e}),!h.a.prototype.$isServer&&le(document,"mouseup",function(e){Ze.forEach(function(t){return t[Qe].documentHandler(e,et)})});var nt={bind:function(e,t,i){Ze.push(e);var n=tt++;e[Qe]={id:n,documentHandler:it(e,t,i),methodName:t.expression,bindingFn:t.value}},update:function(e,t,i){e[Qe].documentHandler=it(e,t,i),e[Qe].methodName=t.expression,e[Qe].bindingFn=t.value},unbind:function(e){for(var t=Ze.length,i=0;i<t;i++)if(Ze[i][Qe].id===e[Qe].id){Ze.splice(i,1);break}delete e[Qe]}};function rt(e,t){if(!h.a.prototype.$isServer)if(t){for(var i=[],n=t.offsetParent;n&&e!==n&&e.contains(n);)i.push(n),n=n.offsetParent;var r=t.offsetTop+i.reduce(function(e,t){return e+t.offsetTop},0),s=r+t.offsetHeight,a=e.scrollTop,o=a+e.clientHeight;r<a?e.scrollTop=r:s>o&&(e.scrollTop=s-e.clientHeight)}else e.scrollTop=0}function st(e){return null!=e}var at=r({mixins:[l,j,u("reference"),{data:function(){return{hoverOption:-1}},computed:{optionsAllDisabled:function(){return this.options.filter(function(e){return e.visible}).every(function(e){return e.disabled})}},watch:{hoverIndex:function(e){var t=this;"number"==typeof e&&e>-1&&(this.hoverOption=this.options[e]||{}),this.options.forEach(function(e){e.hover=t.hoverOption===e})}},methods:{navigateOptions:function(e){var t=this;if(this.visible){if(0!==this.options.length&&0!==this.filteredOptionsCount&&!this.optionsAllDisabled){"next"===e?(this.hoverIndex++,this.hoverIndex===this.options.length&&(this.hoverIndex=0)):"prev"===e&&(this.hoverIndex--,this.hoverIndex<0&&(this.hoverIndex=this.options.length-1));var i=this.options[this.hoverIndex];!0!==i.disabled&&!0!==i.groupDisabled&&i.visible||this.navigateOptions(e),this.$nextTick(function(){return t.scrollToOption(t.hoverOption)})}}else this.visible=!0}}}],name:"ElSelect",componentName:"ElSelect",inject:{elForm:{default:""},elFormItem:{default:""}},provide:function(){return{select:this}},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},readonly:function(){return!this.filterable||this.multiple||!(!h.a.prototype.$isServer&&!isNaN(Number(document.documentMode)))&&!(!h.a.prototype.$isServer&&navigator.userAgent.indexOf("Edge")>-1)&&!this.visible},showClose:function(){var e=this.multiple?Array.isArray(this.value)&&this.value.length>0:void 0!==this.value&&null!==this.value&&""!==this.value;return this.clearable&&!this.selectDisabled&&this.inputHovering&&e},iconClass:function(){return this.remote&&this.filterable?"":this.visible?"arrow-up is-reverse":"arrow-up"},debounce:function(){return this.remote?300:0},emptyText:function(){return this.loading?this.loadingText||this.t("el.select.loading"):(!this.remote||""!==this.query||0!==this.options.length)&&(this.filterable&&this.query&&this.options.length>0&&0===this.filteredOptionsCount?this.noMatchText||this.t("el.select.noMatch"):0===this.options.length?this.noDataText||this.t("el.select.noData"):null)},showNewOption:function(){var e=this,t=this.options.filter(function(e){return!e.created}).some(function(t){return t.currentLabel===e.query});return this.filterable&&this.allowCreate&&""!==this.query&&!t},selectSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},selectDisabled:function(){return this.disabled||(this.elForm||{}).disabled},collapseTagSize:function(){return["small","mini"].indexOf(this.selectSize)>-1?"mini":"small"}},components:{ElInput:ee,ElSelectMenu:Ne,ElOption:Ae,ElTag:Be,ElScrollbar:Ue},directives:{Clickoutside:nt},props:{name:String,id:String,value:{required:!0},autocomplete:{type:String,default:"off"},autoComplete:{type:String,validator:function(e){return!0}},automaticDropdown:Boolean,size:String,disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:String,remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String,default:function(){return R("el.select.placeholder")}},defaultFirstOption:Boolean,reserveKeyword:Boolean,valueKey:{type:String,default:"value"},collapseTags:Boolean,popperAppendToBody:{type:Boolean,default:!0}},data:function(){return{options:[],cachedOptions:[],createdLabel:null,createdSelected:!1,selected:this.multiple?[]:{},inputLength:20,inputWidth:0,initialInputHeight:0,cachedPlaceHolder:"",optionsCount:0,filteredOptionsCount:0,visible:!1,softFocus:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,currentPlaceholder:"",menuVisibleOnFocus:!1,isOnComposition:!1,isSilentBlur:!1}},watch:{selectDisabled:function(){var e=this;this.$nextTick(function(){e.resetInputHeight()})},placeholder:function(e){this.cachedPlaceHolder=this.currentPlaceholder=e},value:function(e,t){this.multiple&&(this.resetInputHeight(),e&&e.length>0||this.$refs.input&&""!==this.query?this.currentPlaceholder="":this.currentPlaceholder=this.cachedPlaceHolder,this.filterable&&!this.reserveKeyword&&(this.query="",this.handleQueryChange(this.query))),this.setSelected(),this.filterable&&!this.multiple&&(this.inputLength=20),$(e,t)||this.dispatch("ElFormItem","el.form.change",e)},visible:function(e){var t=this;e?(this.broadcast("ElSelectDropdown","updatePopper"),this.filterable&&(this.query=this.remote?"":this.selectedLabel,this.handleQueryChange(this.query),this.multiple?this.$refs.input.focus():(this.remote||(this.broadcast("ElOption","queryChange",""),this.broadcast("ElOptionGroup","queryChange")),this.selectedLabel&&(this.currentPlaceholder=this.selectedLabel,this.selectedLabel="")))):(this.broadcast("ElSelectDropdown","destroyPopper"),this.$refs.input&&this.$refs.input.blur(),this.query="",this.previousQuery=null,this.selectedLabel="",this.inputLength=20,this.menuVisibleOnFocus=!1,this.resetHoverIndex(),this.$nextTick(function(){t.$refs.input&&""===t.$refs.input.value&&0===t.selected.length&&(t.currentPlaceholder=t.cachedPlaceHolder)}),this.multiple||(this.selected&&(this.filterable&&this.allowCreate&&this.createdSelected&&this.createdLabel?this.selectedLabel=this.createdLabel:this.selectedLabel=this.selected.currentLabel,this.filterable&&(this.query=this.selectedLabel)),this.filterable&&(this.currentPlaceholder=this.cachedPlaceHolder))),this.$emit("visible-change",e)},options:function(){var e=this;if(!this.$isServer){this.$nextTick(function(){e.broadcast("ElSelectDropdown","updatePopper")}),this.multiple&&this.resetInputHeight();var t=this.$el.querySelectorAll("input");-1===[].indexOf.call(t,document.activeElement)&&this.setSelected(),this.defaultFirstOption&&(this.filterable||this.remote)&&this.filteredOptionsCount&&this.checkDefaultFirstOption()}}},methods:{handleComposition:function(e){var t=this,i=e.target.value;if("compositionend"===e.type)this.isOnComposition=!1,this.$nextTick(function(e){return t.handleQueryChange(i)});else{var n=i[i.length-1]||"";this.isOnComposition=!function(e){return/([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e)}(n)}},handleQueryChange:function(e){var t=this;this.previousQuery===e||this.isOnComposition||(null!==this.previousQuery||"function"!=typeof this.filterMethod&&"function"!=typeof this.remoteMethod?(this.previousQuery=e,this.$nextTick(function(){t.visible&&t.broadcast("ElSelectDropdown","updatePopper")}),this.hoverIndex=-1,this.multiple&&this.filterable&&this.$nextTick(function(){var e=15*t.$refs.input.value.length+20;t.inputLength=t.collapseTags?Math.min(50,e):e,t.managePlaceholder(),t.resetInputHeight()}),this.remote&&"function"==typeof this.remoteMethod?(this.hoverIndex=-1,this.remoteMethod(e)):"function"==typeof this.filterMethod?(this.filterMethod(e),this.broadcast("ElOptionGroup","queryChange")):(this.filteredOptionsCount=this.optionsCount,this.broadcast("ElOption","queryChange",e),this.broadcast("ElOptionGroup","queryChange")),this.defaultFirstOption&&(this.filterable||this.remote)&&this.filteredOptionsCount&&this.checkDefaultFirstOption()):this.previousQuery=e)},scrollToOption:function(e){var t=Array.isArray(e)&&e[0]?e[0].$el:e.$el;this.$refs.popper&&t&&rt(this.$refs.popper.$el.querySelector(".el-select-dropdown__wrap"),t);this.$refs.scrollbar&&this.$refs.scrollbar.handleScroll()},handleMenuEnter:function(){var e=this;this.$nextTick(function(){return e.scrollToOption(e.selected)})},emitChange:function(e){$(this.value,e)||this.$emit("change",e)},getOption:function(e){for(var t=void 0,i="[object object]"===Object.prototype.toString.call(e).toLowerCase(),n="[object null]"===Object.prototype.toString.call(e).toLowerCase(),r="[object undefined]"===Object.prototype.toString.call(e).toLowerCase(),s=this.cachedOptions.length-1;s>=0;s--){var a=this.cachedOptions[s];if(i?k(a.value,this.valueKey)===k(e,this.valueKey):a.value===e){t=a;break}}if(t)return t;var o={value:e,currentLabel:i||n||r?"":e};return this.multiple&&(o.hitState=!1),o},setSelected:function(){var e=this;if(!this.multiple){var t=this.getOption(this.value);return t.created?(this.createdLabel=t.currentLabel,this.createdSelected=!0):this.createdSelected=!1,this.selectedLabel=t.currentLabel,this.selected=t,void(this.filterable&&(this.query=this.selectedLabel))}var i=[];Array.isArray(this.value)&&this.value.forEach(function(t){i.push(e.getOption(t))}),this.selected=i,this.$nextTick(function(){e.resetInputHeight()})},handleFocus:function(e){this.softFocus?this.softFocus=!1:((this.automaticDropdown||this.filterable)&&(this.visible=!0,this.menuVisibleOnFocus=!0),this.$emit("focus",e))},blur:function(){this.visible=!1,this.$refs.reference.blur()},handleBlur:function(e){var t=this;setTimeout(function(){t.isSilentBlur?t.isSilentBlur=!1:t.$emit("blur",e)},50),this.softFocus=!1},handleClearClick:function(e){this.deleteSelected(e)},doDestroy:function(){this.$refs.popper&&this.$refs.popper.doDestroy()},handleClose:function(){this.visible=!1},toggleLastOptionHitState:function(e){if(Array.isArray(this.selected)){var t=this.selected[this.selected.length-1];if(t)return!0===e||!1===e?(t.hitState=e,e):(t.hitState=!t.hitState,t.hitState)}},deletePrevTag:function(e){if(e.target.value.length<=0&&!this.toggleLastOptionHitState()){var t=this.value.slice();t.pop(),this.$emit("input",t),this.emitChange(t)}},managePlaceholder:function(){""!==this.currentPlaceholder&&(this.currentPlaceholder=this.$refs.input.value?"":this.cachedPlaceHolder)},resetInputState:function(e){8!==e.keyCode&&this.toggleLastOptionHitState(!1),this.inputLength=15*this.$refs.input.value.length+20,this.resetInputHeight()},resetInputHeight:function(){var e=this;this.collapseTags&&!this.filterable||this.$nextTick(function(){if(e.$refs.reference){var t=e.$refs.reference.$el.childNodes,i=[].filter.call(t,function(e){return"INPUT"===e.tagName})[0],n=e.$refs.tags,r=e.initialInputHeight||40;i.style.height=0===e.selected.length?r+"px":Math.max(n?n.clientHeight+(n.clientHeight>r?6:0):0,r)+"px",e.visible&&!1!==e.emptyText&&e.broadcast("ElSelectDropdown","updatePopper")}})},resetHoverIndex:function(){var e=this;setTimeout(function(){e.multiple?e.selected.length>0?e.hoverIndex=Math.min.apply(null,e.selected.map(function(t){return e.options.indexOf(t)})):e.hoverIndex=-1:e.hoverIndex=e.options.indexOf(e.selected)},300)},handleOptionSelect:function(e,t){var i=this;if(this.multiple){var n=(this.value||[]).slice(),r=this.getValueIndex(n,e.value);r>-1?n.splice(r,1):(this.multipleLimit<=0||n.length<this.multipleLimit)&&n.push(e.value),this.$emit("input",n),this.emitChange(n),e.created&&(this.query="",this.handleQueryChange(""),this.inputLength=20),this.filterable&&this.$refs.input.focus()}else this.$emit("input",e.value),this.emitChange(e.value),this.visible=!1;this.isSilentBlur=t,this.setSoftFocus(),this.visible||this.$nextTick(function(){i.scrollToOption(e)})},setSoftFocus:function(){this.softFocus=!0;var e=this.$refs.input||this.$refs.reference;e&&e.focus()},getValueIndex:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];if("[object object]"===Object.prototype.toString.call(t).toLowerCase()){var i=this.valueKey,n=-1;return e.some(function(e,r){return k(e,i)===k(t,i)&&(n=r,!0)}),n}return e.indexOf(t)},toggleMenu:function(){this.selectDisabled||(this.menuVisibleOnFocus?this.menuVisibleOnFocus=!1:this.visible=!this.visible,this.visible&&(this.$refs.input||this.$refs.reference).focus())},selectOption:function(){this.visible?this.options[this.hoverIndex]&&this.handleOptionSelect(this.options[this.hoverIndex]):this.toggleMenu()},deleteSelected:function(e){e.stopPropagation();var t=this.multiple?[]:"";this.$emit("input",t),this.emitChange(t),this.visible=!1,this.$emit("clear")},deleteTag:function(e,t){var i=this.selected.indexOf(t);if(i>-1&&!this.selectDisabled){var n=this.value.slice();n.splice(i,1),this.$emit("input",n),this.emitChange(n),this.$emit("remove-tag",t.value)}e.stopPropagation()},onInputChange:function(){this.filterable&&this.query!==this.selectedLabel&&(this.query=this.selectedLabel,this.handleQueryChange(this.query))},onOptionDestroy:function(e){e>-1&&(this.optionsCount--,this.filteredOptionsCount--,this.options.splice(e,1))},resetInputWidth:function(){this.inputWidth=this.$refs.reference.$el.getBoundingClientRect().width},handleResize:function(){this.resetInputWidth(),this.multiple&&this.resetInputHeight()},checkDefaultFirstOption:function(){this.hoverIndex=-1;for(var e=!1,t=this.options.length-1;t>=0;t--)if(this.options[t].created){e=!0,this.hoverIndex=t;break}if(!e)for(var i=0;i!==this.options.length;++i){var n=this.options[i];if(this.query){if(!n.disabled&&!n.groupDisabled&&n.visible){this.hoverIndex=i;break}}else if(n.itemSelected){this.hoverIndex=i;break}}},getValueKey:function(e){return"[object object]"!==Object.prototype.toString.call(e.value).toLowerCase()?e.value:k(e.value,this.valueKey)}},created:function(){var e=this;this.cachedPlaceHolder=this.currentPlaceholder=this.placeholder,this.multiple&&!Array.isArray(this.value)&&this.$emit("input",[]),!this.multiple&&Array.isArray(this.value)&&this.$emit("input",""),this.debouncedOnInputChange=Je()(this.debounce,function(){e.onInputChange()}),this.debouncedQueryChange=Je()(this.debounce,function(t){e.handleQueryChange(t.target.value)}),this.$on("handleOptionClick",this.handleOptionSelect),this.$on("setSelected",this.setSelected)},mounted:function(){var e=this;this.multiple&&Array.isArray(this.value)&&this.value.length>0&&(this.currentPlaceholder=""),We(this.$el,this.handleResize);var t=this.$refs.reference;if(t&&t.$el){var i=t.$el.querySelector("input");this.initialInputHeight=i.getBoundingClientRect().height||{medium:36,small:32,mini:28}[this.selectSize]}this.remote&&this.multiple&&this.resetInputHeight(),this.$nextTick(function(){t&&t.$el&&(e.inputWidth=t.$el.getBoundingClientRect().width)}),this.setSelected()},beforeDestroy:function(){this.$el&&this.handleResize&&je(this.$el,this.handleResize)}},o,[],!1,null,null,null);at.options.__file="packages/select/src/select.vue";var ot=at.exports;ot.install=function(e){e.component(ot.name,ot)};var lt=ot;Ae.install=function(e){e.component(Ae.name,Ae)};var ut=Ae,ct={name:"ElPagination",props:{pageSize:{type:Number,default:10},small:Boolean,total:Number,pageCount:Number,pagerCount:{type:Number,validator:function(e){return(0|e)===e&&e>4&&e<22&&e%2==1},default:7},currentPage:{type:Number,default:1},layout:{default:"prev, pager, next, jumper, ->, total"},pageSizes:{type:Array,default:function(){return[10,20,30,40,50,100]}},popperClass:String,prevText:String,nextText:String,background:Boolean,disabled:Boolean,hideOnSinglePage:Boolean},data:function(){return{internalCurrentPage:1,internalPageSize:0,lastEmittedPage:-1,userChangePageSize:!1}},render:function(e){var t=this.layout;if(!t)return null;if(this.hideOnSinglePage&&(!this.internalPageCount||1===this.internalPageCount))return null;var i=e("div",{class:["el-pagination",{"is-background":this.background,"el-pagination--small":this.small}]}),n={prev:e("prev"),jumper:e("jumper"),pager:e("pager",{attrs:{currentPage:this.internalCurrentPage,pageCount:this.internalPageCount,pagerCount:this.pagerCount,disabled:this.disabled},on:{change:this.handleCurrentChange}}),next:e("next"),sizes:e("sizes",{attrs:{pageSizes:this.pageSizes}}),slot:e("slot",[this.$slots.default?this.$slots.default:""]),total:e("total")},r=t.split(",").map(function(e){return e.trim()}),s=e("div",{class:"el-pagination__rightwrapper"}),a=!1;return i.children=i.children||[],s.children=s.children||[],r.forEach(function(e){"->"!==e?a?s.children.push(n[e]):i.children.push(n[e]):a=!0}),a&&i.children.unshift(s),i},components:{Prev:{render:function(e){return e("button",{attrs:{type:"button",disabled:this.$parent.disabled||this.$parent.internalCurrentPage<=1},class:"btn-prev",on:{click:this.$parent.prev}},[this.$parent.prevText?e("span",[this.$parent.prevText]):e("i",{class:"el-icon el-icon-arrow-left"})])}},Next:{render:function(e){return e("button",{attrs:{type:"button",disabled:this.$parent.disabled||this.$parent.internalCurrentPage===this.$parent.internalPageCount||0===this.$parent.internalPageCount},class:"btn-next",on:{click:this.$parent.next}},[this.$parent.nextText?e("span",[this.$parent.nextText]):e("i",{class:"el-icon el-icon-arrow-right"})])}},Sizes:{mixins:[j],props:{pageSizes:Array},watch:{pageSizes:{immediate:!0,handler:function(e,t){$(e,t)||Array.isArray(e)&&(this.$parent.internalPageSize=e.indexOf(this.$parent.pageSize)>-1?this.$parent.pageSize:this.pageSizes[0])}}},render:function(e){var t=this;return e("span",{class:"el-pagination__sizes"},[e("el-select",{attrs:{value:this.$parent.internalPageSize,popperClass:this.$parent.popperClass||"",size:"mini",disabled:this.$parent.disabled},on:{input:this.handleChange}},[this.pageSizes.map(function(i){return e("el-option",{attrs:{value:i,label:i+t.t("el.pagination.pagesize")}})})])])},components:{ElSelect:lt,ElOption:ut},methods:{handleChange:function(e){e!==this.$parent.internalPageSize&&(this.$parent.internalPageSize=e=parseInt(e,10),this.$parent.userChangePageSize=!0,this.$parent.$emit("update:pageSize",e),this.$parent.$emit("size-change",e))}}},Jumper:{mixins:[j],components:{ElInput:ee},data:function(){return{userInput:null}},watch:{"$parent.internalCurrentPage":function(){this.userInput=null}},methods:{handleKeyup:function(e){var t=e.keyCode,i=e.target;13===t&&this.handleChange(i.value)},handleInput:function(e){this.userInput=e},handleChange:function(e){this.$parent.internalCurrentPage=this.$parent.getValidCurrentPage(e),this.$parent.emitChange(),this.userInput=null}},render:function(e){return e("span",{class:"el-pagination__jump"},[this.t("el.pagination.goto"),e("el-input",{class:"el-pagination__editor is-in-pagination",attrs:{min:1,max:this.$parent.internalPageCount,value:null!==this.userInput?this.userInput:this.$parent.internalCurrentPage,type:"number",disabled:this.$parent.disabled},nativeOn:{keyup:this.handleKeyup},on:{input:this.handleInput,change:this.handleChange}}),this.t("el.pagination.pageClassifier")])}},Total:{mixins:[j],render:function(e){return"number"==typeof this.$parent.total?e("span",{class:"el-pagination__total"},[this.t("el.pagination.total",{total:this.$parent.total})]):""}},Pager:a},methods:{handleCurrentChange:function(e){this.internalCurrentPage=this.getValidCurrentPage(e),this.userChangePageSize=!0,this.emitChange()},prev:function(){if(!this.disabled){var e=this.internalCurrentPage-1;this.internalCurrentPage=this.getValidCurrentPage(e),this.$emit("prev-click",this.internalCurrentPage),this.emitChange()}},next:function(){if(!this.disabled){var e=this.internalCurrentPage+1;this.internalCurrentPage=this.getValidCurrentPage(e),this.$emit("next-click",this.internalCurrentPage),this.emitChange()}},getValidCurrentPage:function(e){e=parseInt(e,10);var t=void 0;return"number"==typeof this.internalPageCount?e<1?t=1:e>this.internalPageCount&&(t=this.internalPageCount):(isNaN(e)||e<1)&&(t=1),void 0===t&&isNaN(e)?t=1:0===t&&(t=1),void 0===t?e:t},emitChange:function(){var e=this;this.$nextTick(function(){(e.internalCurrentPage!==e.lastEmittedPage||e.userChangePageSize)&&(e.$emit("current-change",e.internalCurrentPage),e.lastEmittedPage=e.internalCurrentPage,e.userChangePageSize=!1)})}},computed:{internalPageCount:function(){return"number"==typeof this.total?Math.max(1,Math.ceil(this.total/this.internalPageSize)):"number"==typeof this.pageCount?Math.max(1,this.pageCount):null}},watch:{currentPage:{immediate:!0,handler:function(e){this.internalCurrentPage=this.getValidCurrentPage(e)}},pageSize:{immediate:!0,handler:function(e){this.internalPageSize=isNaN(e)?10:e}},internalCurrentPage:{immediate:!0,handler:function(e){this.$emit("update:currentPage",e),this.lastEmittedPage=-1}},internalPageCount:function(e){var t=this.internalCurrentPage;e>0&&0===t?this.internalCurrentPage=1:t>e&&(this.internalCurrentPage=0===e?1:e,this.userChangePageSize&&this.emitChange()),this.userChangePageSize=!1}},install:function(e){e.component(ct.name,ct)}},ht=ct,dt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"dialog-fade"},on:{"after-enter":e.afterEnter,"after-leave":e.afterLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-dialog__wrapper",on:{click:function(t){return t.target!==t.currentTarget?null:e.handleWrapperClick(t)}}},[i("div",{ref:"dialog",staticClass:"el-dialog",class:[{"is-fullscreen":e.fullscreen,"el-dialog--center":e.center},e.customClass],style:e.style,attrs:{role:"dialog","aria-modal":"true","aria-label":e.title||"dialog"}},[i("div",{staticClass:"el-dialog__header"},[e._t("title",[i("span",{staticClass:"el-dialog__title"},[e._v(e._s(e.title))])]),e.showClose?i("button",{staticClass:"el-dialog__headerbtn",attrs:{type:"button","aria-label":"Close"},on:{click:e.handleClose}},[i("i",{staticClass:"el-dialog__close el-icon el-icon-close"})]):e._e()],2),e.rendered?i("div",{staticClass:"el-dialog__body"},[e._t("default")],2):e._e(),e.$slots.footer?i("div",{staticClass:"el-dialog__footer"},[e._t("footer")],2):e._e()])])])};dt._withStripped=!0;var pt=r({name:"ElDialog",mixins:[$e,l,Y],props:{title:{type:String,default:""},modal:{type:Boolean,default:!0},modalAppendToBody:{type:Boolean,default:!0},appendToBody:{type:Boolean,default:!1},lockScroll:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},width:String,fullscreen:Boolean,customClass:{type:String,default:""},top:{type:String,default:"15vh"},beforeClose:Function,center:{type:Boolean,default:!1}},data:function(){return{closed:!1}},watch:{visible:function(e){var t=this;e?(this.closed=!1,this.$emit("open"),this.$el.addEventListener("scroll",this.updatePopper),this.$nextTick(function(){t.$refs.dialog.scrollTop=0}),this.appendToBody&&document.body.appendChild(this.$el)):(this.$el.removeEventListener("scroll",this.updatePopper),this.closed||this.$emit("close"))}},computed:{style:function(){var e={};return this.fullscreen||(e.marginTop=this.top,this.width&&(e.width=this.width)),e}},methods:{getMigratingConfig:function(){return{props:{size:"size is removed."}}},handleWrapperClick:function(){this.closeOnClickModal&&this.handleClose()},handleClose:function(){"function"==typeof this.beforeClose?this.beforeClose(this.hide):this.hide()},hide:function(e){!1!==e&&(this.$emit("update:visible",!1),this.$emit("close"),this.closed=!0)},updatePopper:function(){this.broadcast("ElSelectDropdown","updatePopper"),this.broadcast("ElDropdownMenu","updatePopper")},afterEnter:function(){this.$emit("opened")},afterLeave:function(){this.$emit("closed")}},mounted:function(){this.visible&&(this.rendered=!0,this.open(),this.appendToBody&&document.body.appendChild(this.$el))},destroyed:function(){this.appendToBody&&this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)}},dt,[],!1,null,null,null);pt.options.__file="packages/dialog/src/component.vue";var ft=pt.exports;ft.install=function(e){e.component(ft.name,ft)};var mt=ft,vt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.close,expression:"close"}],staticClass:"el-autocomplete",attrs:{"aria-haspopup":"listbox",role:"combobox","aria-expanded":e.suggestionVisible,"aria-owns":e.id}},[i("el-input",e._b({ref:"input",on:{input:e.handleChange,focus:e.handleFocus,blur:e.handleBlur,clear:e.handleClear},nativeOn:{keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"]))return null;t.preventDefault(),e.highlight(e.highlightedIndex-1)},function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"]))return null;t.preventDefault(),e.highlight(e.highlightedIndex+1)},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleKeyEnter(t):null},function(t){return"button"in t||!e._k(t.keyCode,"tab",9,t.key,"Tab")?e.close(t):null}]}},"el-input",[e.$props,e.$attrs],!1),[e.$slots.prepend?i("template",{slot:"prepend"},[e._t("prepend")],2):e._e(),e.$slots.append?i("template",{slot:"append"},[e._t("append")],2):e._e(),e.$slots.prefix?i("template",{slot:"prefix"},[e._t("prefix")],2):e._e(),e.$slots.suffix?i("template",{slot:"suffix"},[e._t("suffix")],2):e._e()],2),i("el-autocomplete-suggestions",{ref:"suggestions",class:[e.popperClass?e.popperClass:""],attrs:{"visible-arrow":"","popper-options":e.popperOptions,"append-to-body":e.popperAppendToBody,placement:e.placement,id:e.id}},e._l(e.suggestions,function(t,n){return i("li",{key:n,class:{highlighted:e.highlightedIndex===n},attrs:{id:e.id+"-item-"+n,role:"option","aria-selected":e.highlightedIndex===n},on:{click:function(i){e.select(t)}}},[e._t("default",[e._v("\n        "+e._s(t[e.valueKey])+"\n      ")],{item:t})],2)}),0)],1)};vt._withStripped=!0;var gt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":e.doDestroy}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.showPopper,expression:"showPopper"}],staticClass:"el-autocomplete-suggestion el-popper",class:{"is-loading":!e.parent.hideLoading&&e.parent.loading},style:{width:e.dropdownWidth},attrs:{role:"region"}},[i("el-scrollbar",{attrs:{tag:"ul","wrap-class":"el-autocomplete-suggestion__wrap","view-class":"el-autocomplete-suggestion__list"}},[!e.parent.hideLoading&&e.parent.loading?i("li",[i("i",{staticClass:"el-icon-loading"})]):e._t("default")],2)],1)])};gt._withStripped=!0;var bt=r({components:{ElScrollbar:Ue},mixins:[Me,l],componentName:"ElAutocompleteSuggestions",data:function(){return{parent:this.$parent,dropdownWidth:""}},props:{options:{default:function(){return{gpuAcceleration:!1}}},id:String},methods:{select:function(e){this.dispatch("ElAutocomplete","item-click",e)}},updated:function(){var e=this;this.$nextTick(function(t){e.popperJS&&e.updatePopper()})},mounted:function(){this.$parent.popperElm=this.popperElm=this.$el,this.referenceElm=this.$parent.$refs.input.$refs.input,this.referenceList=this.$el.querySelector(".el-autocomplete-suggestion__list"),this.referenceList.setAttribute("role","listbox"),this.referenceList.setAttribute("id",this.id)},created:function(){var e=this;this.$on("visible",function(t,i){e.dropdownWidth=i+"px",e.showPopper=t})}},gt,[],!1,null,null,null);bt.options.__file="packages/autocomplete/src/autocomplete-suggestions.vue";var yt=bt.exports,wt=r({name:"ElAutocomplete",mixins:[l,u("input"),Y],inheritAttrs:!1,componentName:"ElAutocomplete",components:{ElInput:ee,ElAutocompleteSuggestions:yt},directives:{Clickoutside:nt},props:{valueKey:{type:String,default:"value"},popperClass:String,popperOptions:Object,placeholder:String,clearable:{type:Boolean,default:!1},disabled:Boolean,name:String,size:String,value:String,maxlength:Number,minlength:Number,autofocus:Boolean,fetchSuggestions:Function,triggerOnFocus:{type:Boolean,default:!0},customItem:String,selectWhenUnmatched:{type:Boolean,default:!1},prefixIcon:String,suffixIcon:String,label:String,debounce:{type:Number,default:300},placement:{type:String,default:"bottom-start"},hideLoading:Boolean,popperAppendToBody:{type:Boolean,default:!0},highlightFirstItem:{type:Boolean,default:!1}},data:function(){return{activated:!1,suggestions:[],loading:!1,highlightedIndex:-1,suggestionDisabled:!1}},computed:{suggestionVisible:function(){var e=this.suggestions;return(Array.isArray(e)&&e.length>0||this.loading)&&this.activated},id:function(){return"el-autocomplete-"+D()}},watch:{suggestionVisible:function(e){var t=this.getInput();t&&this.broadcast("ElAutocompleteSuggestions","visible",[e,t.offsetWidth])}},methods:{getMigratingConfig:function(){return{props:{"custom-item":"custom-item is removed, use scoped slot instead.",props:"props is removed, use value-key instead."}}},getData:function(e){var t=this;this.suggestionDisabled||(this.loading=!0,this.fetchSuggestions(e,function(e){t.loading=!1,t.suggestionDisabled||(Array.isArray(e)?(t.suggestions=e,t.highlightedIndex=t.highlightFirstItem?0:-1):console.error("[Element Error][Autocomplete]autocomplete suggestions must be an array"))}))},handleChange:function(e){if(this.$emit("input",e),this.suggestionDisabled=!1,!this.triggerOnFocus&&!e)return this.suggestionDisabled=!0,void(this.suggestions=[]);this.debouncedGetData(e)},handleFocus:function(e){this.activated=!0,this.$emit("focus",e),this.triggerOnFocus&&this.debouncedGetData(this.value)},handleBlur:function(e){this.$emit("blur",e)},handleClear:function(){this.activated=!1,this.$emit("clear")},close:function(e){this.activated=!1},handleKeyEnter:function(e){var t=this;this.suggestionVisible&&this.highlightedIndex>=0&&this.highlightedIndex<this.suggestions.length?(e.preventDefault(),this.select(this.suggestions[this.highlightedIndex])):this.selectWhenUnmatched&&(this.$emit("select",{value:this.value}),this.$nextTick(function(e){t.suggestions=[],t.highlightedIndex=-1}))},select:function(e){var t=this;this.$emit("input",e[this.valueKey]),this.$emit("select",e),this.$nextTick(function(e){t.suggestions=[],t.highlightedIndex=-1})},highlight:function(e){if(this.suggestionVisible&&!this.loading)if(e<0)this.highlightedIndex=-1;else{e>=this.suggestions.length&&(e=this.suggestions.length-1);var t=this.$refs.suggestions.$el.querySelector(".el-autocomplete-suggestion__wrap"),i=t.querySelectorAll(".el-autocomplete-suggestion__list li")[e],n=t.scrollTop,r=i.offsetTop;r+i.scrollHeight>n+t.clientHeight&&(t.scrollTop+=i.scrollHeight),r<n&&(t.scrollTop-=i.scrollHeight),this.highlightedIndex=e,this.getInput().setAttribute("aria-activedescendant",this.id+"-item-"+this.highlightedIndex)}},getInput:function(){return this.$refs.input.getInput()}},mounted:function(){var e=this;this.debouncedGetData=Je()(this.debounce,this.getData),this.$on("item-click",function(t){e.select(t)});var t=this.getInput();t.setAttribute("role","textbox"),t.setAttribute("aria-autocomplete","list"),t.setAttribute("aria-controls","id"),t.setAttribute("aria-activedescendant",this.id+"-item-"+this.highlightedIndex)},beforeDestroy:function(){this.$refs.suggestions.$destroy()}},vt,[],!1,null,null,null);wt.options.__file="packages/autocomplete/src/autocomplete.vue";var xt=wt.exports;xt.install=function(e){e.component(xt.name,xt)};var _t=xt,Ct=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("button",{staticClass:"el-button",class:[e.type?"el-button--"+e.type:"",e.buttonSize?"el-button--"+e.buttonSize:"",{"is-disabled":e.buttonDisabled,"is-loading":e.loading,"is-plain":e.plain,"is-round":e.round,"is-circle":e.circle}],attrs:{disabled:e.buttonDisabled||e.loading,autofocus:e.autofocus,type:e.nativeType},on:{click:e.handleClick}},[e.loading?i("i",{staticClass:"el-icon-loading"}):e._e(),e.icon&&!e.loading?i("i",{class:e.icon}):e._e(),e.$slots.default?i("span",[e._t("default")],2):e._e()])};Ct._withStripped=!0;var kt=r({name:"ElButton",inject:{elForm:{default:""},elFormItem:{default:""}},props:{type:{type:String,default:"default"},size:String,icon:{type:String,default:""},nativeType:{type:String,default:"button"},loading:Boolean,disabled:Boolean,plain:Boolean,autofocus:Boolean,round:Boolean,circle:Boolean},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},buttonSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},buttonDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},methods:{handleClick:function(e){this.$emit("click",e)}}},Ct,[],!1,null,null,null);kt.options.__file="packages/button/src/button.vue";var St=kt.exports;St.install=function(e){e.component(St.name,St)};var Dt=St,$t=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-button-group"},[this._t("default")],2)};$t._withStripped=!0;var Et=r({name:"ElButtonGroup"},$t,[],!1,null,null,null);Et.options.__file="packages/button/src/button-group.vue";var Tt=Et.exports;Tt.install=function(e){e.component(Tt.name,Tt)};var Mt=Tt,Pt=r({name:"ElDropdown",componentName:"ElDropdown",mixins:[l,Y],directives:{Clickoutside:nt},components:{ElButton:Dt,ElButtonGroup:Mt},provide:function(){return{dropdown:this}},props:{trigger:{type:String,default:"hover"},type:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},placement:{type:String,default:"bottom-end"},visibleArrow:{default:!0},showTimeout:{type:Number,default:250},hideTimeout:{type:Number,default:150},tabindex:{type:Number,default:0}},data:function(){return{timeout:null,visible:!1,triggerElm:null,menuItems:null,menuItemsArray:null,dropdownElm:null,focusing:!1,listId:"dropdown-menu-"+D()}},computed:{dropdownSize:function(){return this.size||(this.$ELEMENT||{}).size}},mounted:function(){this.$on("menu-item-click",this.handleMenuItemClick)},watch:{visible:function(e){this.broadcast("ElDropdownMenu","visible",e),this.$emit("visible-change",e)},focusing:function(e){var t=this.$el.querySelector(".el-dropdown-selfdefine");t&&(e?t.className+=" focusing":t.className=t.className.replace("focusing",""))}},methods:{getMigratingConfig:function(){return{props:{"menu-align":"menu-align is renamed to placement."}}},show:function(){var e=this;this.triggerElm.disabled||(clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.visible=!0},"click"===this.trigger?0:this.showTimeout))},hide:function(){var e=this;this.triggerElm.disabled||(this.removeTabindex(),this.tabindex>=0&&this.resetTabindex(this.triggerElm),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.visible=!1},"click"===this.trigger?0:this.hideTimeout))},handleClick:function(){this.triggerElm.disabled||(this.visible?this.hide():this.show())},handleTriggerKeyDown:function(e){var t=e.keyCode;[38,40].indexOf(t)>-1?(this.removeTabindex(),this.resetTabindex(this.menuItems[0]),this.menuItems[0].focus(),e.preventDefault(),e.stopPropagation()):13===t?this.handleClick():[9,27].indexOf(t)>-1&&this.hide()},handleItemKeyDown:function(e){var t=e.keyCode,i=e.target,n=this.menuItemsArray.indexOf(i),r=this.menuItemsArray.length-1,s=void 0;[38,40].indexOf(t)>-1?(s=38===t?0!==n?n-1:0:n<r?n+1:r,this.removeTabindex(),this.resetTabindex(this.menuItems[s]),this.menuItems[s].focus(),e.preventDefault(),e.stopPropagation()):13===t?(this.triggerElmFocus(),i.click(),this.hideOnClick&&(this.visible=!1)):[9,27].indexOf(t)>-1&&(this.hide(),this.triggerElmFocus())},resetTabindex:function(e){this.removeTabindex(),e.setAttribute("tabindex","0")},removeTabindex:function(){this.triggerElm.setAttribute("tabindex","-1"),this.menuItemsArray.forEach(function(e){e.setAttribute("tabindex","-1")})},initAria:function(){this.dropdownElm.setAttribute("id",this.listId),this.triggerElm.setAttribute("aria-haspopup","list"),this.triggerElm.setAttribute("aria-controls",this.listId),this.splitButton||(this.triggerElm.setAttribute("role","button"),this.triggerElm.setAttribute("tabindex",this.tabindex),this.triggerElm.setAttribute("class",(this.triggerElm.getAttribute("class")||"")+" el-dropdown-selfdefine"))},initEvent:function(){var e=this,t=this.trigger,i=this.show,n=this.hide,r=this.handleClick,s=this.splitButton,a=this.handleTriggerKeyDown,o=this.handleItemKeyDown;this.triggerElm=s?this.$refs.trigger.$el:this.$slots.default[0].elm;var l=this.dropdownElm;this.triggerElm.addEventListener("keydown",a),l.addEventListener("keydown",o,!0),s||(this.triggerElm.addEventListener("focus",function(){e.focusing=!0}),this.triggerElm.addEventListener("blur",function(){e.focusing=!1}),this.triggerElm.addEventListener("click",function(){e.focusing=!1})),"hover"===t?(this.triggerElm.addEventListener("mouseenter",i),this.triggerElm.addEventListener("mouseleave",n),l.addEventListener("mouseenter",i),l.addEventListener("mouseleave",n)):"click"===t&&this.triggerElm.addEventListener("click",r)},handleMenuItemClick:function(e,t){this.hideOnClick&&(this.visible=!1),this.$emit("command",e,t)},triggerElmFocus:function(){this.triggerElm.focus&&this.triggerElm.focus()},initDomOperation:function(){this.dropdownElm=this.popperElm,this.menuItems=this.dropdownElm.querySelectorAll("[tabindex='-1']"),this.menuItemsArray=[].slice.call(this.menuItems),this.initEvent(),this.initAria()}},render:function(e){var t=this,i=this.hide,n=this.splitButton,r=this.type,s=this.dropdownSize,a=n?e("el-button-group",[e("el-button",{attrs:{type:r,size:s},nativeOn:{click:function(e){t.$emit("click",e),i()}}},[this.$slots.default]),e("el-button",{ref:"trigger",attrs:{type:r,size:s},class:"el-dropdown__caret-button"},[e("i",{class:"el-dropdown__icon el-icon-arrow-down"})])]):this.$slots.default;return e("div",{class:"el-dropdown",directives:[{name:"clickoutside",value:i}]},[a,this.$slots.dropdown])}},void 0,void 0,!1,null,null,null);Pt.options.__file="packages/dropdown/src/dropdown.vue";var Nt=Pt.exports;Nt.install=function(e){e.component(Nt.name,Nt)};var Ot=Nt,It=function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":this.doDestroy}},[t("ul",{directives:[{name:"show",rawName:"v-show",value:this.showPopper,expression:"showPopper"}],staticClass:"el-dropdown-menu el-popper",class:[this.size&&"el-dropdown-menu--"+this.size]},[this._t("default")],2)])};It._withStripped=!0;var Ft=r({name:"ElDropdownMenu",componentName:"ElDropdownMenu",mixins:[Me],props:{visibleArrow:{type:Boolean,default:!0},arrowOffset:{type:Number,default:0}},data:function(){return{size:this.dropdown.dropdownSize}},inject:["dropdown"],created:function(){var e=this;this.$on("updatePopper",function(){e.showPopper&&e.updatePopper()}),this.$on("visible",function(t){e.showPopper=t})},mounted:function(){this.dropdown.popperElm=this.popperElm=this.$el,this.referenceElm=this.dropdown.$el,this.dropdown.initDomOperation()},watch:{"dropdown.placement":{immediate:!0,handler:function(e){this.currentPlacement=e}}}},It,[],!1,null,null,null);Ft.options.__file="packages/dropdown/src/dropdown-menu.vue";var At=Ft.exports;At.install=function(e){e.component(At.name,At)};var Lt=At,Vt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"el-dropdown-menu__item",class:{"is-disabled":e.disabled,"el-dropdown-menu__item--divided":e.divided},attrs:{"aria-disabled":e.disabled,tabindex:e.disabled?null:-1},on:{click:e.handleClick}},[e.icon?i("i",{class:e.icon}):e._e(),e._t("default")],2)};Vt._withStripped=!0;var Bt=r({name:"ElDropdownItem",mixins:[l],props:{command:{},disabled:Boolean,divided:Boolean,icon:String},methods:{handleClick:function(e){this.dispatch("ElDropdown","menu-item-click",[this.command,this])}}},Vt,[],!1,null,null,null);Bt.options.__file="packages/dropdown/src/dropdown-item.vue";var zt=Bt.exports;zt.install=function(e){e.component(zt.name,zt)};var Ht=zt,Rt=Rt||{};Rt.Utils=Rt.Utils||{},Rt.Utils.focusFirstDescendant=function(e){for(var t=0;t<e.childNodes.length;t++){var i=e.childNodes[t];if(Rt.Utils.attemptFocus(i)||Rt.Utils.focusFirstDescendant(i))return!0}return!1},Rt.Utils.focusLastDescendant=function(e){for(var t=e.childNodes.length-1;t>=0;t--){var i=e.childNodes[t];if(Rt.Utils.attemptFocus(i)||Rt.Utils.focusLastDescendant(i))return!0}return!1},Rt.Utils.attemptFocus=function(e){if(!Rt.Utils.isFocusable(e))return!1;Rt.Utils.IgnoreUtilFocusChanges=!0;try{e.focus()}catch(e){}return Rt.Utils.IgnoreUtilFocusChanges=!1,document.activeElement===e},Rt.Utils.isFocusable=function(e){if(e.tabIndex>0||0===e.tabIndex&&null!==e.getAttribute("tabIndex"))return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&"ignore"!==e.rel;case"INPUT":return"hidden"!==e.type&&"file"!==e.type;case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},Rt.Utils.triggerEvent=function(e,t){var i=void 0;i=/^mouse|click/.test(t)?"MouseEvents":/^key/.test(t)?"KeyboardEvent":"HTMLEvents";for(var n=document.createEvent(i),r=arguments.length,s=Array(r>2?r-2:0),a=2;a<r;a++)s[a-2]=arguments[a];return n.initEvent.apply(n,[t].concat(s)),e.dispatchEvent?e.dispatchEvent(n):e.fireEvent("on"+t,n),e},Rt.Utils.keys={tab:9,enter:13,space:32,left:37,up:38,right:39,down:40,esc:27};var Wt=Rt.Utils,jt=function(e,t){this.domNode=t,this.parent=e,this.subMenuItems=[],this.subIndex=0,this.init()};jt.prototype.init=function(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()},jt.prototype.gotoSubIndex=function(e){e===this.subMenuItems.length?e=0:e<0&&(e=this.subMenuItems.length-1),this.subMenuItems[e].focus(),this.subIndex=e},jt.prototype.addListeners=function(){var e=this,t=Wt.keys,i=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,function(n){n.addEventListener("keydown",function(n){var r=!1;switch(n.keyCode){case t.down:e.gotoSubIndex(e.subIndex+1),r=!0;break;case t.up:e.gotoSubIndex(e.subIndex-1),r=!0;break;case t.tab:Wt.triggerEvent(i,"mouseleave");break;case t.enter:case t.space:r=!0,n.currentTarget.click()}return r&&(n.preventDefault(),n.stopPropagation()),!1})})};var qt=jt,Yt=function(e){this.domNode=e,this.submenu=null,this.init()};Yt.prototype.init=function(){this.domNode.setAttribute("tabindex","0");var e=this.domNode.querySelector(".el-menu");e&&(this.submenu=new qt(this,e)),this.addListeners()},Yt.prototype.addListeners=function(){var e=this,t=Wt.keys;this.domNode.addEventListener("keydown",function(i){var n=!1;switch(i.keyCode){case t.down:Wt.triggerEvent(i.currentTarget,"mouseenter"),e.submenu&&e.submenu.gotoSubIndex(0),n=!0;break;case t.up:Wt.triggerEvent(i.currentTarget,"mouseenter"),e.submenu&&e.submenu.gotoSubIndex(e.submenu.subMenuItems.length-1),n=!0;break;case t.tab:Wt.triggerEvent(i.currentTarget,"mouseleave");break;case t.enter:case t.space:n=!0,i.currentTarget.click()}n&&i.preventDefault()})};var Kt=Yt,Gt=function(e){this.domNode=e,this.init()};Gt.prototype.init=function(){var e=this.domNode.childNodes;[].filter.call(e,function(e){return 1===e.nodeType}).forEach(function(e){new Kt(e)})};var Ut=Gt,Xt=r({name:"ElMenu",render:function(e){var t=e("ul",{attrs:{role:"menubar"},key:+this.collapse,style:{backgroundColor:this.backgroundColor||""},class:{"el-menu--horizontal":"horizontal"===this.mode,"el-menu--collapse":this.collapse,"el-menu":!0}},[this.$slots.default]);return this.collapseTransition?e("el-menu-collapse-transition",[t]):t},componentName:"ElMenu",mixins:[l,Y],provide:function(){return{rootMenu:this}},components:{"el-menu-collapse-transition":{functional:!0,render:function(e,t){return e("transition",{props:{mode:"out-in"},on:{beforeEnter:function(e){e.style.opacity=.2},enter:function(e){he(e,"el-opacity-transition"),e.style.opacity=1},afterEnter:function(e){de(e,"el-opacity-transition"),e.style.opacity=""},beforeLeave:function(e){e.dataset||(e.dataset={}),ce(e,"el-menu--collapse")?(de(e,"el-menu--collapse"),e.dataset.oldOverflow=e.style.overflow,e.dataset.scrollWidth=e.clientWidth,he(e,"el-menu--collapse")):(he(e,"el-menu--collapse"),e.dataset.oldOverflow=e.style.overflow,e.dataset.scrollWidth=e.clientWidth,de(e,"el-menu--collapse")),e.style.width=e.scrollWidth+"px",e.style.overflow="hidden"},leave:function(e){he(e,"horizontal-collapse-transition"),e.style.width=e.dataset.scrollWidth+"px"}}},t.children)}}},props:{mode:{type:String,default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:Array,uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,collapseTransition:{type:Boolean,default:!0}},data:function(){return{activeIndex:this.defaultActive,openedMenus:this.defaultOpeneds&&!this.collapse?this.defaultOpeneds.slice(0):[],items:{},submenus:{}}},computed:{hoverBackground:function(){return this.backgroundColor?this.mixColor(this.backgroundColor,.2):""},isMenuPopup:function(){return"horizontal"===this.mode||"vertical"===this.mode&&this.collapse}},watch:{defaultActive:function(e){this.items[e]||(this.activeIndex=null),this.updateActiveIndex(e)},defaultOpeneds:function(e){this.collapse||(this.openedMenus=e)},collapse:function(e){e&&(this.openedMenus=[]),this.broadcast("ElSubmenu","toggle-collapse",e)}},methods:{updateActiveIndex:function(e){var t=this.items[e]||this.items[this.activeIndex]||this.items[this.defaultActive];t?(this.activeIndex=t.index,this.initOpenedMenu()):this.activeIndex=null},getMigratingConfig:function(){return{props:{theme:"theme is removed."}}},getColorChannels:function(e){if(e=e.replace("#",""),/^[0-9a-fA-F]{3}$/.test(e)){e=e.split("");for(var t=2;t>=0;t--)e.splice(t,0,e[t]);e=e.join("")}return/^[0-9a-fA-F]{6}$/.test(e)?{red:parseInt(e.slice(0,2),16),green:parseInt(e.slice(2,4),16),blue:parseInt(e.slice(4,6),16)}:{red:255,green:255,blue:255}},mixColor:function(e,t){var i=this.getColorChannels(e),n=i.red,r=i.green,s=i.blue;return t>0?(n*=1-t,r*=1-t,s*=1-t):(n+=(255-n)*t,r+=(255-r)*t,s+=(255-s)*t),"rgb("+Math.round(n)+", "+Math.round(r)+", "+Math.round(s)+")"},addItem:function(e){this.$set(this.items,e.index,e)},removeItem:function(e){delete this.items[e.index]},addSubmenu:function(e){this.$set(this.submenus,e.index,e)},removeSubmenu:function(e){delete this.submenus[e.index]},openMenu:function(e,t){var i=this.openedMenus;-1===i.indexOf(e)&&(this.uniqueOpened&&(this.openedMenus=i.filter(function(e){return-1!==t.indexOf(e)})),this.openedMenus.push(e))},closeMenu:function(e){var t=this.openedMenus.indexOf(e);-1!==t&&this.openedMenus.splice(t,1)},handleSubmenuClick:function(e){var t=e.index,i=e.indexPath;-1!==this.openedMenus.indexOf(t)?(this.closeMenu(t),this.$emit("close",t,i)):(this.openMenu(t,i),this.$emit("open",t,i))},handleItemClick:function(e){var t=this,i=e.index,n=e.indexPath,r=this.activeIndex,s=null!==e.index;s&&(this.activeIndex=e.index),this.$emit("select",i,n,e),("horizontal"===this.mode||this.collapse)&&(this.openedMenus=[]),this.router&&s&&this.routeToItem(e,function(e){t.activeIndex=r,e&&console.error(e)})},initOpenedMenu:function(){var e=this,t=this.activeIndex,i=this.items[t];i&&"horizontal"!==this.mode&&!this.collapse&&i.indexPath.forEach(function(t){var i=e.submenus[t];i&&e.openMenu(t,i.indexPath)})},routeToItem:function(e,t){var i=e.route||e.index;try{this.$router.push(i,function(){},t)}catch(e){console.error(e)}},open:function(e){var t=this,i=this.submenus[e.toString()].indexPath;i.forEach(function(e){return t.openMenu(e,i)})},close:function(e){this.closeMenu(e)}},mounted:function(){this.initOpenedMenu(),this.$on("item-click",this.handleItemClick),this.$on("submenu-click",this.handleSubmenuClick),"horizontal"===this.mode&&new Ut(this.$el),this.$watch("items",this.updateActiveIndex)}},void 0,void 0,!1,null,null,null);Xt.options.__file="packages/menu/src/menu.vue";var Jt=Xt.exports;Jt.install=function(e){e.component(Jt.name,Jt)};var Zt=Jt;var Qt=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return e.prototype.beforeEnter=function(e){he(e,"collapse-transition"),e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.height="0",e.style.paddingTop=0,e.style.paddingBottom=0},e.prototype.enter=function(e){e.dataset.oldOverflow=e.style.overflow,0!==e.scrollHeight?(e.style.height=e.scrollHeight+"px",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom):(e.style.height="",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom),e.style.overflow="hidden"},e.prototype.afterEnter=function(e){de(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow},e.prototype.beforeLeave=function(e){e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.height=e.scrollHeight+"px",e.style.overflow="hidden"},e.prototype.leave=function(e){0!==e.scrollHeight&&(he(e,"collapse-transition"),e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0)},e.prototype.afterLeave=function(e){de(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom},e}(),ei={name:"ElCollapseTransition",functional:!0,render:function(e,t){var i=t.children;return e("transition",{on:new Qt},i)}},ti={inject:["rootMenu"],computed:{indexPath:function(){for(var e=[this.index],t=this.$parent;"ElMenu"!==t.$options.componentName;)t.index&&e.unshift(t.index),t=t.$parent;return e},parentMenu:function(){for(var e=this.$parent;e&&-1===["ElMenu","ElSubmenu"].indexOf(e.$options.componentName);)e=e.$parent;return e},paddingStyle:function(){if("vertical"!==this.rootMenu.mode)return{};var e=20,t=this.$parent;if(this.rootMenu.collapse)e=20;else for(;t&&"ElMenu"!==t.$options.componentName;)"ElSubmenu"===t.$options.componentName&&(e+=20),t=t.$parent;return{paddingLeft:e+"px"}}}},ii=r({name:"ElSubmenu",componentName:"ElSubmenu",mixins:[ti,l,{props:{transformOrigin:{type:[Boolean,String],default:!1},offset:Me.props.offset,boundariesPadding:Me.props.boundariesPadding,popperOptions:Me.props.popperOptions},data:Me.data,methods:Me.methods,beforeDestroy:Me.beforeDestroy,deactivated:Me.deactivated}],components:{ElCollapseTransition:ei},props:{index:{type:String,required:!0},showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300},popperClass:String,disabled:Boolean,popperAppendToBody:{type:Boolean,default:void 0}},data:function(){return{popperJS:null,timeout:null,items:{},submenus:{},mouseInChild:!1}},watch:{opened:function(e){var t=this;this.isMenuPopup&&this.$nextTick(function(e){t.updatePopper()})}},computed:{appendToBody:function(){return void 0===this.popperAppendToBody?this.isFirstLevel:this.popperAppendToBody},menuTransitionName:function(){return this.rootMenu.collapse?"el-zoom-in-left":"el-zoom-in-top"},opened:function(){return this.rootMenu.openedMenus.indexOf(this.index)>-1},active:function(){var e=!1,t=this.submenus,i=this.items;return Object.keys(i).forEach(function(t){i[t].active&&(e=!0)}),Object.keys(t).forEach(function(i){t[i].active&&(e=!0)}),e},hoverBackground:function(){return this.rootMenu.hoverBackground},backgroundColor:function(){return this.rootMenu.backgroundColor||""},activeTextColor:function(){return this.rootMenu.activeTextColor||""},textColor:function(){return this.rootMenu.textColor||""},mode:function(){return this.rootMenu.mode},isMenuPopup:function(){return this.rootMenu.isMenuPopup},titleStyle:function(){return"horizontal"!==this.mode?{color:this.textColor}:{borderBottomColor:this.active?this.rootMenu.activeTextColor?this.activeTextColor:"":"transparent",color:this.active?this.activeTextColor:this.textColor}},isFirstLevel:function(){for(var e=!0,t=this.$parent;t&&t!==this.rootMenu;){if(["ElSubmenu","ElMenuItemGroup"].indexOf(t.$options.componentName)>-1){e=!1;break}t=t.$parent}return e}},methods:{handleCollapseToggle:function(e){e?this.initPopper():this.doDestroy()},addItem:function(e){this.$set(this.items,e.index,e)},removeItem:function(e){delete this.items[e.index]},addSubmenu:function(e){this.$set(this.submenus,e.index,e)},removeSubmenu:function(e){delete this.submenus[e.index]},handleClick:function(){var e=this.rootMenu,t=this.disabled;"hover"===e.menuTrigger&&"horizontal"===e.mode||e.collapse&&"vertical"===e.mode||t||this.dispatch("ElMenu","submenu-click",this)},handleMouseenter:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.showTimeout;if("ActiveXObject"in window||"focus"!==e.type||e.relatedTarget){var n=this.rootMenu,r=this.disabled;"click"===n.menuTrigger&&"horizontal"===n.mode||!n.collapse&&"vertical"===n.mode||r||(this.dispatch("ElSubmenu","mouse-enter-child"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.rootMenu.openMenu(t.index,t.indexPath)},i))}},handleMouseleave:function(){var e=this,t=this.rootMenu;"click"===t.menuTrigger&&"horizontal"===t.mode||!t.collapse&&"vertical"===t.mode||(this.dispatch("ElSubmenu","mouse-leave-child"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.appendToBody&&(e.rootMenu.openedMenus=[]),!e.mouseInChild&&e.rootMenu.closeMenu(e.index)},this.hideTimeout))},handleTitleMouseenter:function(){if("horizontal"!==this.mode||this.rootMenu.backgroundColor){var e=this.$refs["submenu-title"];e&&(e.style.backgroundColor=this.rootMenu.hoverBackground)}},handleTitleMouseleave:function(){if("horizontal"!==this.mode||this.rootMenu.backgroundColor){var e=this.$refs["submenu-title"];e&&(e.style.backgroundColor=this.rootMenu.backgroundColor||"")}},updatePlacement:function(){this.currentPlacement="horizontal"===this.mode&&this.isFirstLevel?"bottom-start":"right-start"},initPopper:function(){this.referenceElm=this.$el,this.popperElm=this.$refs.menu,this.updatePlacement()}},created:function(){var e=this;this.$on("toggle-collapse",this.handleCollapseToggle),this.$on("mouse-enter-child",function(){e.mouseInChild=!0,clearTimeout(e.timeout)}),this.$on("mouse-leave-child",function(){e.mouseInChild=!1,clearTimeout(e.timeout)})},mounted:function(){this.parentMenu.addSubmenu(this),this.rootMenu.addSubmenu(this),this.initPopper()},beforeDestroy:function(){this.parentMenu.removeSubmenu(this),this.rootMenu.removeSubmenu(this)},render:function(e){var t=this,i=this.active,n=this.opened,r=this.paddingStyle,s=this.titleStyle,a=this.backgroundColor,o=this.rootMenu,l=this.currentPlacement,u=this.menuTransitionName,c=this.mode,h=this.disabled,d=this.popperClass,p=this.$slots,f=this.isFirstLevel,m=e("transition",{attrs:{name:u}},[e("div",{ref:"menu",directives:[{name:"show",value:n}],class:["el-menu--"+c,d],on:{mouseenter:function(e){return t.handleMouseenter(e,100)},mouseleave:this.handleMouseleave,focus:function(e){return t.handleMouseenter(e,100)}}},[e("ul",{attrs:{role:"menu"},class:["el-menu el-menu--popup","el-menu--popup-"+l],style:{backgroundColor:o.backgroundColor||""}},[p.default])])]),v=e("el-collapse-transition",[e("ul",{attrs:{role:"menu"},class:"el-menu el-menu--inline",directives:[{name:"show",value:n}],style:{backgroundColor:o.backgroundColor||""}},[p.default])]),g="horizontal"===o.mode&&f||"vertical"===o.mode&&!o.collapse?"el-icon-arrow-down":"el-icon-arrow-right";return e("li",{class:{"el-submenu":!0,"is-active":i,"is-opened":n,"is-disabled":h},attrs:{role:"menuitem","aria-haspopup":"true","aria-expanded":n},on:{mouseenter:this.handleMouseenter,mouseleave:this.handleMouseleave,focus:this.handleMouseenter}},[e("div",{class:"el-submenu__title",ref:"submenu-title",on:{click:this.handleClick,mouseenter:this.handleTitleMouseenter,mouseleave:this.handleTitleMouseleave},style:[r,s,{backgroundColor:a}]},[p.title,e("i",{class:["el-submenu__icon-arrow",g]})]),this.isMenuPopup?m:v])}},void 0,void 0,!1,null,null,null);ii.options.__file="packages/menu/src/submenu.vue";var ni=ii.exports;ni.install=function(e){e.component(ni.name,ni)};var ri=ni,si=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"el-menu-item",class:{"is-active":e.active,"is-disabled":e.disabled},style:[e.paddingStyle,e.itemStyle,{backgroundColor:e.backgroundColor}],attrs:{role:"menuitem",tabindex:"-1"},on:{click:e.handleClick,mouseenter:e.onMouseEnter,focus:e.onMouseEnter,blur:e.onMouseLeave,mouseleave:e.onMouseLeave}},["ElMenu"===e.parentMenu.$options.componentName&&e.rootMenu.collapse&&e.$slots.title?i("el-tooltip",{attrs:{effect:"dark",placement:"right"}},[i("div",{attrs:{slot:"content"},slot:"content"},[e._t("title")],2),i("div",{staticStyle:{position:"absolute",left:"0",top:"0",height:"100%",width:"100%",display:"inline-block","box-sizing":"border-box",padding:"0 20px"}},[e._t("default")],2)]):[e._t("default"),e._t("title")]],2)};si._withStripped=!0;var ai={name:"ElTooltip",mixins:[Me],props:{openDelay:{type:Number,default:0},disabled:Boolean,manual:Boolean,effect:{type:String,default:"dark"},arrowOffset:{type:Number,default:0},popperClass:String,content:String,visibleArrow:{default:!0},transition:{type:String,default:"el-fade-in-linear"},popperOptions:{default:function(){return{boundariesPadding:10,gpuAcceleration:!1}}},enterable:{type:Boolean,default:!0},hideAfter:{type:Number,default:0},tabindex:{type:Number,default:0}},data:function(){return{tooltipId:"el-tooltip-"+D(),timeoutPending:null,focusing:!1}},beforeCreate:function(){var e=this;this.$isServer||(this.popperVM=new h.a({data:{node:""},render:function(e){return this.node}}).$mount(),this.debounceClose=Je()(200,function(){return e.handleClosePopper()}))},render:function(e){var t=this;this.popperVM&&(this.popperVM.node=e("transition",{attrs:{name:this.transition},on:{afterLeave:this.doDestroy}},[e("div",{on:{mouseleave:function(){t.setExpectedState(!1),t.debounceClose()},mouseenter:function(){t.setExpectedState(!0)}},ref:"popper",attrs:{role:"tooltip",id:this.tooltipId,"aria-hidden":this.disabled||!this.showPopper?"true":"false"},directives:[{name:"show",value:!this.disabled&&this.showPopper}],class:["el-tooltip__popper","is-"+this.effect,this.popperClass]},[this.$slots.content||this.content])]));var i=this.getFirstElement();if(!i)return null;var n=i.data=i.data||{};return n.staticClass=this.addTooltipClass(n.staticClass),i},mounted:function(){var e=this;this.referenceElm=this.$el,1===this.$el.nodeType&&(this.$el.setAttribute("aria-describedby",this.tooltipId),this.$el.setAttribute("tabindex",this.tabindex),le(this.referenceElm,"mouseenter",this.show),le(this.referenceElm,"mouseleave",this.hide),le(this.referenceElm,"focus",function(){if(e.$slots.default&&e.$slots.default.length){var t=e.$slots.default[0].componentInstance;t&&t.focus?t.focus():e.handleFocus()}else e.handleFocus()}),le(this.referenceElm,"blur",this.handleBlur),le(this.referenceElm,"click",this.removeFocusing)),this.value&&this.popperVM&&this.popperVM.$nextTick(function(){e.value&&e.updatePopper()})},watch:{focusing:function(e){e?he(this.referenceElm,"focusing"):de(this.referenceElm,"focusing")}},methods:{show:function(){this.setExpectedState(!0),this.handleShowPopper()},hide:function(){this.setExpectedState(!1),this.debounceClose()},handleFocus:function(){this.focusing=!0,this.show()},handleBlur:function(){this.focusing=!1,this.hide()},removeFocusing:function(){this.focusing=!1},addTooltipClass:function(e){return e?"el-tooltip "+e.replace("el-tooltip",""):"el-tooltip"},handleShowPopper:function(){var e=this;this.expectedState&&!this.manual&&(clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.showPopper=!0},this.openDelay),this.hideAfter>0&&(this.timeoutPending=setTimeout(function(){e.showPopper=!1},this.hideAfter)))},handleClosePopper:function(){this.enterable&&this.expectedState||this.manual||(clearTimeout(this.timeout),this.timeoutPending&&clearTimeout(this.timeoutPending),this.showPopper=!1,this.disabled&&this.doDestroy())},setExpectedState:function(e){!1===e&&clearTimeout(this.timeoutPending),this.expectedState=e},getFirstElement:function(){var e=this.$slots.default;if(!Array.isArray(e))return null;for(var t=null,i=0;i<e.length;i++)e[i]&&e[i].tag&&(t=e[i]);return t}},beforeDestroy:function(){this.popperVM&&this.popperVM.$destroy()},destroyed:function(){var e=this.referenceElm;1===e.nodeType&&(ue(e,"mouseenter",this.show),ue(e,"mouseleave",this.hide),ue(e,"focus",this.handleFocus),ue(e,"blur",this.handleBlur),ue(e,"click",this.removeFocusing))},install:function(e){e.component(ai.name,ai)}},oi=ai,li=r({name:"ElMenuItem",componentName:"ElMenuItem",mixins:[ti,l],components:{ElTooltip:oi},props:{index:{default:null,validator:function(e){return"string"==typeof e||null===e}},route:[String,Object],disabled:Boolean},computed:{active:function(){return this.index===this.rootMenu.activeIndex},hoverBackground:function(){return this.rootMenu.hoverBackground},backgroundColor:function(){return this.rootMenu.backgroundColor||""},activeTextColor:function(){return this.rootMenu.activeTextColor||""},textColor:function(){return this.rootMenu.textColor||""},mode:function(){return this.rootMenu.mode},itemStyle:function(){var e={color:this.active?this.activeTextColor:this.textColor};return"horizontal"!==this.mode||this.isNested||(e.borderBottomColor=this.active?this.rootMenu.activeTextColor?this.activeTextColor:"":"transparent"),e},isNested:function(){return this.parentMenu!==this.rootMenu}},methods:{onMouseEnter:function(){("horizontal"!==this.mode||this.rootMenu.backgroundColor)&&(this.$el.style.backgroundColor=this.hoverBackground)},onMouseLeave:function(){("horizontal"!==this.mode||this.rootMenu.backgroundColor)&&(this.$el.style.backgroundColor=this.backgroundColor)},handleClick:function(){this.disabled||(this.dispatch("ElMenu","item-click",this),this.$emit("click",this))}},mounted:function(){this.parentMenu.addItem(this),this.rootMenu.addItem(this)},beforeDestroy:function(){this.parentMenu.removeItem(this),this.rootMenu.removeItem(this)}},si,[],!1,null,null,null);li.options.__file="packages/menu/src/menu-item.vue";var ui=li.exports;ui.install=function(e){e.component(ui.name,ui)};var ci=ui,hi=function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"el-menu-item-group"},[t("div",{staticClass:"el-menu-item-group__title",style:{paddingLeft:this.levelPadding+"px"}},[this.$slots.title?this._t("title"):[this._v(this._s(this.title))]],2),t("ul",[this._t("default")],2)])};hi._withStripped=!0;var di=r({name:"ElMenuItemGroup",componentName:"ElMenuItemGroup",inject:["rootMenu"],props:{title:{type:String}},data:function(){return{paddingLeft:20}},computed:{levelPadding:function(){var e=20,t=this.$parent;if(this.rootMenu.collapse)return 20;for(;t&&"ElMenu"!==t.$options.componentName;)"ElSubmenu"===t.$options.componentName&&(e+=20),t=t.$parent;return e}}},hi,[],!1,null,null,null);di.options.__file="packages/menu/src/menu-item-group.vue";var pi=di.exports;pi.install=function(e){e.component(pi.name,pi)};var fi=pi,mi=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:["el-input-number",e.inputNumberSize?"el-input-number--"+e.inputNumberSize:"",{"is-disabled":e.inputNumberDisabled},{"is-without-controls":!e.controls},{"is-controls-right":e.controlsAtRight}],on:{dragstart:function(e){e.preventDefault()}}},[e.controls?i("span",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.decrease,expression:"decrease"}],staticClass:"el-input-number__decrease",class:{"is-disabled":e.minDisabled},attrs:{role:"button"},on:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.decrease(t):null}}},[i("i",{class:"el-icon-"+(e.controlsAtRight?"arrow-down":"minus")})]):e._e(),e.controls?i("span",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.increase,expression:"increase"}],staticClass:"el-input-number__increase",class:{"is-disabled":e.maxDisabled},attrs:{role:"button"},on:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.increase(t):null}}},[i("i",{class:"el-icon-"+(e.controlsAtRight?"arrow-up":"plus")})]):e._e(),i("el-input",{ref:"input",attrs:{value:e.displayValue,placeholder:e.placeholder,disabled:e.inputNumberDisabled,size:e.inputNumberSize,max:e.max,min:e.min,name:e.name,label:e.label},on:{blur:e.handleBlur,focus:e.handleFocus,input:e.handleInput,change:e.handleInputChange},nativeOn:{keydown:[function(t){return"button"in t||!e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?(t.preventDefault(),e.increase(t)):null},function(t){return"button"in t||!e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?(t.preventDefault(),e.decrease(t)):null}]}})],1)};mi._withStripped=!0;var vi={bind:function(e,t,i){var n=null,r=void 0,s=function(){return i.context[t.expression].apply()},a=function(){Date.now()-r<100&&s(),clearInterval(n),n=null};le(e,"mousedown",function(e){var t,i,o;0===e.button&&(r=Date.now(),t=document,o=a,le(t,i="mouseup",function e(){o&&o.apply(this,arguments),ue(t,i,e)}),clearInterval(n),n=setInterval(s,100))})}},gi=r({name:"ElInputNumber",mixins:[u("input")],inject:{elForm:{default:""},elFormItem:{default:""}},directives:{repeatClick:vi},components:{ElInput:ee},props:{step:{type:Number,default:1},stepStrictly:{type:Boolean,default:!1},max:{type:Number,default:1/0},min:{type:Number,default:-1/0},value:{},disabled:Boolean,size:String,controls:{type:Boolean,default:!0},controlsPosition:{type:String,default:""},name:String,label:String,placeholder:String,precision:{type:Number,validator:function(e){return e>=0&&e===parseInt(e,10)}}},data:function(){return{currentValue:0,userInput:null}},watch:{value:{immediate:!0,handler:function(e){var t=void 0===e?e:Number(e);if(void 0!==t){if(isNaN(t))return;if(this.stepStrictly){var i=this.getPrecision(this.step),n=Math.pow(10,i);t=Math.round(t/this.step)*n*this.step/n}void 0!==this.precision&&(t=this.toPrecision(t,this.precision))}t>=this.max&&(t=this.max),t<=this.min&&(t=this.min),this.currentValue=t,this.userInput=null,this.$emit("input",t)}}},computed:{minDisabled:function(){return this._decrease(this.value,this.step)<this.min},maxDisabled:function(){return this._increase(this.value,this.step)>this.max},numPrecision:function(){var e=this.value,t=this.step,i=this.getPrecision,n=this.precision,r=i(t);return void 0!==n?(r>n&&console.warn("[Element Warn][InputNumber]precision should not be less than the decimal places of step"),n):Math.max(i(e),r)},controlsAtRight:function(){return this.controls&&"right"===this.controlsPosition},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},inputNumberSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},inputNumberDisabled:function(){return this.disabled||(this.elForm||{}).disabled},displayValue:function(){if(null!==this.userInput)return this.userInput;var e=this.currentValue;if("number"==typeof e){if(this.stepStrictly){var t=this.getPrecision(this.step),i=Math.pow(10,t);e=Math.round(e/this.step)*i*this.step/i}void 0!==this.precision&&(e=e.toFixed(this.precision))}return e}},methods:{toPrecision:function(e,t){return void 0===t&&(t=this.numPrecision),parseFloat(Math.round(e*Math.pow(10,t))/Math.pow(10,t))},getPrecision:function(e){if(void 0===e)return 0;var t=e.toString(),i=t.indexOf("."),n=0;return-1!==i&&(n=t.length-i-1),n},_increase:function(e,t){if("number"!=typeof e&&void 0!==e)return this.currentValue;var i=Math.pow(10,this.numPrecision);return this.toPrecision((i*e+i*t)/i)},_decrease:function(e,t){if("number"!=typeof e&&void 0!==e)return this.currentValue;var i=Math.pow(10,this.numPrecision);return this.toPrecision((i*e-i*t)/i)},increase:function(){if(!this.inputNumberDisabled&&!this.maxDisabled){var e=this.value||0,t=this._increase(e,this.step);this.setCurrentValue(t)}},decrease:function(){if(!this.inputNumberDisabled&&!this.minDisabled){var e=this.value||0,t=this._decrease(e,this.step);this.setCurrentValue(t)}},handleBlur:function(e){this.$emit("blur",e)},handleFocus:function(e){this.$emit("focus",e)},setCurrentValue:function(e){var t=this.currentValue;"number"==typeof e&&void 0!==this.precision&&(e=this.toPrecision(e,this.precision)),e>=this.max&&(e=this.max),e<=this.min&&(e=this.min),t!==e&&(this.userInput=null,this.$emit("input",e),this.$emit("change",e,t),this.currentValue=e)},handleInput:function(e){this.userInput=e},handleInputChange:function(e){var t=""===e?void 0:Number(e);isNaN(t)&&""!==e||this.setCurrentValue(t),this.userInput=null},select:function(){this.$refs.input.select()}},mounted:function(){var e=this.$refs.input.$refs.input;e.setAttribute("role","spinbutton"),e.setAttribute("aria-valuemax",this.max),e.setAttribute("aria-valuemin",this.min),e.setAttribute("aria-valuenow",this.currentValue),e.setAttribute("aria-disabled",this.inputNumberDisabled)},updated:function(){this.$refs&&this.$refs.input&&this.$refs.input.$refs.input.setAttribute("aria-valuenow",this.currentValue)}},mi,[],!1,null,null,null);gi.options.__file="packages/input-number/src/input-number.vue";var bi=gi.exports;bi.install=function(e){e.component(bi.name,bi)};var yi=bi,wi=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",{staticClass:"el-radio",class:[e.border&&e.radioSize?"el-radio--"+e.radioSize:"",{"is-disabled":e.isDisabled},{"is-focus":e.focus},{"is-bordered":e.border},{"is-checked":e.model===e.label}],attrs:{role:"radio","aria-checked":e.model===e.label,"aria-disabled":e.isDisabled,tabindex:e.tabIndex},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"]))return null;t.stopPropagation(),t.preventDefault(),e.model=e.isDisabled?e.model:e.label}}},[i("span",{staticClass:"el-radio__input",class:{"is-disabled":e.isDisabled,"is-checked":e.model===e.label}},[i("span",{staticClass:"el-radio__inner"}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],ref:"radio",staticClass:"el-radio__original",attrs:{type:"radio","aria-hidden":"true",name:e.name,disabled:e.isDisabled,tabindex:"-1"},domProps:{value:e.label,checked:e._q(e.model,e.label)},on:{focus:function(t){e.focus=!0},blur:function(t){e.focus=!1},change:[function(t){e.model=e.label},e.handleChange]}})]),i("span",{staticClass:"el-radio__label",on:{keydown:function(e){e.stopPropagation()}}},[e._t("default"),e.$slots.default?e._e():[e._v(e._s(e.label))]],2)])};wi._withStripped=!0;var xi=r({name:"ElRadio",mixins:[l],inject:{elForm:{default:""},elFormItem:{default:""}},componentName:"ElRadio",props:{value:{},label:{},disabled:Boolean,name:String,border:Boolean,size:String},data:function(){return{focus:!1}},computed:{isGroup:function(){for(var e=this.$parent;e;){if("ElRadioGroup"===e.$options.componentName)return this._radioGroup=e,!0;e=e.$parent}return!1},model:{get:function(){return this.isGroup?this._radioGroup.value:this.value},set:function(e){this.isGroup?this.dispatch("ElRadioGroup","input",[e]):this.$emit("input",e),this.$refs.radio&&(this.$refs.radio.checked=this.model===this.label)}},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},radioSize:function(){var e=this.size||this._elFormItemSize||(this.$ELEMENT||{}).size;return this.isGroup&&this._radioGroup.radioGroupSize||e},isDisabled:function(){return this.isGroup?this._radioGroup.disabled||this.disabled||(this.elForm||{}).disabled:this.disabled||(this.elForm||{}).disabled},tabIndex:function(){return this.isDisabled||this.isGroup&&this.model!==this.label?-1:0}},methods:{handleChange:function(){var e=this;this.$nextTick(function(){e.$emit("change",e.model),e.isGroup&&e.dispatch("ElRadioGroup","handleChange",e.model)})}}},wi,[],!1,null,null,null);xi.options.__file="packages/radio/src/radio.vue";var _i=xi.exports;_i.install=function(e){e.component(_i.name,_i)};var Ci=_i,ki=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-radio-group",attrs:{role:"radiogroup"},on:{keydown:this.handleKeydown}},[this._t("default")],2)};ki._withStripped=!0;var Si=Object.freeze({LEFT:37,UP:38,RIGHT:39,DOWN:40}),Di=r({name:"ElRadioGroup",componentName:"ElRadioGroup",inject:{elFormItem:{default:""}},mixins:[l],props:{value:{},size:String,fill:String,textColor:String,disabled:Boolean},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},radioGroupSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size}},created:function(){var e=this;this.$on("handleChange",function(t){e.$emit("change",t)})},mounted:function(){var e=this.$el.querySelectorAll("[type=radio]"),t=this.$el.querySelectorAll("[role=radio]")[0];![].some.call(e,function(e){return e.checked})&&t&&(t.tabIndex=0)},methods:{handleKeydown:function(e){var t=e.target,i="INPUT"===t.nodeName?"[type=radio]":"[role=radio]",n=this.$el.querySelectorAll(i),r=n.length,s=[].indexOf.call(n,t),a=this.$el.querySelectorAll("[role=radio]");switch(e.keyCode){case Si.LEFT:case Si.UP:e.stopPropagation(),e.preventDefault(),0===s?(a[r-1].click(),a[r-1].focus()):(a[s-1].click(),a[s-1].focus());break;case Si.RIGHT:case Si.DOWN:s===r-1?(e.stopPropagation(),e.preventDefault(),a[0].click(),a[0].focus()):(a[s+1].click(),a[s+1].focus())}}},watch:{value:function(e){this.dispatch("ElFormItem","el.form.change",[this.value])}}},ki,[],!1,null,null,null);Di.options.__file="packages/radio/src/radio-group.vue";var $i=Di.exports;$i.install=function(e){e.component($i.name,$i)};var Ei=$i,Ti=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",{staticClass:"el-radio-button",class:[e.size?"el-radio-button--"+e.size:"",{"is-active":e.value===e.label},{"is-disabled":e.isDisabled},{"is-focus":e.focus}],attrs:{role:"radio","aria-checked":e.value===e.label,"aria-disabled":e.isDisabled,tabindex:e.tabIndex},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"]))return null;t.stopPropagation(),t.preventDefault(),e.value=e.isDisabled?e.value:e.label}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"el-radio-button__orig-radio",attrs:{type:"radio",name:e.name,disabled:e.isDisabled,tabindex:"-1"},domProps:{value:e.label,checked:e._q(e.value,e.label)},on:{change:[function(t){e.value=e.label},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}),i("span",{staticClass:"el-radio-button__inner",style:e.value===e.label?e.activeStyle:null,on:{keydown:function(e){e.stopPropagation()}}},[e._t("default"),e.$slots.default?e._e():[e._v(e._s(e.label))]],2)])};Ti._withStripped=!0;var Mi=r({name:"ElRadioButton",mixins:[l],inject:{elForm:{default:""},elFormItem:{default:""}},props:{label:{},disabled:Boolean,name:String},data:function(){return{focus:!1}},computed:{value:{get:function(){return this._radioGroup.value},set:function(e){this._radioGroup.$emit("input",e)}},_radioGroup:function(){for(var e=this.$parent;e;){if("ElRadioGroup"===e.$options.componentName)return e;e=e.$parent}return!1},activeStyle:function(){return{backgroundColor:this._radioGroup.fill||"",borderColor:this._radioGroup.fill||"",boxShadow:this._radioGroup.fill?"-1px 0 0 0 "+this._radioGroup.fill:"",color:this._radioGroup.textColor||""}},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},size:function(){return this._radioGroup.radioGroupSize||this._elFormItemSize||(this.$ELEMENT||{}).size},isDisabled:function(){return this.disabled||this._radioGroup.disabled||(this.elForm||{}).disabled},tabIndex:function(){return this.isDisabled||this._radioGroup&&this.value!==this.label?-1:0}},methods:{handleChange:function(){var e=this;this.$nextTick(function(){e.dispatch("ElRadioGroup","handleChange",e.value)})}}},Ti,[],!1,null,null,null);Mi.options.__file="packages/radio/src/radio-button.vue";var Pi=Mi.exports;Pi.install=function(e){e.component(Pi.name,Pi)};var Ni=Pi,Oi=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",{staticClass:"el-checkbox",class:[e.border&&e.checkboxSize?"el-checkbox--"+e.checkboxSize:"",{"is-disabled":e.isDisabled},{"is-bordered":e.border},{"is-checked":e.isChecked}],attrs:{role:"checkbox","aria-checked":e.indeterminate?"mixed":e.isChecked,"aria-disabled":e.isDisabled,id:e.id}},[i("span",{staticClass:"el-checkbox__input",class:{"is-disabled":e.isDisabled,"is-checked":e.isChecked,"is-indeterminate":e.indeterminate,"is-focus":e.focus},attrs:{"aria-checked":"mixed"}},[i("span",{staticClass:"el-checkbox__inner"}),e.trueLabel||e.falseLabel?i("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"el-checkbox__original",attrs:{type:"checkbox","aria-hidden":"true",name:e.name,disabled:e.isDisabled,"true-value":e.trueLabel,"false-value":e.falseLabel},domProps:{checked:Array.isArray(e.model)?e._i(e.model,null)>-1:e._q(e.model,e.trueLabel)},on:{change:[function(t){var i=e.model,n=t.target,r=n.checked?e.trueLabel:e.falseLabel;if(Array.isArray(i)){var s=e._i(i,null);n.checked?s<0&&(e.model=i.concat([null])):s>-1&&(e.model=i.slice(0,s).concat(i.slice(s+1)))}else e.model=r},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}):i("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"el-checkbox__original",attrs:{type:"checkbox","aria-hidden":"true",disabled:e.isDisabled,name:e.name},domProps:{value:e.label,checked:Array.isArray(e.model)?e._i(e.model,e.label)>-1:e.model},on:{change:[function(t){var i=e.model,n=t.target,r=!!n.checked;if(Array.isArray(i)){var s=e.label,a=e._i(i,s);n.checked?a<0&&(e.model=i.concat([s])):a>-1&&(e.model=i.slice(0,a).concat(i.slice(a+1)))}else e.model=r},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}})]),e.$slots.default||e.label?i("span",{staticClass:"el-checkbox__label"},[e._t("default"),e.$slots.default?e._e():[e._v(e._s(e.label))]],2):e._e()])};Oi._withStripped=!0;var Ii=r({name:"ElCheckbox",mixins:[l],inject:{elForm:{default:""},elFormItem:{default:""}},componentName:"ElCheckbox",data:function(){return{selfModel:!1,focus:!1,isLimitExceeded:!1}},computed:{model:{get:function(){return this.isGroup?this.store:void 0!==this.value?this.value:this.selfModel},set:function(e){this.isGroup?(this.isLimitExceeded=!1,void 0!==this._checkboxGroup.min&&e.length<this._checkboxGroup.min&&(this.isLimitExceeded=!0),void 0!==this._checkboxGroup.max&&e.length>this._checkboxGroup.max&&(this.isLimitExceeded=!0),!1===this.isLimitExceeded&&this.dispatch("ElCheckboxGroup","input",[e])):(this.$emit("input",e),this.selfModel=e)}},isChecked:function(){return"[object Boolean]"==={}.toString.call(this.model)?this.model:Array.isArray(this.model)?this.model.indexOf(this.label)>-1:null!==this.model&&void 0!==this.model?this.model===this.trueLabel:void 0},isGroup:function(){for(var e=this.$parent;e;){if("ElCheckboxGroup"===e.$options.componentName)return this._checkboxGroup=e,!0;e=e.$parent}return!1},store:function(){return this._checkboxGroup?this._checkboxGroup.value:this.value},isLimitDisabled:function(){var e=this._checkboxGroup,t=e.max,i=e.min;return!(!t&&!i)&&this.model.length>=t&&!this.isChecked||this.model.length<=i&&this.isChecked},isDisabled:function(){return this.isGroup?this._checkboxGroup.disabled||this.disabled||(this.elForm||{}).disabled||this.isLimitDisabled:this.disabled||(this.elForm||{}).disabled},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},checkboxSize:function(){var e=this.size||this._elFormItemSize||(this.$ELEMENT||{}).size;return this.isGroup&&this._checkboxGroup.checkboxGroupSize||e}},props:{value:{},label:{},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:String,trueLabel:[String,Number],falseLabel:[String,Number],id:String,controls:String,border:Boolean,size:String},methods:{addToStore:function(){Array.isArray(this.model)&&-1===this.model.indexOf(this.label)?this.model.push(this.label):this.model=this.trueLabel||!0},handleChange:function(e){var t=this;if(!this.isLimitExceeded){var i=void 0;i=e.target.checked?void 0===this.trueLabel||this.trueLabel:void 0!==this.falseLabel&&this.falseLabel,this.$emit("change",i,e),this.$nextTick(function(){t.isGroup&&t.dispatch("ElCheckboxGroup","change",[t._checkboxGroup.value])})}}},created:function(){this.checked&&this.addToStore()},mounted:function(){this.indeterminate&&this.$el.setAttribute("aria-controls",this.controls)},watch:{value:function(e){this.dispatch("ElFormItem","el.form.change",e)}}},Oi,[],!1,null,null,null);Ii.options.__file="packages/checkbox/src/checkbox.vue";var Fi=Ii.exports;Fi.install=function(e){e.component(Fi.name,Fi)};var Ai=Fi,Li=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("label",{staticClass:"el-checkbox-button",class:[e.size?"el-checkbox-button--"+e.size:"",{"is-disabled":e.isDisabled},{"is-checked":e.isChecked},{"is-focus":e.focus}],attrs:{role:"checkbox","aria-checked":e.isChecked,"aria-disabled":e.isDisabled}},[e.trueLabel||e.falseLabel?i("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"el-checkbox-button__original",attrs:{type:"checkbox",name:e.name,disabled:e.isDisabled,"true-value":e.trueLabel,"false-value":e.falseLabel},domProps:{checked:Array.isArray(e.model)?e._i(e.model,null)>-1:e._q(e.model,e.trueLabel)},on:{change:[function(t){var i=e.model,n=t.target,r=n.checked?e.trueLabel:e.falseLabel;if(Array.isArray(i)){var s=e._i(i,null);n.checked?s<0&&(e.model=i.concat([null])):s>-1&&(e.model=i.slice(0,s).concat(i.slice(s+1)))}else e.model=r},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}):i("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"el-checkbox-button__original",attrs:{type:"checkbox",name:e.name,disabled:e.isDisabled},domProps:{value:e.label,checked:Array.isArray(e.model)?e._i(e.model,e.label)>-1:e.model},on:{change:[function(t){var i=e.model,n=t.target,r=!!n.checked;if(Array.isArray(i)){var s=e.label,a=e._i(i,s);n.checked?a<0&&(e.model=i.concat([s])):a>-1&&(e.model=i.slice(0,a).concat(i.slice(a+1)))}else e.model=r},e.handleChange],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}),e.$slots.default||e.label?i("span",{staticClass:"el-checkbox-button__inner",style:e.isChecked?e.activeStyle:null},[e._t("default",[e._v(e._s(e.label))])],2):e._e()])};Li._withStripped=!0;var Vi=r({name:"ElCheckboxButton",mixins:[l],inject:{elForm:{default:""},elFormItem:{default:""}},data:function(){return{selfModel:!1,focus:!1,isLimitExceeded:!1}},props:{value:{},label:{},disabled:Boolean,checked:Boolean,name:String,trueLabel:[String,Number],falseLabel:[String,Number]},computed:{model:{get:function(){return this._checkboxGroup?this.store:void 0!==this.value?this.value:this.selfModel},set:function(e){this._checkboxGroup?(this.isLimitExceeded=!1,void 0!==this._checkboxGroup.min&&e.length<this._checkboxGroup.min&&(this.isLimitExceeded=!0),void 0!==this._checkboxGroup.max&&e.length>this._checkboxGroup.max&&(this.isLimitExceeded=!0),!1===this.isLimitExceeded&&this.dispatch("ElCheckboxGroup","input",[e])):void 0!==this.value?this.$emit("input",e):this.selfModel=e}},isChecked:function(){return"[object Boolean]"==={}.toString.call(this.model)?this.model:Array.isArray(this.model)?this.model.indexOf(this.label)>-1:null!==this.model&&void 0!==this.model?this.model===this.trueLabel:void 0},_checkboxGroup:function(){for(var e=this.$parent;e;){if("ElCheckboxGroup"===e.$options.componentName)return e;e=e.$parent}return!1},store:function(){return this._checkboxGroup?this._checkboxGroup.value:this.value},activeStyle:function(){return{backgroundColor:this._checkboxGroup.fill||"",borderColor:this._checkboxGroup.fill||"",color:this._checkboxGroup.textColor||"","box-shadow":"-1px 0 0 0 "+this._checkboxGroup.fill}},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},size:function(){return this._checkboxGroup.checkboxGroupSize||this._elFormItemSize||(this.$ELEMENT||{}).size},isLimitDisabled:function(){var e=this._checkboxGroup,t=e.max,i=e.min;return!(!t&&!i)&&this.model.length>=t&&!this.isChecked||this.model.length<=i&&this.isChecked},isDisabled:function(){return this._checkboxGroup?this._checkboxGroup.disabled||this.disabled||(this.elForm||{}).disabled||this.isLimitDisabled:this.disabled||(this.elForm||{}).disabled}},methods:{addToStore:function(){Array.isArray(this.model)&&-1===this.model.indexOf(this.label)?this.model.push(this.label):this.model=this.trueLabel||!0},handleChange:function(e){var t=this;if(!this.isLimitExceeded){var i=void 0;i=e.target.checked?void 0===this.trueLabel||this.trueLabel:void 0!==this.falseLabel&&this.falseLabel,this.$emit("change",i,e),this.$nextTick(function(){t._checkboxGroup&&t.dispatch("ElCheckboxGroup","change",[t._checkboxGroup.value])})}}},created:function(){this.checked&&this.addToStore()}},Li,[],!1,null,null,null);Vi.options.__file="packages/checkbox/src/checkbox-button.vue";var Bi=Vi.exports;Bi.install=function(e){e.component(Bi.name,Bi)};var zi=Bi,Hi=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-checkbox-group",attrs:{role:"group","aria-label":"checkbox-group"}},[this._t("default")],2)};Hi._withStripped=!0;var Ri=r({name:"ElCheckboxGroup",componentName:"ElCheckboxGroup",mixins:[l],inject:{elFormItem:{default:""}},props:{value:{},disabled:Boolean,min:Number,max:Number,size:String,fill:String,textColor:String},computed:{_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},checkboxGroupSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size}},watch:{value:function(e){this.dispatch("ElFormItem","el.form.change",[e])}}},Hi,[],!1,null,null,null);Ri.options.__file="packages/checkbox/src/checkbox-group.vue";var Wi=Ri.exports;Wi.install=function(e){e.component(Wi.name,Wi)};var ji=Wi,qi=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-switch",class:{"is-disabled":e.switchDisabled,"is-checked":e.checked},attrs:{role:"switch","aria-checked":e.checked,"aria-disabled":e.switchDisabled},on:{click:function(t){return t.preventDefault(),e.switchValue(t)}}},[i("input",{ref:"input",staticClass:"el-switch__input",attrs:{type:"checkbox",id:e.id,name:e.name,"true-value":e.activeValue,"false-value":e.inactiveValue,disabled:e.switchDisabled},on:{change:e.handleChange,keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.switchValue(t):null}}}),e.inactiveIconClass||e.inactiveText?i("span",{class:["el-switch__label","el-switch__label--left",e.checked?"":"is-active"]},[e.inactiveIconClass?i("i",{class:[e.inactiveIconClass]}):e._e(),!e.inactiveIconClass&&e.inactiveText?i("span",{attrs:{"aria-hidden":e.checked}},[e._v(e._s(e.inactiveText))]):e._e()]):e._e(),i("span",{ref:"core",staticClass:"el-switch__core",style:{width:e.coreWidth+"px"}}),e.activeIconClass||e.activeText?i("span",{class:["el-switch__label","el-switch__label--right",e.checked?"is-active":""]},[e.activeIconClass?i("i",{class:[e.activeIconClass]}):e._e(),!e.activeIconClass&&e.activeText?i("span",{attrs:{"aria-hidden":!e.checked}},[e._v(e._s(e.activeText))]):e._e()]):e._e()])};qi._withStripped=!0;var Yi=r({name:"ElSwitch",mixins:[u("input"),Y,l],inject:{elForm:{default:""}},props:{value:{type:[Boolean,String,Number],default:!1},disabled:{type:Boolean,default:!1},width:{type:Number,default:40},activeIconClass:{type:String,default:""},inactiveIconClass:{type:String,default:""},activeText:String,inactiveText:String,activeColor:{type:String,default:""},inactiveColor:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},id:String},data:function(){return{coreWidth:this.width}},created:function(){~[this.activeValue,this.inactiveValue].indexOf(this.value)||this.$emit("input",this.inactiveValue)},computed:{checked:function(){return this.value===this.activeValue},switchDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},watch:{checked:function(){this.$refs.input.checked=this.checked,(this.activeColor||this.inactiveColor)&&this.setBackgroundColor(),this.validateEvent&&this.dispatch("ElFormItem","el.form.change",[this.value])}},methods:{handleChange:function(e){var t=this,i=this.checked?this.inactiveValue:this.activeValue;this.$emit("input",i),this.$emit("change",i),this.$nextTick(function(){t.$refs.input.checked=t.checked})},setBackgroundColor:function(){var e=this.checked?this.activeColor:this.inactiveColor;this.$refs.core.style.borderColor=e,this.$refs.core.style.backgroundColor=e},switchValue:function(){!this.switchDisabled&&this.handleChange()},getMigratingConfig:function(){return{props:{"on-color":"on-color is renamed to active-color.","off-color":"off-color is renamed to inactive-color.","on-text":"on-text is renamed to active-text.","off-text":"off-text is renamed to inactive-text.","on-value":"on-value is renamed to active-value.","off-value":"off-value is renamed to inactive-value.","on-icon-class":"on-icon-class is renamed to active-icon-class.","off-icon-class":"off-icon-class is renamed to inactive-icon-class."}}}},mounted:function(){this.coreWidth=this.width||40,(this.activeColor||this.inactiveColor)&&this.setBackgroundColor(),this.$refs.input.checked=this.checked}},qi,[],!1,null,null,null);Yi.options.__file="packages/switch/src/component.vue";var Ki=Yi.exports;Ki.install=function(e){e.component(Ki.name,Ki)};var Gi=Ki,Ui=function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"el-select-group__wrap"},[t("li",{staticClass:"el-select-group__title"},[this._v(this._s(this.label))]),t("li",[t("ul",{staticClass:"el-select-group"},[this._t("default")],2)])])};Ui._withStripped=!0;var Xi=r({mixins:[l],name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},data:function(){return{visible:!0}},watch:{disabled:function(e){this.broadcast("ElOption","handleGroupDisabled",e)}},methods:{queryChange:function(){this.visible=this.$children&&Array.isArray(this.$children)&&this.$children.some(function(e){return!0===e.visible})}},created:function(){this.$on("queryChange",this.queryChange)},mounted:function(){this.disabled&&this.broadcast("ElOption","handleGroupDisabled",this.disabled)}},Ui,[],!1,null,null,null);Xi.options.__file="packages/select/src/option-group.vue";var Ji=Xi.exports;Ji.install=function(e){e.component(Ji.name,Ji)};var Zi=Ji,Qi=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-table",class:[{"el-table--fit":e.fit,"el-table--striped":e.stripe,"el-table--border":e.border||e.isGroup,"el-table--hidden":e.isHidden,"el-table--group":e.isGroup,"el-table--fluid-height":e.maxHeight,"el-table--scrollable-x":e.layout.scrollX,"el-table--scrollable-y":e.layout.scrollY,"el-table--enable-row-hover":!e.store.states.isComplex,"el-table--enable-row-transition":0!==(e.store.states.data||[]).length&&(e.store.states.data||[]).length<100},e.tableSize?"el-table--"+e.tableSize:""],on:{mouseleave:function(t){e.handleMouseLeave(t)}}},[i("div",{ref:"hiddenColumns",staticClass:"hidden-columns"},[e._t("default")],2),e.showHeader?i("div",{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:e.handleHeaderFooterMousewheel,expression:"handleHeaderFooterMousewheel"}],ref:"headerWrapper",staticClass:"el-table__header-wrapper"},[i("table-header",{ref:"tableHeader",style:{width:e.layout.bodyWidth?e.layout.bodyWidth+"px":""},attrs:{store:e.store,border:e.border,"default-sort":e.defaultSort}})],1):e._e(),i("div",{ref:"bodyWrapper",staticClass:"el-table__body-wrapper",class:[e.layout.scrollX?"is-scrolling-"+e.scrollPosition:"is-scrolling-none"],style:[e.bodyHeight]},[i("table-body",{style:{width:e.bodyWidth},attrs:{context:e.context,store:e.store,stripe:e.stripe,"row-class-name":e.rowClassName,"row-style":e.rowStyle,highlight:e.highlightCurrentRow}}),e.data&&0!==e.data.length?e._e():i("div",{ref:"emptyBlock",staticClass:"el-table__empty-block",style:{width:e.bodyWidth}},[i("span",{staticClass:"el-table__empty-text"},[e._t("empty",[e._v(e._s(e.emptyText||e.t("el.table.emptyText")))])],2)]),e.$slots.append?i("div",{ref:"appendWrapper",staticClass:"el-table__append-wrapper"},[e._t("append")],2):e._e()],1),e.showSummary?i("div",{directives:[{name:"show",rawName:"v-show",value:e.data&&e.data.length>0,expression:"data && data.length > 0"},{name:"mousewheel",rawName:"v-mousewheel",value:e.handleHeaderFooterMousewheel,expression:"handleHeaderFooterMousewheel"}],ref:"footerWrapper",staticClass:"el-table__footer-wrapper"},[i("table-footer",{style:{width:e.layout.bodyWidth?e.layout.bodyWidth+"px":""},attrs:{store:e.store,border:e.border,"sum-text":e.sumText||e.t("el.table.sumText"),"summary-method":e.summaryMethod,"default-sort":e.defaultSort}})],1):e._e(),e.fixedColumns.length>0?i("div",{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:e.handleFixedMousewheel,expression:"handleFixedMousewheel"}],ref:"fixedWrapper",staticClass:"el-table__fixed",style:[{width:e.layout.fixedWidth?e.layout.fixedWidth+"px":""},e.fixedHeight]},[e.showHeader?i("div",{ref:"fixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[i("table-header",{ref:"fixedTableHeader",style:{width:e.bodyWidth},attrs:{fixed:"left",border:e.border,store:e.store}})],1):e._e(),i("div",{ref:"fixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:[{top:e.layout.headerHeight+"px"},e.fixedBodyHeight]},[i("table-body",{style:{width:e.bodyWidth},attrs:{fixed:"left",store:e.store,stripe:e.stripe,highlight:e.highlightCurrentRow,"row-class-name":e.rowClassName,"row-style":e.rowStyle}}),e.$slots.append?i("div",{staticClass:"el-table__append-gutter",style:{height:e.layout.appendHeight+"px"}}):e._e()],1),e.showSummary?i("div",{directives:[{name:"show",rawName:"v-show",value:e.data&&e.data.length>0,expression:"data && data.length > 0"}],ref:"fixedFooterWrapper",staticClass:"el-table__fixed-footer-wrapper"},[i("table-footer",{style:{width:e.bodyWidth},attrs:{fixed:"left",border:e.border,"sum-text":e.sumText||e.t("el.table.sumText"),"summary-method":e.summaryMethod,store:e.store}})],1):e._e()]):e._e(),e.rightFixedColumns.length>0?i("div",{directives:[{name:"mousewheel",rawName:"v-mousewheel",value:e.handleFixedMousewheel,expression:"handleFixedMousewheel"}],ref:"rightFixedWrapper",staticClass:"el-table__fixed-right",style:[{width:e.layout.rightFixedWidth?e.layout.rightFixedWidth+"px":"",right:e.layout.scrollY?(e.border?e.layout.gutterWidth:e.layout.gutterWidth||0)+"px":""},e.fixedHeight]},[e.showHeader?i("div",{ref:"rightFixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[i("table-header",{ref:"rightFixedTableHeader",style:{width:e.bodyWidth},attrs:{fixed:"right",border:e.border,store:e.store}})],1):e._e(),i("div",{ref:"rightFixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:[{top:e.layout.headerHeight+"px"},e.fixedBodyHeight]},[i("table-body",{style:{width:e.bodyWidth},attrs:{fixed:"right",store:e.store,stripe:e.stripe,"row-class-name":e.rowClassName,"row-style":e.rowStyle,highlight:e.highlightCurrentRow}}),e.$slots.append?i("div",{staticClass:"el-table__append-gutter",style:{height:e.layout.appendHeight+"px"}}):e._e()],1),e.showSummary?i("div",{directives:[{name:"show",rawName:"v-show",value:e.data&&e.data.length>0,expression:"data && data.length > 0"}],ref:"rightFixedFooterWrapper",staticClass:"el-table__fixed-footer-wrapper"},[i("table-footer",{style:{width:e.bodyWidth},attrs:{fixed:"right",border:e.border,"sum-text":e.sumText||e.t("el.table.sumText"),"summary-method":e.summaryMethod,store:e.store}})],1):e._e()]):e._e(),e.rightFixedColumns.length>0?i("div",{ref:"rightFixedPatch",staticClass:"el-table__fixed-right-patch",style:{width:e.layout.scrollY?e.layout.gutterWidth+"px":"0",height:e.layout.headerHeight+"px"}}):e._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:e.resizeProxyVisible,expression:"resizeProxyVisible"}],ref:"resizeProxy",staticClass:"el-table__column-resize-proxy"})])};Qi._withStripped=!0;var en=i(35),tn=i(48),nn=i.n(tn),rn="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>-1,sn={bind:function(e,t){var i,n;i=e,n=t.value,i&&i.addEventListener&&i.addEventListener(rn?"DOMMouseScroll":"mousewheel",function(e){var t=nn()(e);n&&n.apply(this,[e,t])})}},an="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},on=function(e){for(var t=e.target;t&&"HTML"!==t.tagName.toUpperCase();){if("TD"===t.tagName.toUpperCase())return t;t=t.parentNode}return null},ln=function(e){return null!==e&&"object"===(void 0===e?"undefined":an(e))},un=function(e,t,i,n,r){if(!t&&!n&&(!r||Array.isArray(r)&&!r.length))return e;i="string"==typeof i?"descending"===i?-1:1:i&&i<0?-1:1;var s=n?null:function(i,n){return r?(Array.isArray(r)||(r=[r]),r.map(function(t){return"string"==typeof t?k(i,t):t(i,n,e)})):("$key"!==t&&ln(i)&&"$value"in i&&(i=i.$value),[ln(i)?k(i,t):i])};return e.map(function(e,t){return{value:e,index:t,key:s?s(e,t):null}}).sort(function(e,t){var r=function(e,t){if(n)return n(e.value,t.value);for(var i=0,r=e.key.length;i<r;i++){if(e.key[i]<t.key[i])return-1;if(e.key[i]>t.key[i])return 1}return 0}(e,t);return r||(r=e.index-t.index),r*i}).map(function(e){return e.value})},cn=function(e,t){var i=null;return e.columns.forEach(function(e){e.id===t&&(i=e)}),i},hn=function(e,t){var i=(t.className||"").match(/el-table_[^\s]+/gm);return i?cn(e,i[0]):null},dn=function(e,t){if(!e)throw new Error("row is required when get row identity");if("string"==typeof t){if(t.indexOf(".")<0)return e[t];for(var i=t.split("."),n=e,r=0;r<i.length;r++)n=n[i[r]];return n}if("function"==typeof t)return t.call(null,e)},pn=function(e,t){var i={};return(e||[]).forEach(function(e,n){i[dn(e,t)]={row:e,index:n}}),i};function fn(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function mn(e){return void 0!==e&&(e=parseInt(e,10),isNaN(e)&&(e=null)),e}function vn(e){return"number"==typeof e?e:"string"==typeof e?/^\d+(?:px)?$/.test(e)?parseInt(e,10):e:null}function gn(e,t,i){var n=!1,r=e.indexOf(t),s=-1!==r,a=function(){e.push(t),n=!0},o=function(){e.splice(r,1),n=!0};return"boolean"==typeof i?i&&!s?a():!i&&s&&o():s?o():a(),n}function bn(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"children",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"hasChildren",r=function(e){return!(Array.isArray(e)&&e.length)};e.forEach(function(e){if(e[n])t(e,null,0);else{var s=e[i];r(s)||function e(s,a,o){t(s,a,o),a.forEach(function(s){if(s[n])t(s,null,o+1);else{var a=s[i];r(a)||e(s,a,o+1)}})}(e,s,0)}})}var yn={data:function(){return{states:{defaultExpandAll:!1,expandRows:[]}}},methods:{updateExpandRows:function(){var e=this.states,t=e.data,i=void 0===t?[]:t,n=e.rowKey,r=e.defaultExpandAll,s=e.expandRows;if(r)this.states.expandRows=i.slice();else if(n){var a=pn(s,n);this.states.expandRows=i.reduce(function(e,t){var i=dn(t,n);return a[i]&&e.push(t),e},[])}else this.states.expandRows=[]},toggleRowExpansion:function(e,t){gn(this.states.expandRows,e,t)&&(this.table.$emit("expand-change",e,this.states.expandRows.slice()),this.scheduleLayout())},setExpandRowKeys:function(e){this.assertRowKey();var t=this.states,i=t.data,n=t.rowKey,r=pn(i,n);this.states.expandRows=e.reduce(function(e,t){var i=r[t];return i&&e.push(i.row),e},[])},isRowExpanded:function(e){var t=this.states,i=t.expandRows,n=void 0===i?[]:i,r=t.rowKey;return r?!!pn(n,r)[dn(e,r)]:-1!==n.indexOf(e)}}},wn={data:function(){return{states:{_currentRowKey:null,currentRow:null}}},methods:{setCurrentRowKey:function(e){this.assertRowKey(),this.states._currentRowKey=e,this.setCurrentRowByKey(e)},restoreCurrentRowKey:function(){this.states._currentRowKey=null},setCurrentRowByKey:function(e){var t=this.states,i=t.data,n=void 0===i?[]:i,r=t.rowKey,s=null;r&&(s=T(n,function(t){return dn(t,r)===e})),t.currentRow=s},updateCurrentRow:function(e){var t=this.states,i=this.table,n=t.rowKey,r=t._currentRowKey,s=t.data||[],a=t.currentRow;if(e)this.restoreCurrentRowKey(),t.currentRow=e,a!==e&&this.table.$emit("current-change",e,a);else if(-1===s.indexOf(a)&&a){if(this.restoreCurrentRowKey(),n){var o=dn(a,n);this.setCurrentRowByKey(o)}else t.currentRow=null;t.currentRow!==a&&i.$emit("current-change",null,a)}else r&&this.setCurrentRowByKey(r)}}},xn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},_n={data:function(){return{states:{expandRowKeys:[],treeData:{},indent:16,lazy:!1,lazyTreeNodeMap:{},lazyColumnIdentifier:"hasChildren",childrenColumnName:"children"}}},computed:{normalizedData:function(){if(!this.states.rowKey)return{};var e=this.states.data||[];return this.normalize(e)},normalizedLazyNode:function(){var e=this.states,t=e.rowKey,i=e.lazyTreeNodeMap,n=e.lazyColumnIdentifier,r=Object.keys(i),s={};return r.length?(r.forEach(function(e){if(i[e].length){var r={children:[]};i[e].forEach(function(e){var i=dn(e,t);r.children.push(i),e[n]&&!s[i]&&(s[i]={children:[]})}),s[e]=r}}),s):s}},watch:{normalizedData:"updateTreeData",expandRowKeys:"updateTreeData",normalizedLazyNode:"updateTreeData"},methods:{normalize:function(e){var t=this.states,i=t.childrenColumnName,n=t.lazyColumnIdentifier,r=t.rowKey,s=t.lazy,a={};return bn(e,function(e,t,i){var n=dn(e,r);Array.isArray(t)?a[n]={children:t.map(function(e){return dn(e,r)}),level:i}:s&&(a[n]={children:[],lazy:!0,level:i})},i,n),a},updateTreeData:function(){var e=this.normalizedData,t=this.normalizedLazyNode,i=Object.keys(e);if(i.length){var n=this.states,r=n.treeData,s=n.defaultExpandAll,a=n.expandRowKeys,o=n.lazy,l={},u=[],c=function(e,t){var i=s||a&&-1!==a.indexOf(t);return!!(e&&e.expanded||i)};i.forEach(function(t){var i=r[t],n=xn({},e[t]);if(n.expanded=c(i,t),n.lazy){var s=i||{},a=s.loaded,o=void 0!==a&&a,h=s.loading,d=void 0!==h&&h;n.loaded=!!o,n.loading=!!d,u.push(t)}l[t]=n});var h=Object.keys(t);o&&h.length&&u.length&&h.forEach(function(e){var i=r[e],n=t[e].children;if(-1!==u.indexOf(e)){if(0!==l[e].children.length)throw new Error("[ElTable]children must be an empty array.");l[e].children=n}else{var s=i||{},a=s.loaded,o=void 0!==a&&a,h=s.loading,d=void 0!==h&&h;l[e]={lazy:!0,loaded:!!o,loading:!!d,expanded:c(i,e),children:n,level:""}}}),this.states.treeData=l,this.updateTableScrollY()}},updateTreeExpandKeys:function(e){Object.keys(this.normalizedData).length&&(this.states.expandRowKeys=e,this.updateTreeData())},toggleTreeExpansion:function(e,t){this.assertRowKey();var i=this.states,n=i.rowKey,r=i.treeData,s=dn(e,n),a=s&&r[s],o=r[s].expanded;s&&a&&"expanded"in a&&(t=void 0===t?!a.expanded:t,r[s].expanded=t,o!==t&&this.table.$emit("expand-change",e,t),this.updateTableScrollY())},loadOrToggle:function(e){this.assertRowKey();var t=this.states,i=t.lazy,n=t.treeData,r=t.rowKey,s=dn(e,r),a=n[s];i&&a&&"loaded"in a&&!a.loaded?this.loadData(e,s,a):this.toggleTreeExpansion(e)},loadData:function(e,t,i){var n=this,r=this.table.load,s=this.states,a=s.lazyTreeNodeMap,o=s.treeData;r&&!o[t].loaded&&(o[t].loading=!0,r(e,i,function(i){if(!Array.isArray(i))throw new Error("[ElTable] data must be an array");o[t].loading=!1,o[t].loaded=!0,o[t].expanded=!0,i.length&&n.$set(a,t,i),n.table.$emit("expand-change",e,!0)}))}}},Cn=function e(t){var i=[];return t.forEach(function(t){t.children?i.push.apply(i,e(t.children)):i.push(t)}),i},kn=h.a.extend({data:function(){return{states:{rowKey:null,data:[],isComplex:!1,_columns:[],originColumns:[],columns:[],fixedColumns:[],rightFixedColumns:[],leafColumns:[],fixedLeafColumns:[],rightFixedLeafColumns:[],leafColumnsLength:0,fixedLeafColumnsLength:0,rightFixedLeafColumnsLength:0,isAllSelected:!1,selection:[],reserveSelection:!1,selectOnIndeterminate:!1,selectable:null,filters:{},filteredData:null,sortingColumn:null,sortProp:null,sortOrder:null,hoverRow:null}}},mixins:[yn,wn,_n],methods:{assertRowKey:function(){if(!this.states.rowKey)throw new Error("[ElTable] prop row-key is required")},updateColumns:function(){var e=this.states,t=e._columns||[];e.fixedColumns=t.filter(function(e){return!0===e.fixed||"left"===e.fixed}),e.rightFixedColumns=t.filter(function(e){return"right"===e.fixed}),e.fixedColumns.length>0&&t[0]&&"selection"===t[0].type&&!t[0].fixed&&(t[0].fixed=!0,e.fixedColumns.unshift(t[0]));var i=t.filter(function(e){return!e.fixed});e.originColumns=[].concat(e.fixedColumns).concat(i).concat(e.rightFixedColumns);var n=Cn(i),r=Cn(e.fixedColumns),s=Cn(e.rightFixedColumns);e.leafColumnsLength=n.length,e.fixedLeafColumnsLength=r.length,e.rightFixedLeafColumnsLength=s.length,e.columns=[].concat(r).concat(n).concat(s),e.isComplex=e.fixedColumns.length>0||e.rightFixedColumns.length>0},scheduleLayout:function(e){e&&this.updateColumns(),this.table.debouncedUpdateLayout()},isSelected:function(e){var t=this.states.selection;return(void 0===t?[]:t).indexOf(e)>-1},clearSelection:function(){var e=this.states;e.isAllSelected=!1,e.selection.length&&(e.selection=[],this.table.$emit("selection-change",[]))},cleanSelection:function(){var e=this.states,t=e.data,i=e.rowKey,n=e.selection,r=void 0;if(i){r=[];var s=pn(n,i),a=pn(t,i);for(var o in s)s.hasOwnProperty(o)&&!a[o]&&r.push(s[o].row)}else r=n.filter(function(e){return-1===t.indexOf(e)});if(r.length){var l=n.filter(function(e){return-1===r.indexOf(e)});e.selection=l,this.table.$emit("selection-change",l.slice())}},toggleRowSelection:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(gn(this.states.selection,e,t)){var n=(this.states.selection||[]).slice();i&&this.table.$emit("select",n,e),this.table.$emit("selection-change",n)}},toggleAllSelection:Je()(10,function(){var e=this.states,t=e.data,i=void 0===t?[]:t,n=e.selection,r=e.selectOnIndeterminate?!e.isAllSelected:!(e.isAllSelected||n.length);e.isAllSelected=r;var s=!1;i.forEach(function(t,i){e.selectable?e.selectable.call(null,t,i)&&gn(n,t,r)&&(s=!0):gn(n,t,r)&&(s=!0)}),s&&this.table.$emit("selection-change",n?n.slice():[]),this.table.$emit("select-all",n)}),updateSelectionByRowKey:function(){var e=this.states,t=e.selection,i=e.rowKey,n=e.data,r=pn(t,i);n.forEach(function(e){var n=dn(e,i),s=r[n];s&&(t[s.index]=e)})},updateAllSelected:function(){var e=this.states,t=e.selection,i=e.rowKey,n=e.selectable,r=e.data||[];if(0!==r.length){var s=void 0;i&&(s=pn(t,i));for(var a,o=!0,l=0,u=0,c=r.length;u<c;u++){var h=r[u],d=n&&n.call(null,h,u);if(a=h,s?s[dn(a,i)]:-1!==t.indexOf(a))l++;else if(!n||d){o=!1;break}}0===l&&(o=!1),e.isAllSelected=o}else e.isAllSelected=!1},updateFilters:function(e,t){Array.isArray(e)||(e=[e]);var i=this.states,n={};return e.forEach(function(e){i.filters[e.id]=t,n[e.columnKey||e.id]=t}),n},updateSort:function(e,t,i){this.states.sortingColumn&&this.states.sortingColumn!==e&&(this.states.sortingColumn.order=null),this.states.sortingColumn=e,this.states.sortProp=t,this.states.sortOrder=i},execFilter:function(){var e=this,t=this.states,i=t._data,n=t.filters,r=i;Object.keys(n).forEach(function(i){var n=t.filters[i];if(n&&0!==n.length){var s=cn(e.states,i);s&&s.filterMethod&&(r=r.filter(function(e){return n.some(function(t){return s.filterMethod.call(null,t,e,s)})}))}}),t.filteredData=r},execSort:function(){var e=this.states;e.data=function(e,t){var i=t.sortingColumn;return i&&"string"!=typeof i.sortable?un(e,t.sortProp,t.sortOrder,i.sortMethod,i.sortBy):e}(e.filteredData,e)},execQuery:function(e){e&&e.filter||this.execFilter(),this.execSort()},clearFilter:function(e){var t=this.states,i=this.table.$refs,n=i.tableHeader,r=i.fixedTableHeader,s=i.rightFixedTableHeader,a={};n&&(a=J(a,n.filterPanels)),r&&(a=J(a,r.filterPanels)),s&&(a=J(a,s.filterPanels));var o=Object.keys(a);if(o.length)if("string"==typeof e&&(e=[e]),Array.isArray(e)){var l=e.map(function(e){return function(e,t){for(var i=null,n=0;n<e.columns.length;n++){var r=e.columns[n];if(r.columnKey===t){i=r;break}}return i}(t,e)});o.forEach(function(e){l.find(function(t){return t.id===e})&&(a[e].filteredValue=[])}),this.commit("filterChange",{column:l,values:[],silent:!0,multi:!0})}else o.forEach(function(e){a[e].filteredValue=[]}),t.filters={},this.commit("filterChange",{column:{},values:[],silent:!0})},clearSort:function(){this.states.sortingColumn&&(this.updateSort(null,null,null),this.commit("changeSortCondition",{silent:!0}))},setExpandRowKeysAdapter:function(e){this.setExpandRowKeys(e),this.updateTreeExpandKeys(e)},toggleRowExpansionAdapter:function(e,t){this.states.columns.some(function(e){return"expand"===e.type})?this.toggleRowExpansion(e,t):this.toggleTreeExpansion(e,t)}}});kn.prototype.mutations={setData:function(e,t){var i=e._data!==t;e._data=t,this.execQuery(),this.updateCurrentRow(),this.updateExpandRows(),e.reserveSelection?(this.assertRowKey(),this.updateSelectionByRowKey()):i?this.clearSelection():this.cleanSelection(),this.updateAllSelected(),this.updateTableScrollY()},insertColumn:function(e,t,i,n){var r=e._columns;n&&((r=n.children)||(r=n.children=[])),void 0!==i?r.splice(i,0,t):r.push(t),"selection"===t.type&&(e.selectable=t.selectable,e.reserveSelection=t.reserveSelection),this.table.$ready&&(this.updateColumns(),this.scheduleLayout())},removeColumn:function(e,t,i){var n=e._columns;i&&((n=i.children)||(n=i.children=[])),n&&n.splice(n.indexOf(t),1),this.table.$ready&&(this.updateColumns(),this.scheduleLayout())},sort:function(e,t){var i=t.prop,n=t.order;if(i){var r=T(e.columns,function(e){return e.property===i});r&&(r.order=n,this.updateSort(r,i,n),this.commit("changeSortCondition"))}},changeSortCondition:function(e,t){var i=e.sortingColumn,n=e.sortProp,r=e.sortOrder;null===r&&(e.sortingColumn=null,e.sortProp=null);this.execQuery({filter:!0}),t&&t.silent||this.table.$emit("sort-change",{column:i,prop:n,order:r}),this.updateTableScrollY()},filterChange:function(e,t){var i=t.column,n=t.values,r=t.silent,s=this.updateFilters(i,n);this.execQuery(),r||this.table.$emit("filter-change",s),this.updateTableScrollY()},toggleAllSelection:function(){this.toggleAllSelection()},rowSelectedChanged:function(e,t){this.toggleRowSelection(t),this.updateAllSelected()},setHoverRow:function(e,t){e.hoverRow=t},setCurrentRow:function(e,t){this.updateCurrentRow(t)}},kn.prototype.commit=function(e){var t=this.mutations;if(!t[e])throw new Error("Action not found: "+e);for(var i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];t[e].apply(this,[this.states].concat(n))},kn.prototype.updateTableScrollY=function(){h.a.nextTick(this.table.updateScrollY)};var Sn=kn;function Dn(e){var t={};return Object.keys(e).forEach(function(i){var n=e[i],r=void 0;"string"==typeof n?r=function(){return this.store.states[n]}:"function"==typeof n?r=function(){return n.call(this,this.store.states)}:console.error("invalid value type"),r&&(t[i]=r)}),t}var $n=function(){function e(t){for(var i in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.observers=[],this.table=null,this.store=null,this.columns=null,this.fit=!0,this.showHeader=!0,this.height=null,this.scrollX=!1,this.scrollY=!1,this.bodyWidth=null,this.fixedWidth=null,this.rightFixedWidth=null,this.tableHeight=null,this.headerHeight=44,this.appendHeight=0,this.footerHeight=44,this.viewportHeight=null,this.bodyHeight=null,this.fixedBodyHeight=null,this.gutterWidth=ke(),t)t.hasOwnProperty(i)&&(this[i]=t[i]);if(!this.table)throw new Error("table is required for Table Layout");if(!this.store)throw new Error("store is required for Table Layout")}return e.prototype.updateScrollY=function(){if(null===this.height)return!1;var e=this.table.bodyWrapper;if(this.table.$el&&e){var t=e.querySelector(".el-table__body"),i=this.scrollY,n=t.offsetHeight>this.bodyHeight;return this.scrollY=n,i!==n}return!1},e.prototype.setHeight=function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"height";if(!h.a.prototype.$isServer){var n=this.table.$el;if(e=vn(e),this.height=e,!n&&(e||0===e))return h.a.nextTick(function(){return t.setHeight(e,i)});"number"==typeof e?(n.style[i]=e+"px",this.updateElsHeight()):"string"==typeof e&&(n.style[i]=e,this.updateElsHeight())}},e.prototype.setMaxHeight=function(e){this.setHeight(e,"max-height")},e.prototype.getFlattenColumns=function(){var e=[];return this.table.columns.forEach(function(t){t.isColumnGroup?e.push.apply(e,t.columns):e.push(t)}),e},e.prototype.updateElsHeight=function(){var e=this;if(!this.table.$ready)return h.a.nextTick(function(){return e.updateElsHeight()});var t=this.table.$refs,i=t.headerWrapper,n=t.appendWrapper,r=t.footerWrapper;if(this.appendHeight=n?n.offsetHeight:0,!this.showHeader||i){var s=this.headerHeight=this.showHeader?i.offsetHeight:0;if(this.showHeader&&i.offsetWidth>0&&(this.table.columns||[]).length>0&&s<2)return h.a.nextTick(function(){return e.updateElsHeight()});var a=this.tableHeight=this.table.$el.clientHeight,o=this.footerHeight=r?r.offsetHeight:0;null!==this.height&&(this.bodyHeight=a-s-o+(r?1:0)),this.fixedBodyHeight=this.scrollX?this.bodyHeight-this.gutterWidth:this.bodyHeight;var l=!this.table.data||0===this.table.data.length;this.viewportHeight=this.scrollX?a-(l?0:this.gutterWidth):a,this.updateScrollY(),this.notifyObservers("scrollable")}},e.prototype.updateColumnsWidth=function(){if(!h.a.prototype.$isServer){var e=this.fit,t=this.table.$el.clientWidth,i=0,n=this.getFlattenColumns(),r=n.filter(function(e){return"number"!=typeof e.width});if(n.forEach(function(e){"number"==typeof e.width&&e.realWidth&&(e.realWidth=null)}),r.length>0&&e){n.forEach(function(e){i+=e.width||e.minWidth||80});var s=this.scrollY?this.gutterWidth:0;if(i<=t-s){this.scrollX=!1;var a=t-s-i;if(1===r.length)r[0].realWidth=(r[0].minWidth||80)+a;else{var o=a/r.reduce(function(e,t){return e+(t.minWidth||80)},0),l=0;r.forEach(function(e,t){if(0!==t){var i=Math.floor((e.minWidth||80)*o);l+=i,e.realWidth=(e.minWidth||80)+i}}),r[0].realWidth=(r[0].minWidth||80)+a-l}}else this.scrollX=!0,r.forEach(function(e){e.realWidth=e.minWidth});this.bodyWidth=Math.max(i,t),this.table.resizeState.width=this.bodyWidth}else n.forEach(function(e){e.width||e.minWidth?e.realWidth=e.width||e.minWidth:e.realWidth=80,i+=e.realWidth}),this.scrollX=i>t,this.bodyWidth=i;var u=this.store.states.fixedColumns;if(u.length>0){var c=0;u.forEach(function(e){c+=e.realWidth||e.width}),this.fixedWidth=c}var d=this.store.states.rightFixedColumns;if(d.length>0){var p=0;d.forEach(function(e){p+=e.realWidth||e.width}),this.rightFixedWidth=p}this.notifyObservers("columns")}},e.prototype.addObserver=function(e){this.observers.push(e)},e.prototype.removeObserver=function(e){var t=this.observers.indexOf(e);-1!==t&&this.observers.splice(t,1)},e.prototype.notifyObservers=function(e){var t=this;this.observers.forEach(function(i){switch(e){case"columns":i.onColumnsChange(t);break;case"scrollable":i.onScrollableChange(t);break;default:throw new Error("Table Layout don't have event "+e+".")}})},e}(),En={created:function(){this.tableLayout.addObserver(this)},destroyed:function(){this.tableLayout.removeObserver(this)},computed:{tableLayout:function(){var e=this.layout;if(!e&&this.table&&(e=this.table.layout),!e)throw new Error("Can not find table layout.");return e}},mounted:function(){this.onColumnsChange(this.tableLayout),this.onScrollableChange(this.tableLayout)},updated:function(){this.__updated__||(this.onColumnsChange(this.tableLayout),this.onScrollableChange(this.tableLayout),this.__updated__=!0)},methods:{onColumnsChange:function(){var e=this.$el.querySelectorAll("colgroup > col");if(e.length){var t=this.tableLayout.getFlattenColumns(),i={};t.forEach(function(e){i[e.id]=e});for(var n=0,r=e.length;n<r;n++){var s=e[n],a=s.getAttribute("name"),o=i[a];o&&s.setAttribute("width",o.realWidth||o.width)}}},onScrollableChange:function(e){for(var t=this.$el.querySelectorAll("colgroup > col[name=gutter]"),i=0,n=t.length;i<n;i++){t[i].setAttribute("width",e.scrollY?e.gutterWidth:"0")}for(var r=this.$el.querySelectorAll("th.gutter"),s=0,a=r.length;s<a;s++){var o=r[s];o.style.width=e.scrollY?e.gutterWidth+"px":"0",o.style.display=e.scrollY?"":"none"}}}},Tn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Mn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Pn={name:"ElTableBody",mixins:[En],components:{ElCheckbox:Ai,ElTooltip:oi},props:{store:{required:!0},stripe:Boolean,context:{},rowClassName:[String,Function],rowStyle:[Object,Function],fixed:String,highlight:Boolean},render:function(e){var t=this,i=this.data||[];return e("table",{class:"el-table__body",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[e("colgroup",[this.columns.map(function(t){return e("col",{attrs:{name:t.id},key:t.id})})]),e("tbody",[i.reduce(function(e,i){return e.concat(t.wrappedRowRender(i,e.length))},[]),e("el-tooltip",{attrs:{effect:this.table.tooltipEffect,placement:"top",content:this.tooltipContent},ref:"tooltip"})])])},computed:Mn({table:function(){return this.$parent}},Dn({data:"data",columns:"columns",treeIndent:"indent",leftFixedLeafCount:"fixedLeafColumnsLength",rightFixedLeafCount:"rightFixedLeafColumnsLength",columnsCount:function(e){return e.columns.length},leftFixedCount:function(e){return e.fixedColumns.length},rightFixedCount:function(e){return e.rightFixedColumns.length},hasExpandColumn:function(e){return e.columns.some(function(e){return"expand"===e.type})}}),{firstDefaultColumnIndex:function(){return E(this.columns,function(e){return"default"===e.type})}}),watch:{"store.states.hoverRow":function(e,t){var i=this;if(this.store.states.isComplex&&!this.$isServer){var n=window.requestAnimationFrame;n||(n=function(e){return setTimeout(e,16)}),n(function(){var n=i.$el.querySelectorAll(".el-table__row"),r=n[t],s=n[e];r&&de(r,"hover-row"),s&&he(s,"hover-row")})}}},data:function(){return{tooltipContent:""}},created:function(){this.activateTooltip=Je()(50,function(e){return e.handleShowPopper()})},methods:{getKeyOfRow:function(e,t){var i=this.table.rowKey;return i?dn(e,i):t},isColumnHidden:function(e){return!0===this.fixed||"left"===this.fixed?e>=this.leftFixedLeafCount:"right"===this.fixed?e<this.columnsCount-this.rightFixedLeafCount:e<this.leftFixedLeafCount||e>=this.columnsCount-this.rightFixedLeafCount},getSpan:function(e,t,i,n){var r=1,s=1,a=this.table.spanMethod;if("function"==typeof a){var o=a({row:e,column:t,rowIndex:i,columnIndex:n});Array.isArray(o)?(r=o[0],s=o[1]):"object"===(void 0===o?"undefined":Tn(o))&&(r=o.rowspan,s=o.colspan)}return{rowspan:r,colspan:s}},getRowStyle:function(e,t){var i=this.table.rowStyle;return"function"==typeof i?i.call(null,{row:e,rowIndex:t}):i||null},getRowClass:function(e,t){var i=["el-table__row"];this.table.highlightCurrentRow&&e===this.store.states.currentRow&&i.push("current-row"),this.stripe&&t%2==1&&i.push("el-table__row--striped");var n=this.table.rowClassName;return"string"==typeof n?i.push(n):"function"==typeof n&&i.push(n.call(null,{row:e,rowIndex:t})),this.store.states.expandRows.indexOf(e)>-1&&i.push("expanded"),i},getCellStyle:function(e,t,i,n){var r=this.table.cellStyle;return"function"==typeof r?r.call(null,{rowIndex:e,columnIndex:t,row:i,column:n}):r},getCellClass:function(e,t,i,n){var r=[n.id,n.align,n.className];this.isColumnHidden(t)&&r.push("is-hidden");var s=this.table.cellClassName;return"string"==typeof s?r.push(s):"function"==typeof s&&r.push(s.call(null,{rowIndex:e,columnIndex:t,row:i,column:n})),r.join(" ")},getColspanRealWidth:function(e,t,i){return t<1?e[i].realWidth:e.map(function(e){return e.realWidth}).slice(i,i+t).reduce(function(e,t){return e+t},-1)},handleCellMouseEnter:function(e,t){var i=this.table,n=on(e);if(n){var r=hn(i,n),s=i.hoverState={cell:n,column:r,row:t};i.$emit("cell-mouse-enter",s.row,s.column,s.cell,e)}var a=e.target.querySelector(".cell");if(ce(a,"el-tooltip")&&a.childNodes.length){var o=document.createRange();if(o.setStart(a,0),o.setEnd(a,a.childNodes.length),(o.getBoundingClientRect().width+((parseInt(pe(a,"paddingLeft"),10)||0)+(parseInt(pe(a,"paddingRight"),10)||0))>a.offsetWidth||a.scrollWidth>a.offsetWidth)&&this.$refs.tooltip){var l=this.$refs.tooltip;this.tooltipContent=n.innerText||n.textContent,l.referenceElm=n,l.$refs.popper&&(l.$refs.popper.style.display="none"),l.doDestroy(),l.setExpectedState(!0),this.activateTooltip(l)}}},handleCellMouseLeave:function(e){var t=this.$refs.tooltip;if(t&&(t.setExpectedState(!1),t.handleClosePopper()),on(e)){var i=this.table.hoverState||{};this.table.$emit("cell-mouse-leave",i.row,i.column,i.cell,e)}},handleMouseEnter:Je()(30,function(e){this.store.commit("setHoverRow",e)}),handleMouseLeave:Je()(30,function(){this.store.commit("setHoverRow",null)}),handleContextMenu:function(e,t){this.handleEvent(e,t,"contextmenu")},handleDoubleClick:function(e,t){this.handleEvent(e,t,"dblclick")},handleClick:function(e,t){this.store.commit("setCurrentRow",t),this.handleEvent(e,t,"click")},handleEvent:function(e,t,i){var n=this.table,r=on(e),s=void 0;r&&(s=hn(n,r))&&n.$emit("cell-"+i,t,s,r,e),n.$emit("row-"+i,t,s,e)},rowRender:function(e,t,i){var n=this,r=this.$createElement,s=this.treeIndent,a=this.columns,o=this.firstDefaultColumnIndex,l=a.map(function(e,t){return n.isColumnHidden(t)}),u=this.getRowClass(e,t),c=!0;return i&&(u.push("el-table__row--level-"+i.level),c=i.display),r("tr",{directives:[{name:"show",value:c}],style:this.getRowStyle(e,t),class:u,key:this.getKeyOfRow(e,t),on:{dblclick:function(t){return n.handleDoubleClick(t,e)},click:function(t){return n.handleClick(t,e)},contextmenu:function(t){return n.handleContextMenu(t,e)},mouseenter:function(e){return n.handleMouseEnter(t)},mouseleave:this.handleMouseLeave}},[a.map(function(u,c){var h=n.getSpan(e,u,t,c),d=h.rowspan,p=h.colspan;if(!d||!p)return null;var f=Mn({},u);f.realWidth=n.getColspanRealWidth(a,p,c);var m={store:n.store,_self:n.context||n.table.$vnode.context,column:f,row:e,$index:t};return c===o&&i&&(m.treeNode={indent:i.level*s,level:i.level},"boolean"==typeof i.expanded&&(m.treeNode.expanded=i.expanded,"loading"in i&&(m.treeNode.loading=i.loading),"noLazyChildren"in i&&(m.treeNode.noLazyChildren=i.noLazyChildren))),r("td",{style:n.getCellStyle(t,c,e,u),class:n.getCellClass(t,c,e,u),attrs:{rowspan:d,colspan:p},on:{mouseenter:function(t){return n.handleCellMouseEnter(t,e)},mouseleave:n.handleCellMouseLeave}},[u.renderCell.call(n._renderProxy,n.$createElement,m,l[c])])})])},wrappedRowRender:function(e,t){var i=this,n=this.$createElement,r=this.store,s=r.isRowExpanded,a=r.assertRowKey,o=r.states,l=o.treeData,u=o.lazyTreeNodeMap,c=o.childrenColumnName,h=o.rowKey;if(this.hasExpandColumn&&s(e)){var d=this.table.renderExpanded,p=this.rowRender(e,t);return d?[[p,n("tr",{key:"expanded-row__"+p.key},[n("td",{attrs:{colspan:this.columnsCount},class:"el-table__expanded-cell"},[d(this.$createElement,{row:e,$index:t,store:this.store})])])]]:(console.error("[Element Error]renderExpanded is required."),p)}if(Object.keys(l).length){a();var f=dn(e,h),m=l[f],v=null;m&&(v={expanded:m.expanded,level:m.level,display:!0},"boolean"==typeof m.lazy&&("boolean"==typeof m.loaded&&m.loaded&&(v.noLazyChildren=!(m.children&&m.children.length)),v.loading=m.loading));var g=[this.rowRender(e,t,v)];if(m){var b=0;m.display=!0,function e(n,r){n&&n.length&&r&&n.forEach(function(n){var s={display:r.display&&r.expanded,level:r.level+1},a=dn(n,h);if(null==a)throw new Error("for nested data item, row-key is required.");if((m=Mn({},l[a]))&&(s.expanded=m.expanded,m.level=m.level||s.level,m.display=!(!m.expanded||!s.display),"boolean"==typeof m.lazy&&("boolean"==typeof m.loaded&&m.loaded&&(s.noLazyChildren=!(m.children&&m.children.length)),s.loading=m.loading)),b++,g.push(i.rowRender(n,t+b,s)),m){var o=u[a]||n[c];e(o,m)}})}(u[f]||e[c],m)}return g}return this.rowRender(e,t)}}},Nn=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"}},[e.multiple?i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleOutsideClick,expression:"handleOutsideClick"},{name:"show",rawName:"v-show",value:e.showPopper,expression:"showPopper"}],staticClass:"el-table-filter"},[i("div",{staticClass:"el-table-filter__content"},[i("el-scrollbar",{attrs:{"wrap-class":"el-table-filter__wrap"}},[i("el-checkbox-group",{staticClass:"el-table-filter__checkbox-group",model:{value:e.filteredValue,callback:function(t){e.filteredValue=t},expression:"filteredValue"}},e._l(e.filters,function(t){return i("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.text))])}),1)],1)],1),i("div",{staticClass:"el-table-filter__bottom"},[i("button",{class:{"is-disabled":0===e.filteredValue.length},attrs:{disabled:0===e.filteredValue.length},on:{click:e.handleConfirm}},[e._v(e._s(e.t("el.table.confirmFilter")))]),i("button",{on:{click:e.handleReset}},[e._v(e._s(e.t("el.table.resetFilter")))])])]):i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleOutsideClick,expression:"handleOutsideClick"},{name:"show",rawName:"v-show",value:e.showPopper,expression:"showPopper"}],staticClass:"el-table-filter"},[i("ul",{staticClass:"el-table-filter__list"},[i("li",{staticClass:"el-table-filter__list-item",class:{"is-active":void 0===e.filterValue||null===e.filterValue},on:{click:function(t){e.handleSelect(null)}}},[e._v(e._s(e.t("el.table.clearFilter")))]),e._l(e.filters,function(t){return i("li",{key:t.value,staticClass:"el-table-filter__list-item",class:{"is-active":e.isActive(t)},attrs:{label:t.value},on:{click:function(i){e.handleSelect(t.value)}}},[e._v(e._s(t.text))])})],2)])])};Nn._withStripped=!0;var On=[];!h.a.prototype.$isServer&&document.addEventListener("click",function(e){On.forEach(function(t){var i=e.target;t&&t.$el&&(i===t.$el||t.$el.contains(i)||t.handleOutsideClick&&t.handleOutsideClick(e))})});var In=function(e){e&&On.push(e)},Fn=function(e){-1!==On.indexOf(e)&&On.splice(e,1)},An=r({name:"ElTableFilterPanel",mixins:[Me,j],directives:{Clickoutside:nt},components:{ElCheckbox:Ai,ElCheckboxGroup:ji,ElScrollbar:Ue},props:{placement:{type:String,default:"bottom-end"}},methods:{isActive:function(e){return e.value===this.filterValue},handleOutsideClick:function(){var e=this;setTimeout(function(){e.showPopper=!1},16)},handleConfirm:function(){this.confirmFilter(this.filteredValue),this.handleOutsideClick()},handleReset:function(){this.filteredValue=[],this.confirmFilter(this.filteredValue),this.handleOutsideClick()},handleSelect:function(e){this.filterValue=e,null!=e?this.confirmFilter(this.filteredValue):this.confirmFilter([]),this.handleOutsideClick()},confirmFilter:function(e){this.table.store.commit("filterChange",{column:this.column,values:e}),this.table.store.updateAllSelected()}},data:function(){return{table:null,cell:null,column:null}},computed:{filters:function(){return this.column&&this.column.filters},filterValue:{get:function(){return(this.column.filteredValue||[])[0]},set:function(e){this.filteredValue&&(null!=e?this.filteredValue.splice(0,1,e):this.filteredValue.splice(0,1))}},filteredValue:{get:function(){return this.column&&this.column.filteredValue||[]},set:function(e){this.column&&(this.column.filteredValue=e)}},multiple:function(){return!this.column||this.column.filterMultiple}},mounted:function(){var e=this;this.popperElm=this.$el,this.referenceElm=this.cell,this.table.bodyWrapper.addEventListener("scroll",function(){e.updatePopper()}),this.$watch("showPopper",function(t){e.column&&(e.column.filterOpened=t),t?In(e):Fn(e)})},watch:{showPopper:function(e){!0===e&&parseInt(this.popperJS._popper.style.zIndex,10)<_e.zIndex&&(this.popperJS._popper.style.zIndex=_e.nextZIndex())}}},Nn,[],!1,null,null,null);An.options.__file="packages/table/src/filter-panel.vue";var Ln=An.exports,Vn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Bn=function(e){var t=1;e.forEach(function(e){e.level=1,function e(i,n){if(n&&(i.level=n.level+1,t<i.level&&(t=i.level)),i.children){var r=0;i.children.forEach(function(t){e(t,i),r+=t.colSpan}),i.colSpan=r}else i.colSpan=1}(e)});for(var i=[],n=0;n<t;n++)i.push([]);return function e(t){var i=[];return t.forEach(function(t){t.children?(i.push(t),i.push.apply(i,e(t.children))):i.push(t)}),i}(e).forEach(function(e){e.children?e.rowSpan=1:e.rowSpan=t-e.level+1,i[e.level-1].push(e)}),i},zn={name:"ElTableHeader",mixins:[En],render:function(e){var t=this,i=this.store.states.originColumns,n=Bn(i,this.columns),r=n.length>1;return r&&(this.$parent.isGroup=!0),e("table",{class:"el-table__header",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[e("colgroup",[this.columns.map(function(t){return e("col",{attrs:{name:t.id},key:t.id})}),this.hasGutter?e("col",{attrs:{name:"gutter"}}):""]),e("thead",{class:[{"is-group":r,"has-gutter":this.hasGutter}]},[this._l(n,function(i,n){return e("tr",{style:t.getHeaderRowStyle(n),class:t.getHeaderRowClass(n)},[i.map(function(r,s){return e("th",{attrs:{colspan:r.colSpan,rowspan:r.rowSpan},on:{mousemove:function(e){return t.handleMouseMove(e,r)},mouseout:t.handleMouseOut,mousedown:function(e){return t.handleMouseDown(e,r)},click:function(e){return t.handleHeaderClick(e,r)},contextmenu:function(e){return t.handleHeaderContextMenu(e,r)}},style:t.getHeaderCellStyle(n,s,i,r),class:t.getHeaderCellClass(n,s,i,r),key:r.id},[e("div",{class:["cell",r.filteredValue&&r.filteredValue.length>0?"highlight":"",r.labelClassName]},[r.renderHeader?r.renderHeader.call(t._renderProxy,e,{column:r,$index:s,store:t.store,_self:t.$parent.$vnode.context}):r.label,r.sortable?e("span",{class:"caret-wrapper",on:{click:function(e){return t.handleSortClick(e,r)}}},[e("i",{class:"sort-caret ascending",on:{click:function(e){return t.handleSortClick(e,r,"ascending")}}}),e("i",{class:"sort-caret descending",on:{click:function(e){return t.handleSortClick(e,r,"descending")}}})]):"",r.filterable?e("span",{class:"el-table__column-filter-trigger",on:{click:function(e){return t.handleFilterClick(e,r)}}},[e("i",{class:["el-icon-arrow-down",r.filterOpened?"el-icon-arrow-up":""]})]):""])])}),t.hasGutter?e("th",{class:"gutter"}):""])})])])},props:{fixed:String,store:{required:!0},border:Boolean,defaultSort:{type:Object,default:function(){return{prop:"",order:""}}}},components:{ElCheckbox:Ai},computed:Vn({table:function(){return this.$parent},hasGutter:function(){return!this.fixed&&this.tableLayout.gutterWidth}},Dn({columns:"columns",isAllSelected:"isAllSelected",leftFixedLeafCount:"fixedLeafColumnsLength",rightFixedLeafCount:"rightFixedLeafColumnsLength",columnsCount:function(e){return e.columns.length},leftFixedCount:function(e){return e.fixedColumns.length},rightFixedCount:function(e){return e.rightFixedColumns.length}})),created:function(){this.filterPanels={}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.defaultSort,i=t.prop,n=t.order;e.store.commit("sort",{prop:i,order:n,init:!0})})},beforeDestroy:function(){var e=this.filterPanels;for(var t in e)e.hasOwnProperty(t)&&e[t]&&e[t].$destroy(!0)},methods:{isCellHidden:function(e,t){for(var i=0,n=0;n<e;n++)i+=t[n].colSpan;var r=i+t[e].colSpan-1;return!0===this.fixed||"left"===this.fixed?r>=this.leftFixedLeafCount:"right"===this.fixed?i<this.columnsCount-this.rightFixedLeafCount:r<this.leftFixedLeafCount||i>=this.columnsCount-this.rightFixedLeafCount},getHeaderRowStyle:function(e){var t=this.table.headerRowStyle;return"function"==typeof t?t.call(null,{rowIndex:e}):t},getHeaderRowClass:function(e){var t=[],i=this.table.headerRowClassName;return"string"==typeof i?t.push(i):"function"==typeof i&&t.push(i.call(null,{rowIndex:e})),t.join(" ")},getHeaderCellStyle:function(e,t,i,n){var r=this.table.headerCellStyle;return"function"==typeof r?r.call(null,{rowIndex:e,columnIndex:t,row:i,column:n}):r},getHeaderCellClass:function(e,t,i,n){var r=[n.id,n.order,n.headerAlign,n.className,n.labelClassName];0===e&&this.isCellHidden(t,i)&&r.push("is-hidden"),n.children||r.push("is-leaf"),n.sortable&&r.push("is-sortable");var s=this.table.headerCellClassName;return"string"==typeof s?r.push(s):"function"==typeof s&&r.push(s.call(null,{rowIndex:e,columnIndex:t,row:i,column:n})),r.join(" ")},toggleAllSelection:function(e){e.stopPropagation(),this.store.commit("toggleAllSelection")},handleFilterClick:function(e,t){e.stopPropagation();var i=e.target,n="TH"===i.tagName?i:i.parentNode;n=n.querySelector(".el-table__column-filter-trigger")||n;var r=this.$parent,s=this.filterPanels[t.id];s&&t.filterOpened?s.showPopper=!1:(s||(s=new h.a(Ln),this.filterPanels[t.id]=s,t.filterPlacement&&(s.placement=t.filterPlacement),s.table=r,s.cell=n,s.column=t,!this.$isServer&&s.$mount(document.createElement("div"))),setTimeout(function(){s.showPopper=!0},16))},handleHeaderClick:function(e,t){!t.filters&&t.sortable?this.handleSortClick(e,t):t.filterable&&!t.sortable&&this.handleFilterClick(e,t),this.$parent.$emit("header-click",t,e)},handleHeaderContextMenu:function(e,t){this.$parent.$emit("header-contextmenu",t,e)},handleMouseDown:function(e,t){var i=this;if(!this.$isServer&&!(t.children&&t.children.length>0)&&this.draggingColumn&&this.border){this.dragging=!0,this.$parent.resizeProxyVisible=!0;var n=this.$parent,r=n.$el.getBoundingClientRect().left,s=this.$el.querySelector("th."+t.id),a=s.getBoundingClientRect(),o=a.left-r+30;he(s,"noclick"),this.dragState={startMouseLeft:e.clientX,startLeft:a.right-r,startColumnLeft:a.left-r,tableLeft:r};var l=n.$refs.resizeProxy;l.style.left=this.dragState.startLeft+"px",document.onselectstart=function(){return!1},document.ondragstart=function(){return!1};var u=function(e){var t=e.clientX-i.dragState.startMouseLeft,n=i.dragState.startLeft+t;l.style.left=Math.max(o,n)+"px"};document.addEventListener("mousemove",u),document.addEventListener("mouseup",function r(){if(i.dragging){var a=i.dragState,o=a.startColumnLeft,c=a.startLeft,h=parseInt(l.style.left,10)-o;t.width=t.realWidth=h,n.$emit("header-dragend",t.width,c-o,t,e),i.store.scheduleLayout(),document.body.style.cursor="",i.dragging=!1,i.draggingColumn=null,i.dragState={},n.resizeProxyVisible=!1}document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",r),document.onselectstart=null,document.ondragstart=null,setTimeout(function(){de(s,"noclick")},0)})}},handleMouseMove:function(e,t){if(!(t.children&&t.children.length>0)){for(var i=e.target;i&&"TH"!==i.tagName;)i=i.parentNode;if(t&&t.resizable&&!this.dragging&&this.border){var n=i.getBoundingClientRect(),r=document.body.style;n.width>12&&n.right-e.pageX<8?(r.cursor="col-resize",ce(i,"is-sortable")&&(i.style.cursor="col-resize"),this.draggingColumn=t):this.dragging||(r.cursor="",ce(i,"is-sortable")&&(i.style.cursor="pointer"),this.draggingColumn=null)}}},handleMouseOut:function(){this.$isServer||(document.body.style.cursor="")},toggleOrder:function(e){var t=e.order,i=e.sortOrders;if(""===t)return i[0];var n=i.indexOf(t||null);return i[n>i.length-2?0:n+1]},handleSortClick:function(e,t,i){e.stopPropagation();for(var n=t.order===i?null:i||this.toggleOrder(t),r=e.target;r&&"TH"!==r.tagName;)r=r.parentNode;if(r&&"TH"===r.tagName&&ce(r,"noclick"))de(r,"noclick");else if(t.sortable){var s=this.store.states,a=s.sortProp,o=void 0,l=s.sortingColumn;(l!==t||l===t&&null===l.order)&&(l&&(l.order=null),s.sortingColumn=t,a=t.property),o=t.order=n||null,s.sortProp=a,s.sortOrder=o,this.store.commit("changeSortCondition")}}},data:function(){return{draggingColumn:null,dragging:!1,dragState:{}}}},Hn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Rn={name:"ElTableFooter",mixins:[En],render:function(e){var t=this,i=[];return this.summaryMethod?i=this.summaryMethod({columns:this.columns,data:this.store.states.data}):this.columns.forEach(function(e,n){if(0!==n){var r=t.store.states.data.map(function(t){return Number(t[e.property])}),s=[],a=!0;r.forEach(function(e){if(!isNaN(e)){a=!1;var t=(""+e).split(".")[1];s.push(t?t.length:0)}});var o=Math.max.apply(null,s);i[n]=a?"":r.reduce(function(e,t){var i=Number(t);return isNaN(i)?e:parseFloat((e+t).toFixed(Math.min(o,20)))},0)}else i[n]=t.sumText}),e("table",{class:"el-table__footer",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[e("colgroup",[this.columns.map(function(t){return e("col",{attrs:{name:t.id},key:t.id})}),this.hasGutter?e("col",{attrs:{name:"gutter"}}):""]),e("tbody",{class:[{"has-gutter":this.hasGutter}]},[e("tr",[this.columns.map(function(n,r){return e("td",{key:r,attrs:{colspan:n.colSpan,rowspan:n.rowSpan},class:t.getRowClasses(n,r)},[e("div",{class:["cell",n.labelClassName]},[i[r]])])}),this.hasGutter?e("th",{class:"gutter"}):""])])])},props:{fixed:String,store:{required:!0},summaryMethod:Function,sumText:String,border:Boolean,defaultSort:{type:Object,default:function(){return{prop:"",order:""}}}},computed:Hn({table:function(){return this.$parent},hasGutter:function(){return!this.fixed&&this.tableLayout.gutterWidth}},Dn({columns:"columns",isAllSelected:"isAllSelected",leftFixedLeafCount:"fixedLeafColumnsLength",rightFixedLeafCount:"rightFixedLeafColumnsLength",columnsCount:function(e){return e.columns.length},leftFixedCount:function(e){return e.fixedColumns.length},rightFixedCount:function(e){return e.rightFixedColumns.length}})),methods:{isCellHidden:function(e,t,i){if(!0===this.fixed||"left"===this.fixed)return e>=this.leftFixedLeafCount;if("right"===this.fixed){for(var n=0,r=0;r<e;r++)n+=t[r].colSpan;return n<this.columnsCount-this.rightFixedLeafCount}return!(this.fixed||!i.fixed)||(e<this.leftFixedCount||e>=this.columnsCount-this.rightFixedCount)},getRowClasses:function(e,t){var i=[e.id,e.align,e.labelClassName];return e.className&&i.push(e.className),this.isCellHidden(t,this.columns,e)&&i.push("is-hidden"),e.children||i.push("is-leaf"),i}}},Wn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},jn=1,qn=r({name:"ElTable",mixins:[j,Y],directives:{Mousewheel:sn},props:{data:{type:Array,default:function(){return[]}},size:String,width:[String,Number],height:[String,Number],maxHeight:[String,Number],fit:{type:Boolean,default:!0},stripe:Boolean,border:Boolean,rowKey:[String,Function],context:{},showHeader:{type:Boolean,default:!0},showSummary:Boolean,sumText:String,summaryMethod:Function,rowClassName:[String,Function],rowStyle:[Object,Function],cellClassName:[String,Function],cellStyle:[Object,Function],headerRowClassName:[String,Function],headerRowStyle:[Object,Function],headerCellClassName:[String,Function],headerCellStyle:[Object,Function],highlightCurrentRow:Boolean,currentRowKey:[String,Number],emptyText:String,expandRowKeys:Array,defaultExpandAll:Boolean,defaultSort:Object,tooltipEffect:String,spanMethod:Function,selectOnIndeterminate:{type:Boolean,default:!0},indent:{type:Number,default:16},treeProps:{type:Object,default:function(){return{hasChildren:"hasChildren",children:"children"}}},lazy:Boolean,load:Function},components:{TableHeader:zn,TableFooter:Rn,TableBody:Pn,ElCheckbox:Ai},methods:{getMigratingConfig:function(){return{events:{expand:"expand is renamed to expand-change"}}},setCurrentRow:function(e){this.store.commit("setCurrentRow",e)},toggleRowSelection:function(e,t){this.store.toggleRowSelection(e,t,!1),this.store.updateAllSelected()},toggleRowExpansion:function(e,t){this.store.toggleRowExpansionAdapter(e,t)},clearSelection:function(){this.store.clearSelection()},clearFilter:function(e){this.store.clearFilter(e)},clearSort:function(){this.store.clearSort()},handleMouseLeave:function(){this.store.commit("setHoverRow",null),this.hoverState&&(this.hoverState=null)},updateScrollY:function(){this.layout.updateScrollY()&&this.layout.updateColumnsWidth()},handleFixedMousewheel:function(e,t){var i=this.bodyWrapper;if(Math.abs(t.spinY)>0){var n=i.scrollTop;t.pixelY<0&&0!==n&&e.preventDefault(),t.pixelY>0&&i.scrollHeight-i.clientHeight>n&&e.preventDefault(),i.scrollTop+=Math.ceil(t.pixelY/5)}else i.scrollLeft+=Math.ceil(t.pixelX/5)},handleHeaderFooterMousewheel:function(e,t){var i=t.pixelX,n=t.pixelY;Math.abs(i)>=Math.abs(n)&&(this.bodyWrapper.scrollLeft+=t.pixelX/5)},syncPostion:Object(en.throttle)(20,function(){var e=this.bodyWrapper,t=e.scrollLeft,i=e.scrollTop,n=e.offsetWidth,r=e.scrollWidth,s=this.$refs,a=s.headerWrapper,o=s.footerWrapper,l=s.fixedBodyWrapper,u=s.rightFixedBodyWrapper;a&&(a.scrollLeft=t),o&&(o.scrollLeft=t),l&&(l.scrollTop=i),u&&(u.scrollTop=i);var c=r-n-1;this.scrollPosition=t>=c?"right":0===t?"left":"middle"}),bindEvents:function(){this.bodyWrapper.addEventListener("scroll",this.syncPostion,{passive:!0}),this.fit&&We(this.$el,this.resizeListener)},unbindEvents:function(){this.bodyWrapper.removeEventListener("scroll",this.syncPostion,{passive:!0}),this.fit&&je(this.$el,this.resizeListener)},resizeListener:function(){if(this.$ready){var e=!1,t=this.$el,i=this.resizeState,n=i.width,r=i.height,s=t.offsetWidth;n!==s&&(e=!0);var a=t.offsetHeight;(this.height||this.shouldUpdateHeight)&&r!==a&&(e=!0),e&&(this.resizeState.width=s,this.resizeState.height=a,this.doLayout())}},doLayout:function(){this.shouldUpdateHeight&&this.layout.updateElsHeight(),this.layout.updateColumnsWidth()},sort:function(e,t){this.store.commit("sort",{prop:e,order:t})},toggleAllSelection:function(){this.store.commit("toggleAllSelection")}},computed:Wn({tableSize:function(){return this.size||(this.$ELEMENT||{}).size},bodyWrapper:function(){return this.$refs.bodyWrapper},shouldUpdateHeight:function(){return this.height||this.maxHeight||this.fixedColumns.length>0||this.rightFixedColumns.length>0},bodyWidth:function(){var e=this.layout,t=e.bodyWidth,i=e.scrollY,n=e.gutterWidth;return t?t-(i?n:0)+"px":""},bodyHeight:function(){var e=this.layout,t=e.headerHeight,i=void 0===t?0:t,n=e.bodyHeight,r=e.footerHeight,s=void 0===r?0:r;if(this.height)return{height:n?n+"px":""};if(this.maxHeight){var a=vn(this.maxHeight);if("number"==typeof a)return{"max-height":a-s-(this.showHeader?i:0)+"px"}}return{}},fixedBodyHeight:function(){if(this.height)return{height:this.layout.fixedBodyHeight?this.layout.fixedBodyHeight+"px":""};if(this.maxHeight){var e=vn(this.maxHeight);if("number"==typeof e)return e=this.layout.scrollX?e-this.layout.gutterWidth:e,this.showHeader&&(e-=this.layout.headerHeight),{"max-height":(e-=this.layout.footerHeight)+"px"}}return{}},fixedHeight:function(){return this.maxHeight?this.showSummary?{bottom:0}:{bottom:this.layout.scrollX&&this.data.length?this.layout.gutterWidth+"px":""}:this.showSummary?{height:this.layout.tableHeight?this.layout.tableHeight+"px":""}:{height:this.layout.viewportHeight?this.layout.viewportHeight+"px":""}}},Dn({selection:"selection",columns:"columns",tableData:"data",fixedColumns:"fixedColumns",rightFixedColumns:"rightFixedColumns"})),watch:{height:{immediate:!0,handler:function(e){this.layout.setHeight(e)}},maxHeight:{immediate:!0,handler:function(e){this.layout.setMaxHeight(e)}},currentRowKey:{immediate:!0,handler:function(e){this.rowKey&&this.store.setCurrentRowKey(e)}},data:{immediate:!0,handler:function(e){this.store.commit("setData",e)}},expandRowKeys:{immediate:!0,handler:function(e){e&&this.store.setExpandRowKeysAdapter(e)}}},created:function(){var e=this;this.tableId="el-table_"+jn++,this.debouncedUpdateLayout=Object(en.debounce)(50,function(){return e.doLayout()})},mounted:function(){var e=this;this.bindEvents(),this.store.updateColumns(),this.doLayout(),this.resizeState={width:this.$el.offsetWidth,height:this.$el.offsetHeight},this.store.states.columns.forEach(function(t){t.filteredValue&&t.filteredValue.length&&e.store.commit("filterChange",{column:t,values:t.filteredValue,silent:!0})}),this.$ready=!0},destroyed:function(){this.unbindEvents()},data:function(){var e=this.treeProps,t=e.hasChildren,i=void 0===t?"hasChildren":t,n=e.children,r=void 0===n?"children":n;return this.store=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)throw new Error("Table is required.");var i=new Sn;return i.table=e,Object.keys(t).forEach(function(e){i.states[e]=t[e]}),i}(this,{rowKey:this.rowKey,defaultExpandAll:this.defaultExpandAll,selectOnIndeterminate:this.selectOnIndeterminate,indent:this.indent,lazy:this.lazy,lazyColumnIdentifier:i,childrenColumnName:r}),{layout:new $n({store:this.store,table:this,fit:this.fit,showHeader:this.showHeader}),isHidden:!1,renderExpanded:null,resizeProxyVisible:!1,resizeState:{width:null,height:null},isGroup:!1,scrollPosition:"left"}}},Qi,[],!1,null,null,null);qn.options.__file="packages/table/src/table.vue";var Yn=qn.exports;Yn.install=function(e){e.component(Yn.name,Yn)};var Kn=Yn,Gn={default:{order:""},selection:{width:48,minWidth:48,realWidth:48,order:"",className:"el-table-column--selection"},expand:{width:48,minWidth:48,realWidth:48,order:""},index:{width:48,minWidth:48,realWidth:48,order:""}},Un={selection:{renderHeader:function(e,t){var i=t.store;return e("el-checkbox",{attrs:{disabled:i.states.data&&0===i.states.data.length,indeterminate:i.states.selection.length>0&&!this.isAllSelected,value:this.isAllSelected},nativeOn:{click:this.toggleAllSelection}})},renderCell:function(e,t){var i=t.row,n=t.column,r=t.store,s=t.$index;return e("el-checkbox",{nativeOn:{click:function(e){return e.stopPropagation()}},attrs:{value:r.isSelected(i),disabled:!!n.selectable&&!n.selectable.call(null,i,s)},on:{input:function(){r.commit("rowSelectedChanged",i)}}})},sortable:!1,resizable:!1},index:{renderHeader:function(e,t){return t.column.label||"#"},renderCell:function(e,t){var i=t.$index,n=i+1,r=t.column.index;return"number"==typeof r?n=i+r:"function"==typeof r&&(n=r(i)),e("div",[n])},sortable:!1},expand:{renderHeader:function(e,t){return t.column.label||""},renderCell:function(e,t){var i=t.row,n=t.store,r=["el-table__expand-icon"];n.states.expandRows.indexOf(i)>-1&&r.push("el-table__expand-icon--expanded");return e("div",{class:r,on:{click:function(e){e.stopPropagation(),n.toggleRowExpansion(i)}}},[e("i",{class:"el-icon el-icon-arrow-right"})])},sortable:!1,resizable:!1,className:"el-table__expand-column"}};function Xn(e,t){var i=t.row,n=t.column,r=t.$index,s=n.property,a=s&&S(i,s).v;return n&&n.formatter?n.formatter(i,n,a,r):a}var Jn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Zn=1,Qn={name:"ElTableColumn",props:{type:{type:String,default:"default"},label:String,className:String,labelClassName:String,property:String,prop:String,width:{},minWidth:{},renderHeader:Function,sortable:{type:[Boolean,String],default:!1},sortMethod:Function,sortBy:[String,Function,Array],resizable:{type:Boolean,default:!0},columnKey:String,align:String,headerAlign:String,showTooltipWhenOverflow:Boolean,showOverflowTooltip:Boolean,fixed:[Boolean,String],formatter:Function,selectable:Function,reserveSelection:Boolean,filterMethod:Function,filteredValue:Array,filters:Array,filterPlacement:String,filterMultiple:{type:Boolean,default:!0},index:[Number,Function],sortOrders:{type:Array,default:function(){return["ascending","descending",null]},validator:function(e){return e.every(function(e){return["ascending","descending",null].indexOf(e)>-1})}}},data:function(){return{isSubColumn:!1,columns:[]}},computed:{owner:function(){for(var e=this.$parent;e&&!e.tableId;)e=e.$parent;return e},columnOrTableParent:function(){for(var e=this.$parent;e&&!e.tableId&&!e.columnId;)e=e.$parent;return e},realWidth:function(){return mn(this.width)},realMinWidth:function(){return void 0!==(e=this.minWidth)&&(e=mn(e),isNaN(e)&&(e=80)),e;var e},realAlign:function(){return this.align?"is-"+this.align:null},realHeaderAlign:function(){return this.headerAlign?"is-"+this.headerAlign:this.realAlign}},methods:{getPropsData:function(){for(var e=this,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];return i.reduce(function(t,i){return Array.isArray(i)&&i.forEach(function(i){t[i]=e[i]}),t},{})},getColumnElIndex:function(e,t){return[].indexOf.call(e,t)},setColumnWidth:function(e){return this.realWidth&&(e.width=this.realWidth),this.realMinWidth&&(e.minWidth=this.realMinWidth),e.minWidth||(e.minWidth=80),e.realWidth=void 0===e.width?e.minWidth:e.width,e},setColumnForcedProps:function(e){var t=e.type,i=Un[t]||{};return Object.keys(i).forEach(function(t){var n=i[t];void 0!==n&&(e[t]="className"===t?e[t]+" "+n:n)}),e},setColumnRenders:function(e){var t=this,i=(this.$createElement,Object.keys(Un));this.renderHeader?console.warn("[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header."):-1===i.indexOf(e.type)&&(e.renderHeader=function(i,n){var r=t.$scopedSlots.header;return r?r(n):e.label});var n=e.renderCell;return"expand"===e.type?(e.renderCell=function(e,t){return e("div",{class:"cell"},[n(e,t)])},this.owner.renderExpanded=function(e,i){return t.$scopedSlots.default?t.$scopedSlots.default(i):t.$slots.default}):(n=n||Xn,e.renderCell=function(i,r){var s=null;s=t.$scopedSlots.default?t.$scopedSlots.default(r):n(i,r);var a=function(e,t){var i=t.row,n=t.treeNode,r=t.store;if(!n)return null;var s=[];if(n.indent&&s.push(e("span",{class:"el-table__indent",style:{"padding-left":n.indent+"px"}})),"boolean"!=typeof n.expanded||n.noLazyChildren)s.push(e("span",{class:"el-table__placeholder"}));else{var a=["el-table__expand-icon",n.expanded?"el-table__expand-icon--expanded":""],o=["el-icon-arrow-right"];n.loading&&(o=["el-icon-loading"]),s.push(e("div",{class:a,on:{click:function(e){e.stopPropagation(),r.loadOrToggle(i)}}},[e("i",{class:o})]))}return s}(i,r),o={class:"cell",style:{}};return e.showOverflowTooltip&&(o.class+=" el-tooltip",o.style={width:(r.column.realWidth||r.column.width)-1+"px"}),i("div",o,[a,s])}),e},registerNormalWatchers:function(){var e=this,t={prop:"property",realAlign:"align",realHeaderAlign:"headerAlign",realWidth:"width"},i=["label","property","filters","filterMultiple","sortable","index","formatter","className","labelClassName","showOverflowTooltip"].reduce(function(e,t){return e[t]=t,e},t);Object.keys(i).forEach(function(i){var n=t[i];e.$watch(i,function(t){e.columnConfig[n]=t})})},registerComplexWatchers:function(){var e=this,t={realWidth:"width",realMinWidth:"minWidth"},i=["fixed"].reduce(function(e,t){return e[t]=t,e},t);Object.keys(i).forEach(function(i){var n=t[i];e.$watch(i,function(t){e.columnConfig[n]=t;var i="fixed"===n;e.owner.store.scheduleLayout(i)})})}},components:{ElCheckbox:Ai},beforeCreate:function(){this.row={},this.column={},this.$index=0,this.columnId=""},created:function(){var e=this.columnOrTableParent;this.isSubColumn=this.owner!==e,this.columnId=(e.tableId||e.columnId)+"_column_"+Zn++;var t=this.type||"default",i=""===this.sortable||this.sortable,n=Jn({},Gn[t],{id:this.columnId,type:t,property:this.prop||this.property,align:this.realAlign,headerAlign:this.realHeaderAlign,showOverflowTooltip:this.showOverflowTooltip||this.showTooltipWhenOverflow,filterable:this.filters||this.filterMethod,filteredValue:[],filterPlacement:"",isColumnGroup:!1,filterOpened:!1,sortable:i,index:this.index}),r=this.getPropsData(["columnKey","label","className","labelClassName","type","renderHeader","formatter","fixed","resizable"],["sortMethod","sortBy","sortOrders"],["selectable","reserveSelection"],["filterMethod","filters","filterMultiple","filterOpened","filteredValue","filterPlacement"]);r=function(e,t){var i={},n=void 0;for(n in e)i[n]=e[n];for(n in t)if(fn(t,n)){var r=t[n];void 0!==r&&(i[n]=r)}return i}(n,r),r=function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}(this.setColumnRenders,this.setColumnWidth,this.setColumnForcedProps)(r),this.columnConfig=r,this.registerNormalWatchers(),this.registerComplexWatchers()},mounted:function(){var e=this.owner,t=this.columnOrTableParent,i=this.isSubColumn?t.$el.children:t.$refs.hiddenColumns.children,n=this.getColumnElIndex(i,this.$el);e.store.commit("insertColumn",this.columnConfig,n,this.isSubColumn?t.columnConfig:null)},destroyed:function(){if(this.$parent){var e=this.$parent;this.owner.store.commit("removeColumn",this.columnConfig,this.isSubColumn?e.columnConfig:null)}},render:function(e){return e("div",this.$slots.default)},install:function(e){e.component(Qn.name,Qn)}},er=Qn,tr=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.ranged?i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleClose,expression:"handleClose"}],ref:"reference",staticClass:"el-date-editor el-range-editor el-input__inner",class:["el-date-editor--"+e.type,e.pickerSize?"el-range-editor--"+e.pickerSize:"",e.pickerDisabled?"is-disabled":"",e.pickerVisible?"is-active":""],on:{click:e.handleRangeClick,mouseenter:e.handleMouseEnter,mouseleave:function(t){e.showClose=!1},keydown:e.handleKeydown}},[i("i",{class:["el-input__icon","el-range__icon",e.triggerClass]}),i("input",e._b({staticClass:"el-range-input",attrs:{autocomplete:"off",placeholder:e.startPlaceholder,disabled:e.pickerDisabled,readonly:!e.editable||e.readonly,name:e.name&&e.name[0]},domProps:{value:e.displayValue&&e.displayValue[0]},on:{input:e.handleStartInput,change:e.handleStartChange,focus:e.handleFocus}},"input",e.firstInputId,!1)),e._t("range-separator",[i("span",{staticClass:"el-range-separator"},[e._v(e._s(e.rangeSeparator))])]),i("input",e._b({staticClass:"el-range-input",attrs:{autocomplete:"off",placeholder:e.endPlaceholder,disabled:e.pickerDisabled,readonly:!e.editable||e.readonly,name:e.name&&e.name[1]},domProps:{value:e.displayValue&&e.displayValue[1]},on:{input:e.handleEndInput,change:e.handleEndChange,focus:e.handleFocus}},"input",e.secondInputId,!1)),e.haveTrigger?i("i",{staticClass:"el-input__icon el-range__close-icon",class:[e.showClose?""+e.clearIcon:""],on:{click:e.handleClickIcon}}):e._e()],2):i("el-input",e._b({directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleClose,expression:"handleClose"}],ref:"reference",staticClass:"el-date-editor",class:"el-date-editor--"+e.type,attrs:{readonly:!e.editable||e.readonly||"dates"===e.type||"week"===e.type,disabled:e.pickerDisabled,size:e.pickerSize,name:e.name,placeholder:e.placeholder,value:e.displayValue,validateEvent:!1},on:{focus:e.handleFocus,input:function(t){return e.userInput=t},change:e.handleChange},nativeOn:{keydown:function(t){return e.handleKeydown(t)},mouseenter:function(t){return e.handleMouseEnter(t)},mouseleave:function(t){e.showClose=!1}}},"el-input",e.firstInputId,!1),[i("i",{staticClass:"el-input__icon",class:e.triggerClass,attrs:{slot:"prefix"},on:{click:e.handleFocus},slot:"prefix"}),e.haveTrigger?i("i",{staticClass:"el-input__icon",class:[e.showClose?""+e.clearIcon:""],attrs:{slot:"suffix"},on:{click:e.handleClickIcon},slot:"suffix"}):e._e()])};tr._withStripped=!0;var ir=i(2),nr=i.n(ir),rr=["sun","mon","tue","wed","thu","fri","sat"],sr=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],ar=function(){return{dayNamesShort:rr.map(function(e){return R("el.datepicker.weeks."+e)}),dayNames:rr.map(function(e){return R("el.datepicker.weeks."+e)}),monthNamesShort:sr.map(function(e){return R("el.datepicker.months."+e)}),monthNames:sr.map(function(e,t){return R("el.datepicker.month"+(t+1))}),amPm:["am","pm"]}},or=function(e){return null!=e&&(!isNaN(new Date(e).getTime())&&!Array.isArray(e))},lr=function(e){return e instanceof Date},ur=function(e,t){return(e=function(e){return or(e)?new Date(e):null}(e))?nr.a.format(e,t||"yyyy-MM-dd",ar()):""},cr=function(e,t){return nr.a.parse(e,t||"yyyy-MM-dd",ar())},hr=function(e,t){return 3===t||5===t||8===t||10===t?30:1===t?e%4==0&&e%100!=0||e%400==0?29:28:31},dr=function(e){var t=new Date(e.getTime());return t.setDate(1),t.getDay()},pr=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return new Date(e.getFullYear(),e.getMonth(),e.getDate()-t)},fr=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t)},mr=function(e){if(!or(e))return null;var t=new Date(e.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var i=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-i.getTime())/864e5-3+(i.getDay()+6)%7)/7)};function vr(e,t,i,n){for(var r=t;r<i;r++)e[r]=n}var gr=function(e){return Array.apply(null,{length:e}).map(function(e,t){return t})},br=function(e,t,i,n){return new Date(t,i,n,e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())},yr=function(e,t,i,n){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t,i,n,e.getMilliseconds())},wr=function(e,t){return null!=e&&t?(t=cr(t,"HH:mm:ss"),yr(e,t.getHours(),t.getMinutes(),t.getSeconds())):e},xr=function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())},_r=function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),0)},Cr=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"HH:mm:ss";if(0===t.length)return e;var n=function(e){return nr.a.parse(nr.a.format(e,i),i)},r=n(e),s=t.map(function(e){return e.map(n)});if(s.some(function(e){return r>=e[0]&&r<=e[1]}))return e;var a=s[0][0],o=s[0][0];return s.forEach(function(e){a=new Date(Math.min(e[0],a)),o=new Date(Math.max(e[1],a))}),br(r<a?a:o,e.getFullYear(),e.getMonth(),e.getDate())},kr=function(e,t,i){return Cr(e,t,i).getTime()===e.getTime()},Sr=function(e,t,i){var n=Math.min(e.getDate(),hr(t,i));return br(e,t,i,n)},Dr=function(e){var t=e.getFullYear(),i=e.getMonth();return 0===i?Sr(e,t-1,11):Sr(e,t,i-1)},$r=function(e){var t=e.getFullYear(),i=e.getMonth();return 11===i?Sr(e,t+1,0):Sr(e,t,i+1)},Er=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=e.getFullYear(),n=e.getMonth();return Sr(e,i-t,n)},Tr=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=e.getFullYear(),n=e.getMonth();return Sr(e,i+t,n)},Mr=function(e){return e.replace(/\W?m{1,2}|\W?ZZ/g,"").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi,"").trim()},Pr=function(e){return e.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g,"").trim()},Nr=function(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()},Or={props:{appendToBody:Me.props.appendToBody,offset:Me.props.offset,boundariesPadding:Me.props.boundariesPadding,arrowOffset:Me.props.arrowOffset},methods:Me.methods,data:function(){return J({visibleArrow:!0},Me.data)},beforeDestroy:Me.beforeDestroy},Ir={date:"yyyy-MM-dd",month:"yyyy-MM",datetime:"yyyy-MM-dd HH:mm:ss",time:"HH:mm:ss",week:"yyyywWW",timerange:"HH:mm:ss",daterange:"yyyy-MM-dd",monthrange:"yyyy-MM",datetimerange:"yyyy-MM-dd HH:mm:ss",year:"yyyy"},Fr=["date","datetime","time","time-select","week","month","year","daterange","monthrange","timerange","datetimerange","dates"],Ar=function(e,t){return"timestamp"===t?e.getTime():ur(e,t)},Lr=function(e,t){return"timestamp"===t?new Date(Number(e)):cr(e,t)},Vr=function(e,t){if(Array.isArray(e)&&2===e.length){var i=e[0],n=e[1];if(i&&n)return[Ar(i,t),Ar(n,t)]}return""},Br=function(e,t,i){if(Array.isArray(e)||(e=e.split(i)),2===e.length){var n=e[0],r=e[1];return[Lr(n,t),Lr(r,t)]}return[]},zr={default:{formatter:function(e){return e?""+e:""},parser:function(e){return void 0===e||""===e?null:e}},week:{formatter:function(e,t){var i=mr(e),n=e.getMonth(),r=new Date(e);1===i&&11===n&&(r.setHours(0,0,0,0),r.setDate(r.getDate()+3-(r.getDay()+6)%7));var s=ur(r,t);return s=/WW/.test(s)?s.replace(/WW/,i<10?"0"+i:i):s.replace(/W/,i)},parser:function(e,t){return zr.date.parser(e,t)}},date:{formatter:Ar,parser:Lr},datetime:{formatter:Ar,parser:Lr},daterange:{formatter:Vr,parser:Br},monthrange:{formatter:Vr,parser:Br},datetimerange:{formatter:Vr,parser:Br},timerange:{formatter:Vr,parser:Br},time:{formatter:Ar,parser:Lr},month:{formatter:Ar,parser:Lr},year:{formatter:Ar,parser:Lr},number:{formatter:function(e){return e?""+e:""},parser:function(e){var t=Number(e);return isNaN(e)?null:t}},dates:{formatter:function(e,t){return e.map(function(e){return Ar(e,t)})},parser:function(e,t){return("string"==typeof e?e.split(", "):e).map(function(e){return e instanceof Date?e:Lr(e,t)})}}},Hr={left:"bottom-start",center:"bottom",right:"bottom-end"},Rr=function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"-";return e?(0,(zr[i]||zr.default).parser)(e,t||Ir[i],n):null},Wr=function(e,t,i){return e?(0,(zr[i]||zr.default).formatter)(e,t||Ir[i]):null},jr=function(e,t){var i=function(e,t){var i=e instanceof Date,n=t instanceof Date;return i&&n?e.getTime()===t.getTime():!i&&!n&&e===t},n=e instanceof Array,r=t instanceof Array;return n&&r?e.length===t.length&&e.every(function(e,n){return i(e,t[n])}):!n&&!r&&i(e,t)},qr=function(e){return"string"==typeof e||e instanceof String},Yr=function(e){return null==e||qr(e)||Array.isArray(e)&&2===e.length&&e.every(qr)},Kr=r({mixins:[l,Or],inject:{elForm:{default:""},elFormItem:{default:""}},props:{size:String,format:String,valueFormat:String,readonly:Boolean,placeholder:String,startPlaceholder:String,endPlaceholder:String,prefixIcon:String,clearIcon:{type:String,default:"el-icon-circle-close"},name:{default:"",validator:Yr},disabled:Boolean,clearable:{type:Boolean,default:!0},id:{default:"",validator:Yr},popperClass:String,editable:{type:Boolean,default:!0},align:{type:String,default:"left"},value:{},defaultValue:{},defaultTime:{},rangeSeparator:{default:"-"},pickerOptions:{},unlinkPanels:Boolean,validateEvent:{type:Boolean,default:!0}},components:{ElInput:ee},directives:{Clickoutside:nt},data:function(){return{pickerVisible:!1,showClose:!1,userInput:null,valueOnOpen:null,unwatchPickerOptions:null}},watch:{pickerVisible:function(e){this.readonly||this.pickerDisabled||(e?(this.showPicker(),this.valueOnOpen=Array.isArray(this.value)?[].concat(this.value):this.value):(this.hidePicker(),this.emitChange(this.value),this.userInput=null,this.validateEvent&&this.dispatch("ElFormItem","el.form.blur"),this.$emit("blur",this),this.blur()))},parsedValue:{immediate:!0,handler:function(e){this.picker&&(this.picker.value=e)}},defaultValue:function(e){this.picker&&(this.picker.defaultValue=e)},value:function(e,t){jr(e,t)||this.pickerVisible||!this.validateEvent||this.dispatch("ElFormItem","el.form.change",e)}},computed:{ranged:function(){return this.type.indexOf("range")>-1},reference:function(){var e=this.$refs.reference;return e.$el||e},refInput:function(){return this.reference?[].slice.call(this.reference.querySelectorAll("input")):[]},valueIsEmpty:function(){var e=this.value;if(Array.isArray(e)){for(var t=0,i=e.length;t<i;t++)if(e[t])return!1}else if(e)return!1;return!0},triggerClass:function(){return this.prefixIcon||(-1!==this.type.indexOf("time")?"el-icon-time":"el-icon-date")},selectionMode:function(){return"week"===this.type?"week":"month"===this.type?"month":"year"===this.type?"year":"dates"===this.type?"dates":"day"},haveTrigger:function(){return void 0!==this.showTrigger?this.showTrigger:-1!==Fr.indexOf(this.type)},displayValue:function(){var e=Wr(this.parsedValue,this.format,this.type,this.rangeSeparator);return Array.isArray(this.userInput)?[this.userInput[0]||e&&e[0]||"",this.userInput[1]||e&&e[1]||""]:null!==this.userInput?this.userInput:e?"dates"===this.type?e.join(", "):e:""},parsedValue:function(){return this.value?"time-select"===this.type?this.value:lr(this.value)||Array.isArray(this.value)&&this.value.every(lr)?this.value:this.valueFormat?Rr(this.value,this.valueFormat,this.type,this.rangeSeparator)||this.value:Array.isArray(this.value)?this.value.map(function(e){return new Date(e)}):new Date(this.value):this.value},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},pickerSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},pickerDisabled:function(){return this.disabled||(this.elForm||{}).disabled},firstInputId:function(){var e={},t=void 0;return(t=this.ranged?this.id&&this.id[0]:this.id)&&(e.id=t),e},secondInputId:function(){var e={},t=void 0;return this.ranged&&(t=this.id&&this.id[1]),t&&(e.id=t),e}},created:function(){this.popperOptions={boundariesPadding:0,gpuAcceleration:!1},this.placement=Hr[this.align]||Hr.left,this.$on("fieldReset",this.handleFieldReset)},methods:{focus:function(){this.ranged?this.handleFocus():this.$refs.reference.focus()},blur:function(){this.refInput.forEach(function(e){return e.blur()})},parseValue:function(e){var t=lr(e)||Array.isArray(e)&&e.every(lr);return this.valueFormat&&!t&&Rr(e,this.valueFormat,this.type,this.rangeSeparator)||e},formatToValue:function(e){var t=lr(e)||Array.isArray(e)&&e.every(lr);return this.valueFormat&&t?Wr(e,this.valueFormat,this.type,this.rangeSeparator):e},parseString:function(e){var t=Array.isArray(e)?this.type:this.type.replace("range","");return Rr(e,this.format,t)},formatToString:function(e){var t=Array.isArray(e)?this.type:this.type.replace("range","");return Wr(e,this.format,t)},handleMouseEnter:function(){this.readonly||this.pickerDisabled||!this.valueIsEmpty&&this.clearable&&(this.showClose=!0)},handleChange:function(){if(this.userInput){var e=this.parseString(this.displayValue);e&&(this.picker.value=e,this.isValidValue(e)&&(this.emitInput(e),this.userInput=null))}""===this.userInput&&(this.emitInput(null),this.emitChange(null),this.userInput=null)},handleStartInput:function(e){this.userInput?this.userInput=[e.target.value,this.userInput[1]]:this.userInput=[e.target.value,null]},handleEndInput:function(e){this.userInput?this.userInput=[this.userInput[0],e.target.value]:this.userInput=[null,e.target.value]},handleStartChange:function(e){var t=this.parseString(this.userInput&&this.userInput[0]);if(t){this.userInput=[this.formatToString(t),this.displayValue[1]];var i=[t,this.picker.value&&this.picker.value[1]];this.picker.value=i,this.isValidValue(i)&&(this.emitInput(i),this.userInput=null)}},handleEndChange:function(e){var t=this.parseString(this.userInput&&this.userInput[1]);if(t){this.userInput=[this.displayValue[0],this.formatToString(t)];var i=[this.picker.value&&this.picker.value[0],t];this.picker.value=i,this.isValidValue(i)&&(this.emitInput(i),this.userInput=null)}},handleClickIcon:function(e){this.readonly||this.pickerDisabled||(this.showClose?(this.valueOnOpen=this.value,e.stopPropagation(),this.emitInput(null),this.emitChange(null),this.showClose=!1,this.picker&&"function"==typeof this.picker.handleClear&&this.picker.handleClear()):this.pickerVisible=!this.pickerVisible)},handleClose:function(){if(this.pickerVisible&&(this.pickerVisible=!1,"dates"===this.type)){var e=Rr(this.valueOnOpen,this.valueFormat,this.type,this.rangeSeparator)||this.valueOnOpen;this.emitInput(e)}},handleFieldReset:function(e){this.userInput=""===e?null:e},handleFocus:function(){var e=this.type;-1===Fr.indexOf(e)||this.pickerVisible||(this.pickerVisible=!0),this.$emit("focus",this)},handleKeydown:function(e){var t=this,i=e.keyCode;return 27===i?(this.pickerVisible=!1,void e.stopPropagation()):9!==i?13===i?((""===this.userInput||this.isValidValue(this.parseString(this.displayValue)))&&(this.handleChange(),this.pickerVisible=this.picker.visible=!1,this.blur()),void e.stopPropagation()):void(this.userInput?e.stopPropagation():this.picker&&this.picker.handleKeydown&&this.picker.handleKeydown(e)):void(this.ranged?setTimeout(function(){-1===t.refInput.indexOf(document.activeElement)&&(t.pickerVisible=!1,t.blur(),e.stopPropagation())},0):(this.handleChange(),this.pickerVisible=this.picker.visible=!1,this.blur(),e.stopPropagation()))},handleRangeClick:function(){var e=this.type;-1===Fr.indexOf(e)||this.pickerVisible||(this.pickerVisible=!0),this.$emit("focus",this)},hidePicker:function(){this.picker&&(this.picker.resetView&&this.picker.resetView(),this.pickerVisible=this.picker.visible=!1,this.destroyPopper())},showPicker:function(){var e=this;this.$isServer||(this.picker||this.mountPicker(),this.pickerVisible=this.picker.visible=!0,this.updatePopper(),this.picker.value=this.parsedValue,this.picker.resetView&&this.picker.resetView(),this.$nextTick(function(){e.picker.adjustSpinners&&e.picker.adjustSpinners()}))},mountPicker:function(){var e=this;this.picker=new h.a(this.panel).$mount(),this.picker.defaultValue=this.defaultValue,this.picker.defaultTime=this.defaultTime,this.picker.popperClass=this.popperClass,this.popperElm=this.picker.$el,this.picker.width=this.reference.getBoundingClientRect().width,this.picker.showTime="datetime"===this.type||"datetimerange"===this.type,this.picker.selectionMode=this.selectionMode,this.picker.unlinkPanels=this.unlinkPanels,this.picker.arrowControl=this.arrowControl||this.timeArrowControl||!1,this.$watch("format",function(t){e.picker.format=t});var t=function(){var t=e.pickerOptions;if(t&&t.selectableRange){var i=t.selectableRange,n=zr.datetimerange.parser,r=Ir.timerange;i=Array.isArray(i)?i:[i],e.picker.selectableRange=i.map(function(t){return n(t,r,e.rangeSeparator)})}for(var s in t)t.hasOwnProperty(s)&&"selectableRange"!==s&&(e.picker[s]=t[s]);e.format&&(e.picker.format=e.format)};t(),this.unwatchPickerOptions=this.$watch("pickerOptions",function(){return t()},{deep:!0}),this.$el.appendChild(this.picker.$el),this.picker.resetView&&this.picker.resetView(),this.picker.$on("dodestroy",this.doDestroy),this.picker.$on("pick",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.userInput=null,e.pickerVisible=e.picker.visible=i,e.emitInput(t),e.picker.resetView&&e.picker.resetView()}),this.picker.$on("select-range",function(t,i,n){0!==e.refInput.length&&(n&&"min"!==n?"max"===n&&(e.refInput[1].setSelectionRange(t,i),e.refInput[1].focus()):(e.refInput[0].setSelectionRange(t,i),e.refInput[0].focus()))})},unmountPicker:function(){this.picker&&(this.picker.$destroy(),this.picker.$off(),"function"==typeof this.unwatchPickerOptions&&this.unwatchPickerOptions(),this.picker.$el.parentNode.removeChild(this.picker.$el))},emitChange:function(e){jr(e,this.valueOnOpen)||(this.$emit("change",e),this.valueOnOpen=e,this.validateEvent&&this.dispatch("ElFormItem","el.form.change",e))},emitInput:function(e){var t=this.formatToValue(e);jr(this.value,t)||this.$emit("input",t)},isValidValue:function(e){return this.picker||this.mountPicker(),!this.picker.isValidValue||e&&this.picker.isValidValue(e)}}},tr,[],!1,null,null,null);Kr.options.__file="packages/date-picker/src/picker.vue";var Gr=Kr.exports,Ur=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-enter":e.handleEnter,"after-leave":e.handleLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-picker-panel el-date-picker el-popper",class:[{"has-sidebar":e.$slots.sidebar||e.shortcuts,"has-time":e.showTime},e.popperClass]},[i("div",{staticClass:"el-picker-panel__body-wrapper"},[e._t("sidebar"),e.shortcuts?i("div",{staticClass:"el-picker-panel__sidebar"},e._l(e.shortcuts,function(t,n){return i("button",{key:n,staticClass:"el-picker-panel__shortcut",attrs:{type:"button"},on:{click:function(i){e.handleShortcutClick(t)}}},[e._v(e._s(t.text))])}),0):e._e(),i("div",{staticClass:"el-picker-panel__body"},[e.showTime?i("div",{staticClass:"el-date-picker__time-header"},[i("span",{staticClass:"el-date-picker__editor-wrap"},[i("el-input",{attrs:{placeholder:e.t("el.datepicker.selectDate"),value:e.visibleDate,size:"small"},on:{input:function(t){return e.userInputDate=t},change:e.handleVisibleDateChange}})],1),i("span",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleTimePickClose,expression:"handleTimePickClose"}],staticClass:"el-date-picker__editor-wrap"},[i("el-input",{ref:"input",attrs:{placeholder:e.t("el.datepicker.selectTime"),value:e.visibleTime,size:"small"},on:{focus:function(t){e.timePickerVisible=!0},input:function(t){return e.userInputTime=t},change:e.handleVisibleTimeChange}}),i("time-picker",{ref:"timepicker",attrs:{"time-arrow-control":e.arrowControl,visible:e.timePickerVisible},on:{pick:e.handleTimePick,mounted:e.proxyTimePickerDataProperties}})],1)]):e._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:"time"!==e.currentView,expression:"currentView !== 'time'"}],staticClass:"el-date-picker__header",class:{"el-date-picker__header--bordered":"year"===e.currentView||"month"===e.currentView}},[i("button",{staticClass:"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left",attrs:{type:"button","aria-label":e.t("el.datepicker.prevYear")},on:{click:e.prevYear}}),i("button",{directives:[{name:"show",rawName:"v-show",value:"date"===e.currentView,expression:"currentView === 'date'"}],staticClass:"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left",attrs:{type:"button","aria-label":e.t("el.datepicker.prevMonth")},on:{click:e.prevMonth}}),i("span",{staticClass:"el-date-picker__header-label",attrs:{role:"button"},on:{click:e.showYearPicker}},[e._v(e._s(e.yearLabel))]),i("span",{directives:[{name:"show",rawName:"v-show",value:"date"===e.currentView,expression:"currentView === 'date'"}],staticClass:"el-date-picker__header-label",class:{active:"month"===e.currentView},attrs:{role:"button"},on:{click:e.showMonthPicker}},[e._v(e._s(e.t("el.datepicker.month"+(e.month+1))))]),i("button",{staticClass:"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right",attrs:{type:"button","aria-label":e.t("el.datepicker.nextYear")},on:{click:e.nextYear}}),i("button",{directives:[{name:"show",rawName:"v-show",value:"date"===e.currentView,expression:"currentView === 'date'"}],staticClass:"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right",attrs:{type:"button","aria-label":e.t("el.datepicker.nextMonth")},on:{click:e.nextMonth}})]),i("div",{staticClass:"el-picker-panel__content"},[i("date-table",{directives:[{name:"show",rawName:"v-show",value:"date"===e.currentView,expression:"currentView === 'date'"}],attrs:{"selection-mode":e.selectionMode,"first-day-of-week":e.firstDayOfWeek,value:e.value,"default-value":e.defaultValue?new Date(e.defaultValue):null,date:e.date,"disabled-date":e.disabledDate},on:{pick:e.handleDatePick}}),i("year-table",{directives:[{name:"show",rawName:"v-show",value:"year"===e.currentView,expression:"currentView === 'year'"}],attrs:{value:e.value,"default-value":e.defaultValue?new Date(e.defaultValue):null,date:e.date,"disabled-date":e.disabledDate},on:{pick:e.handleYearPick}}),i("month-table",{directives:[{name:"show",rawName:"v-show",value:"month"===e.currentView,expression:"currentView === 'month'"}],attrs:{value:e.value,"default-value":e.defaultValue?new Date(e.defaultValue):null,date:e.date,"disabled-date":e.disabledDate},on:{pick:e.handleMonthPick}})],1)])],2),i("div",{directives:[{name:"show",rawName:"v-show",value:e.footerVisible&&"date"===e.currentView,expression:"footerVisible && currentView === 'date'"}],staticClass:"el-picker-panel__footer"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:"dates"!==e.selectionMode,expression:"selectionMode !== 'dates'"}],staticClass:"el-picker-panel__link-btn",attrs:{size:"mini",type:"text"},on:{click:e.changeToNow}},[e._v("\n        "+e._s(e.t("el.datepicker.now"))+"\n      ")]),i("el-button",{staticClass:"el-picker-panel__link-btn",attrs:{plain:"",size:"mini"},on:{click:e.confirm}},[e._v("\n        "+e._s(e.t("el.datepicker.confirm"))+"\n      ")])],1)])])};Ur._withStripped=!0;var Xr=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":function(t){e.$emit("dodestroy")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-time-panel el-popper",class:e.popperClass},[i("div",{staticClass:"el-time-panel__content",class:{"has-seconds":e.showSeconds}},[i("time-spinner",{ref:"spinner",attrs:{"arrow-control":e.useArrow,"show-seconds":e.showSeconds,"am-pm-mode":e.amPmMode,date:e.date},on:{change:e.handleChange,"select-range":e.setSelectionRange}})],1),i("div",{staticClass:"el-time-panel__footer"},[i("button",{staticClass:"el-time-panel__btn cancel",attrs:{type:"button"},on:{click:e.handleCancel}},[e._v(e._s(e.t("el.datepicker.cancel")))]),i("button",{staticClass:"el-time-panel__btn",class:{confirm:!e.disabled},attrs:{type:"button"},on:{click:function(t){e.handleConfirm()}}},[e._v(e._s(e.t("el.datepicker.confirm")))])])])])};Xr._withStripped=!0;var Jr=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-time-spinner",class:{"has-seconds":e.showSeconds}},[e.arrowControl?e._e():[i("el-scrollbar",{ref:"hours",staticClass:"el-time-spinner__wrapper",attrs:{"wrap-style":"max-height: inherit;","view-class":"el-time-spinner__list",noresize:"",tag:"ul"},nativeOn:{mouseenter:function(t){e.emitSelectRange("hours")},mousemove:function(t){e.adjustCurrentSpinner("hours")}}},e._l(e.hoursList,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:n===e.hours,disabled:t},on:{click:function(i){e.handleClick("hours",{value:n,disabled:t})}}},[e._v(e._s(("0"+(e.amPmMode?n%12||12:n)).slice(-2))+e._s(e.amPm(n)))])}),0),i("el-scrollbar",{ref:"minutes",staticClass:"el-time-spinner__wrapper",attrs:{"wrap-style":"max-height: inherit;","view-class":"el-time-spinner__list",noresize:"",tag:"ul"},nativeOn:{mouseenter:function(t){e.emitSelectRange("minutes")},mousemove:function(t){e.adjustCurrentSpinner("minutes")}}},e._l(e.minutesList,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:n===e.minutes,disabled:!t},on:{click:function(t){e.handleClick("minutes",{value:n,disabled:!1})}}},[e._v(e._s(("0"+n).slice(-2)))])}),0),i("el-scrollbar",{directives:[{name:"show",rawName:"v-show",value:e.showSeconds,expression:"showSeconds"}],ref:"seconds",staticClass:"el-time-spinner__wrapper",attrs:{"wrap-style":"max-height: inherit;","view-class":"el-time-spinner__list",noresize:"",tag:"ul"},nativeOn:{mouseenter:function(t){e.emitSelectRange("seconds")},mousemove:function(t){e.adjustCurrentSpinner("seconds")}}},e._l(60,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:n===e.seconds},on:{click:function(t){e.handleClick("seconds",{value:n,disabled:!1})}}},[e._v(e._s(("0"+n).slice(-2)))])}),0)],e.arrowControl?[i("div",{staticClass:"el-time-spinner__wrapper is-arrow",on:{mouseenter:function(t){e.emitSelectRange("hours")}}},[i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.decrease,expression:"decrease"}],staticClass:"el-time-spinner__arrow el-icon-arrow-up"}),i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.increase,expression:"increase"}],staticClass:"el-time-spinner__arrow el-icon-arrow-down"}),i("ul",{ref:"hours",staticClass:"el-time-spinner__list"},e._l(e.arrowHourList,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:t===e.hours,disabled:e.hoursList[t]}},[e._v(e._s(void 0===t?"":("0"+(e.amPmMode?t%12||12:t)).slice(-2)+e.amPm(t)))])}),0)]),i("div",{staticClass:"el-time-spinner__wrapper is-arrow",on:{mouseenter:function(t){e.emitSelectRange("minutes")}}},[i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.decrease,expression:"decrease"}],staticClass:"el-time-spinner__arrow el-icon-arrow-up"}),i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.increase,expression:"increase"}],staticClass:"el-time-spinner__arrow el-icon-arrow-down"}),i("ul",{ref:"minutes",staticClass:"el-time-spinner__list"},e._l(e.arrowMinuteList,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:t===e.minutes}},[e._v("\n          "+e._s(void 0===t?"":("0"+t).slice(-2))+"\n        ")])}),0)]),e.showSeconds?i("div",{staticClass:"el-time-spinner__wrapper is-arrow",on:{mouseenter:function(t){e.emitSelectRange("seconds")}}},[i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.decrease,expression:"decrease"}],staticClass:"el-time-spinner__arrow el-icon-arrow-up"}),i("i",{directives:[{name:"repeat-click",rawName:"v-repeat-click",value:e.increase,expression:"increase"}],staticClass:"el-time-spinner__arrow el-icon-arrow-down"}),i("ul",{ref:"seconds",staticClass:"el-time-spinner__list"},e._l(e.arrowSecondList,function(t,n){return i("li",{key:n,staticClass:"el-time-spinner__item",class:{active:t===e.seconds}},[e._v("\n          "+e._s(void 0===t?"":("0"+t).slice(-2))+"\n        ")])}),0)]):e._e()]:e._e()],2)};Jr._withStripped=!0;var Zr=r({components:{ElScrollbar:Ue},directives:{repeatClick:vi},props:{date:{},defaultValue:{},showSeconds:{type:Boolean,default:!0},arrowControl:Boolean,amPmMode:{type:String,default:""}},computed:{hours:function(){return this.date.getHours()},minutes:function(){return this.date.getMinutes()},seconds:function(){return this.date.getSeconds()},hoursList:function(){return function(e){var t=[],i=[];if((e||[]).forEach(function(e){var t=e.map(function(e){return e.getHours()});i=i.concat(function(e,t){for(var i=[],n=e;n<=t;n++)i.push(n);return i}(t[0],t[1]))}),i.length)for(var n=0;n<24;n++)t[n]=-1===i.indexOf(n);else for(var r=0;r<24;r++)t[r]=!1;return t}(this.selectableRange)},minutesList:function(){return e=this.selectableRange,t=this.hours,i=new Array(60),e.length>0?e.forEach(function(e){var n=e[0],r=e[1],s=n.getHours(),a=n.getMinutes(),o=r.getHours(),l=r.getMinutes();s===t&&o!==t?vr(i,a,60,!0):s===t&&o===t?vr(i,a,l+1,!0):s!==t&&o===t?vr(i,0,l+1,!0):s<t&&o>t&&vr(i,0,60,!0)}):vr(i,0,60,!0),i;var e,t,i},arrowHourList:function(){var e=this.hours;return[e>0?e-1:void 0,e,e<23?e+1:void 0]},arrowMinuteList:function(){var e=this.minutes;return[e>0?e-1:void 0,e,e<59?e+1:void 0]},arrowSecondList:function(){var e=this.seconds;return[e>0?e-1:void 0,e,e<59?e+1:void 0]}},data:function(){return{selectableRange:[],currentScrollbar:null}},mounted:function(){var e=this;this.$nextTick(function(){!e.arrowControl&&e.bindScrollEvent()})},methods:{increase:function(){this.scrollDown(1)},decrease:function(){this.scrollDown(-1)},modifyDateField:function(e,t){switch(e){case"hours":this.$emit("change",yr(this.date,t,this.minutes,this.seconds));break;case"minutes":this.$emit("change",yr(this.date,this.hours,t,this.seconds));break;case"seconds":this.$emit("change",yr(this.date,this.hours,this.minutes,t))}},handleClick:function(e,t){var i=t.value;t.disabled||(this.modifyDateField(e,i),this.emitSelectRange(e),this.adjustSpinner(e,i))},emitSelectRange:function(e){"hours"===e?this.$emit("select-range",0,2):"minutes"===e?this.$emit("select-range",3,5):"seconds"===e&&this.$emit("select-range",6,8),this.currentScrollbar=e},bindScrollEvent:function(){var e=this,t=function(t){e.$refs[t].wrap.onscroll=function(i){e.handleScroll(t,i)}};t("hours"),t("minutes"),t("seconds")},handleScroll:function(e){var t=Math.min(Math.floor((this.$refs[e].wrap.scrollTop-(.5*this.scrollBarHeight(e)-10)/this.typeItemHeight(e)+3)/this.typeItemHeight(e)),"hours"===e?23:59);this.modifyDateField(e,t)},adjustSpinners:function(){this.adjustSpinner("hours",this.hours),this.adjustSpinner("minutes",this.minutes),this.adjustSpinner("seconds",this.seconds)},adjustCurrentSpinner:function(e){this.adjustSpinner(e,this[e])},adjustSpinner:function(e,t){if(!this.arrowControl){var i=this.$refs[e].wrap;i&&(i.scrollTop=Math.max(0,t*this.typeItemHeight(e)))}},scrollDown:function(e){this.currentScrollbar||this.emitSelectRange("hours");var t=this.currentScrollbar,i=this.hoursList,n=this[t];if("hours"===this.currentScrollbar){var r=Math.abs(e);e=e>0?1:-1;for(var s=i.length;s--&&r;)i[n=(n+e+i.length)%i.length]||r--;if(i[n])return}else n=(n+e+60)%60;this.modifyDateField(t,n),this.adjustSpinner(t,n)},amPm:function(e){if(!("a"===this.amPmMode.toLowerCase()))return"";var t=e<12?" am":" pm";return"A"===this.amPmMode&&(t=t.toUpperCase()),t},typeItemHeight:function(e){return this.$refs[e].$el.querySelector("li").offsetHeight},scrollBarHeight:function(e){return this.$refs[e].$el.offsetHeight}}},Jr,[],!1,null,null,null);Zr.options.__file="packages/date-picker/src/basic/time-spinner.vue";var Qr=Zr.exports,es=r({mixins:[j],components:{TimeSpinner:Qr},props:{visible:Boolean,timeArrowControl:Boolean},watch:{visible:function(e){var t=this;e?(this.oldValue=this.value,this.$nextTick(function(){return t.$refs.spinner.emitSelectRange("hours")})):this.needInitAdjust=!0},value:function(e){var t=this,i=void 0;e instanceof Date?i=Cr(e,this.selectableRange,this.format):e||(i=this.defaultValue?new Date(this.defaultValue):new Date),this.date=i,this.visible&&this.needInitAdjust&&(this.$nextTick(function(e){return t.adjustSpinners()}),this.needInitAdjust=!1)},selectableRange:function(e){this.$refs.spinner.selectableRange=e},defaultValue:function(e){or(this.value)||(this.date=e?new Date(e):new Date)}},data:function(){return{popperClass:"",format:"HH:mm:ss",value:"",defaultValue:null,date:new Date,oldValue:new Date,selectableRange:[],selectionRange:[0,2],disabled:!1,arrowControl:!1,needInitAdjust:!0}},computed:{showSeconds:function(){return-1!==(this.format||"").indexOf("ss")},useArrow:function(){return this.arrowControl||this.timeArrowControl||!1},amPmMode:function(){return-1!==(this.format||"").indexOf("A")?"A":-1!==(this.format||"").indexOf("a")?"a":""}},methods:{handleCancel:function(){this.$emit("pick",this.oldValue,!1)},handleChange:function(e){this.visible&&(this.date=_r(e),this.isValidValue(this.date)&&this.$emit("pick",this.date,!0))},setSelectionRange:function(e,t){this.$emit("select-range",e,t),this.selectionRange=[e,t]},handleConfirm:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(!t){var i=_r(Cr(this.date,this.selectableRange,this.format));this.$emit("pick",i,e,t)}},handleKeydown:function(e){var t=e.keyCode,i={38:-1,40:1,37:-1,39:1};if(37===t||39===t){var n=i[t];return this.changeSelectionRange(n),void e.preventDefault()}if(38===t||40===t){var r=i[t];return this.$refs.spinner.scrollDown(r),void e.preventDefault()}},isValidValue:function(e){return kr(e,this.selectableRange,this.format)},adjustSpinners:function(){return this.$refs.spinner.adjustSpinners()},changeSelectionRange:function(e){var t=[0,3].concat(this.showSeconds?[6]:[]),i=["hours","minutes"].concat(this.showSeconds?["seconds"]:[]),n=(t.indexOf(this.selectionRange[0])+e+t.length)%t.length;this.$refs.spinner.emitSelectRange(i[n])}},mounted:function(){var e=this;this.$nextTick(function(){return e.handleConfirm(!0,!0)}),this.$emit("mounted")}},Xr,[],!1,null,null,null);es.options.__file="packages/date-picker/src/panel/time.vue";var ts=es.exports,is=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("table",{staticClass:"el-year-table",on:{click:e.handleYearTableClick}},[i("tbody",[i("tr",[i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+0)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+1)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+1))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+2)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+2))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+3)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+3))])])]),i("tr",[i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+4)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+4))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+5)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+5))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+6)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+6))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+7)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+7))])])]),i("tr",[i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+8)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+8))])]),i("td",{staticClass:"available",class:e.getCellStyle(e.startYear+9)},[i("a",{staticClass:"cell"},[e._v(e._s(e.startYear+9))])]),i("td"),i("td")])])])};is._withStripped=!0;var ns=r({props:{disabledDate:{},value:{},defaultValue:{validator:function(e){return null===e||e instanceof Date&&or(e)}},date:{}},computed:{startYear:function(){return 10*Math.floor(this.date.getFullYear()/10)}},methods:{getCellStyle:function(e){var t={},i=new Date;return t.disabled="function"==typeof this.disabledDate&&function(e){var t=function(e){return e%400==0||e%100!=0&&e%4==0?366:365}(e),i=new Date(e,0,1);return gr(t).map(function(e){return fr(i,e)})}(e).every(this.disabledDate),t.current=E(M(this.value),function(t){return t.getFullYear()===e})>=0,t.today=i.getFullYear()===e,t.default=this.defaultValue&&this.defaultValue.getFullYear()===e,t},handleYearTableClick:function(e){var t=e.target;if("A"===t.tagName){if(ce(t.parentNode,"disabled"))return;var i=t.textContent||t.innerText;this.$emit("pick",Number(i))}}}},is,[],!1,null,null,null);ns.options.__file="packages/date-picker/src/basic/year-table.vue";var rs=ns.exports,ss=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("table",{staticClass:"el-month-table",on:{click:e.handleMonthTableClick,mousemove:e.handleMouseMove}},[i("tbody",e._l(e.rows,function(t,n){return i("tr",{key:n},e._l(t,function(t,n){return i("td",{key:n,class:e.getCellStyle(t)},[i("div",[i("a",{staticClass:"cell"},[e._v(e._s(e.t("el.datepicker.months."+e.months[t.text])))])])])}),0)}),0)])};ss._withStripped=!0;var as=function(e){return new Date(e.getFullYear(),e.getMonth())},os=function(e){return"number"==typeof e||"string"==typeof e?as(new Date(e)).getTime():e instanceof Date?as(e).getTime():NaN},ls=r({props:{disabledDate:{},value:{},selectionMode:{default:"month"},minDate:{},maxDate:{},defaultValue:{validator:function(e){return null===e||or(e)||Array.isArray(e)&&e.every(or)}},date:{},rangeState:{default:function(){return{endDate:null,selecting:!1}}}},mixins:[j],watch:{"rangeState.endDate":function(e){this.markRange(this.minDate,e)},minDate:function(e,t){os(e)!==os(t)&&this.markRange(this.minDate,this.maxDate)},maxDate:function(e,t){os(e)!==os(t)&&this.markRange(this.minDate,this.maxDate)}},data:function(){return{months:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],tableRows:[[],[],[]],lastRow:null,lastColumn:null}},methods:{cellMatchesDate:function(e,t){var i=new Date(t);return this.date.getFullYear()===i.getFullYear()&&Number(e.text)===i.getMonth()},getCellStyle:function(e){var t=this,i={},n=this.date.getFullYear(),r=new Date,s=e.text,a=this.defaultValue?Array.isArray(this.defaultValue)?this.defaultValue:[this.defaultValue]:[];return i.disabled="function"==typeof this.disabledDate&&function(e,t){var i=hr(e,t),n=new Date(e,t,1);return gr(i).map(function(e){return fr(n,e)})}(n,s).every(this.disabledDate),i.current=E(M(this.value),function(e){return e.getFullYear()===n&&e.getMonth()===s})>=0,i.today=r.getFullYear()===n&&r.getMonth()===s,i.default=a.some(function(i){return t.cellMatchesDate(e,i)}),e.inRange&&(i["in-range"]=!0,e.start&&(i["start-date"]=!0),e.end&&(i["end-date"]=!0)),i},getMonthOfCell:function(e){var t=this.date.getFullYear();return new Date(t,e,1)},markRange:function(e,t){e=os(e),t=os(t)||e;var i=[Math.min(e,t),Math.max(e,t)];e=i[0],t=i[1];for(var n=this.rows,r=0,s=n.length;r<s;r++)for(var a=n[r],o=0,l=a.length;o<l;o++){var u=a[o],c=4*r+o,h=new Date(this.date.getFullYear(),c).getTime();u.inRange=e&&h>=e&&h<=t,u.start=e&&h===e,u.end=t&&h===t}},handleMouseMove:function(e){if(this.rangeState.selecting){var t=e.target;if("A"===t.tagName&&(t=t.parentNode.parentNode),"DIV"===t.tagName&&(t=t.parentNode),"TD"===t.tagName){var i=t.parentNode.rowIndex,n=t.cellIndex;this.rows[i][n].disabled||i===this.lastRow&&n===this.lastColumn||(this.lastRow=i,this.lastColumn=n,this.$emit("changerange",{minDate:this.minDate,maxDate:this.maxDate,rangeState:{selecting:!0,endDate:this.getMonthOfCell(4*i+n)}}))}}},handleMonthTableClick:function(e){var t=e.target;if("A"===t.tagName&&(t=t.parentNode.parentNode),"DIV"===t.tagName&&(t=t.parentNode),"TD"===t.tagName&&!ce(t,"disabled")){var i=t.cellIndex,n=4*t.parentNode.rowIndex+i,r=this.getMonthOfCell(n);"range"===this.selectionMode?this.rangeState.selecting?(r>=this.minDate?this.$emit("pick",{minDate:this.minDate,maxDate:r}):this.$emit("pick",{minDate:r,maxDate:this.minDate}),this.rangeState.selecting=!1):(this.$emit("pick",{minDate:r,maxDate:null}),this.rangeState.selecting=!0):this.$emit("pick",n)}}},computed:{rows:function(){for(var e=this,t=this.tableRows,i=this.disabledDate,n=[],r=os(new Date),s=0;s<3;s++)for(var a=t[s],o=function(t){var o=a[t];o||(o={row:s,column:t,type:"normal",inRange:!1,start:!1,end:!1}),o.type="normal";var l=4*s+t,u=new Date(e.date.getFullYear(),l).getTime();o.inRange=u>=os(e.minDate)&&u<=os(e.maxDate),o.start=e.minDate&&u===os(e.minDate),o.end=e.maxDate&&u===os(e.maxDate),u===r&&(o.type="today"),o.text=l;var c=new Date(u);o.disabled="function"==typeof i&&i(c),o.selected=T(n,function(e){return e.getTime()===c.getTime()}),e.$set(a,t,o)},l=0;l<4;l++)o(l);return t}}},ss,[],!1,null,null,null);ls.options.__file="packages/date-picker/src/basic/month-table.vue";var us=ls.exports,cs=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("table",{staticClass:"el-date-table",class:{"is-week-mode":"week"===e.selectionMode},attrs:{cellspacing:"0",cellpadding:"0"},on:{click:e.handleClick,mousemove:e.handleMouseMove}},[i("tbody",[i("tr",[e.showWeekNumber?i("th",[e._v(e._s(e.t("el.datepicker.week")))]):e._e(),e._l(e.WEEKS,function(t,n){return i("th",{key:n},[e._v(e._s(e.t("el.datepicker.weeks."+t)))])})],2),e._l(e.rows,function(t,n){return i("tr",{key:n,staticClass:"el-date-table__row",class:{current:e.isWeekActive(t[1])}},e._l(t,function(t,n){return i("td",{key:n,class:e.getCellClasses(t)},[i("div",[i("span",[e._v("\n          "+e._s(t.text)+"\n        ")])])])}),0)})],2)])};cs._withStripped=!0;var hs=["sun","mon","tue","wed","thu","fri","sat"],ds=function(e){return"number"==typeof e||"string"==typeof e?xr(new Date(e)).getTime():e instanceof Date?xr(e).getTime():NaN},ps=r({mixins:[j],props:{firstDayOfWeek:{default:7,type:Number,validator:function(e){return e>=1&&e<=7}},value:{},defaultValue:{validator:function(e){return null===e||or(e)||Array.isArray(e)&&e.every(or)}},date:{},selectionMode:{default:"day"},showWeekNumber:{type:Boolean,default:!1},disabledDate:{},minDate:{},maxDate:{},rangeState:{default:function(){return{endDate:null,selecting:!1}}}},computed:{offsetDay:function(){var e=this.firstDayOfWeek;return e>3?7-e:-e},WEEKS:function(){var e=this.firstDayOfWeek;return hs.concat(hs).slice(e,e+7)},year:function(){return this.date.getFullYear()},month:function(){return this.date.getMonth()},startDate:function(){return e=this.year,t=this.month,i=new Date(e,t,1),n=i.getDay(),pr(i,0===n?7:n);var e,t,i,n},rows:function(){var e=this,t=new Date(this.year,this.month,1),i=dr(t),n=hr(t.getFullYear(),t.getMonth()),r=hr(t.getFullYear(),0===t.getMonth()?11:t.getMonth()-1);i=0===i?7:i;for(var s=this.offsetDay,a=this.tableRows,o=1,l=this.startDate,u=this.disabledDate,c="dates"===this.selectionMode?M(this.value):[],h=ds(new Date),d=0;d<6;d++){var p=a[d];this.showWeekNumber&&(p[0]||(p[0]={type:"week",text:mr(fr(l,7*d+1))}));for(var f=function(t){var a=p[e.showWeekNumber?t+1:t];a||(a={row:d,column:t,type:"normal",inRange:!1,start:!1,end:!1}),a.type="normal";var f=fr(l,7*d+t-s).getTime();if(a.inRange=f>=ds(e.minDate)&&f<=ds(e.maxDate),a.start=e.minDate&&f===ds(e.minDate),a.end=e.maxDate&&f===ds(e.maxDate),f===h&&(a.type="today"),d>=0&&d<=1){var m=i+s<0?7+i+s:i+s;t+7*d>=m?a.text=o++:(a.text=r-(m-t%7)+1+7*d,a.type="prev-month")}else o<=n?a.text=o++:(a.text=o++-n,a.type="next-month");var v=new Date(f);a.disabled="function"==typeof u&&u(v),a.selected=T(c,function(e){return e.getTime()===v.getTime()}),e.$set(p,e.showWeekNumber?t+1:t,a)},m=0;m<7;m++)f(m);if("week"===this.selectionMode){var v=this.showWeekNumber?1:0,g=this.showWeekNumber?7:6,b=this.isWeekActive(p[v+1]);p[v].inRange=b,p[v].start=b,p[g].inRange=b,p[g].end=b}}return a}},watch:{"rangeState.endDate":function(e){this.markRange(this.minDate,e)},minDate:function(e,t){ds(e)!==ds(t)&&this.markRange(this.minDate,this.maxDate)},maxDate:function(e,t){ds(e)!==ds(t)&&this.markRange(this.minDate,this.maxDate)}},data:function(){return{tableRows:[[],[],[],[],[],[]],lastRow:null,lastColumn:null}},methods:{cellMatchesDate:function(e,t){var i=new Date(t);return this.year===i.getFullYear()&&this.month===i.getMonth()&&Number(e.text)===i.getDate()},getCellClasses:function(e){var t=this,i=this.selectionMode,n=this.defaultValue?Array.isArray(this.defaultValue)?this.defaultValue:[this.defaultValue]:[],r=[];return"normal"!==e.type&&"today"!==e.type||e.disabled?r.push(e.type):(r.push("available"),"today"===e.type&&r.push("today")),"normal"===e.type&&n.some(function(i){return t.cellMatchesDate(e,i)})&&r.push("default"),"day"!==i||"normal"!==e.type&&"today"!==e.type||!this.cellMatchesDate(e,this.value)||r.push("current"),!e.inRange||"normal"!==e.type&&"today"!==e.type&&"week"!==this.selectionMode||(r.push("in-range"),e.start&&r.push("start-date"),e.end&&r.push("end-date")),e.disabled&&r.push("disabled"),e.selected&&r.push("selected"),r.join(" ")},getDateOfCell:function(e,t){var i=7*e+(t-(this.showWeekNumber?1:0))-this.offsetDay;return fr(this.startDate,i)},isWeekActive:function(e){if("week"!==this.selectionMode)return!1;var t=new Date(this.year,this.month,1),i=t.getFullYear(),n=t.getMonth();if("prev-month"===e.type&&(t.setMonth(0===n?11:n-1),t.setFullYear(0===n?i-1:i)),"next-month"===e.type&&(t.setMonth(11===n?0:n+1),t.setFullYear(11===n?i+1:i)),t.setDate(parseInt(e.text,10)),or(this.value)){var r=(this.value.getDay()-this.firstDayOfWeek+7)%7-1;return pr(this.value,r).getTime()===t.getTime()}return!1},markRange:function(e,t){e=ds(e),t=ds(t)||e;var i=[Math.min(e,t),Math.max(e,t)];e=i[0],t=i[1];for(var n=this.startDate,r=this.rows,s=0,a=r.length;s<a;s++)for(var o=r[s],l=0,u=o.length;l<u;l++)if(!this.showWeekNumber||0!==l){var c=o[l],h=7*s+l+(this.showWeekNumber?-1:0),d=fr(n,h-this.offsetDay).getTime();c.inRange=e&&d>=e&&d<=t,c.start=e&&d===e,c.end=t&&d===t}},handleMouseMove:function(e){if(this.rangeState.selecting){var t=e.target;if("SPAN"===t.tagName&&(t=t.parentNode.parentNode),"DIV"===t.tagName&&(t=t.parentNode),"TD"===t.tagName){var i=t.parentNode.rowIndex-1,n=t.cellIndex;this.rows[i][n].disabled||i===this.lastRow&&n===this.lastColumn||(this.lastRow=i,this.lastColumn=n,this.$emit("changerange",{minDate:this.minDate,maxDate:this.maxDate,rangeState:{selecting:!0,endDate:this.getDateOfCell(i,n)}}))}}},handleClick:function(e){var t=e.target;if("SPAN"===t.tagName&&(t=t.parentNode.parentNode),"DIV"===t.tagName&&(t=t.parentNode),"TD"===t.tagName){var i=t.parentNode.rowIndex-1,n="week"===this.selectionMode?1:t.cellIndex,r=this.rows[i][n];if(!r.disabled&&"week"!==r.type){var s,a,o,l=this.getDateOfCell(i,n);if("range"===this.selectionMode)this.rangeState.selecting?(l>=this.minDate?this.$emit("pick",{minDate:this.minDate,maxDate:l}):this.$emit("pick",{minDate:l,maxDate:this.minDate}),this.rangeState.selecting=!1):(this.$emit("pick",{minDate:l,maxDate:null}),this.rangeState.selecting=!0);else if("day"===this.selectionMode)this.$emit("pick",l);else if("week"===this.selectionMode){var u=mr(l),c=l.getFullYear()+"w"+u;this.$emit("pick",{year:l.getFullYear(),week:u,value:c,date:l})}else if("dates"===this.selectionMode){var h=this.value||[],d=r.selected?(s=h,(o="function"==typeof(a=function(e){return e.getTime()===l.getTime()})?E(s,a):s.indexOf(a))>=0?[].concat(s.slice(0,o),s.slice(o+1)):s):[].concat(h,[l]);this.$emit("pick",d)}}}}}},cs,[],!1,null,null,null);ps.options.__file="packages/date-picker/src/basic/date-table.vue";var fs=ps.exports,ms=r({mixins:[j],directives:{Clickoutside:nt},watch:{showTime:function(e){var t=this;e&&this.$nextTick(function(e){var i=t.$refs.input.$el;i&&(t.pickerWidth=i.getBoundingClientRect().width+10)})},value:function(e){"dates"===this.selectionMode&&this.value||(or(e)?this.date=new Date(e):this.date=this.getDefaultValue())},defaultValue:function(e){or(this.value)||(this.date=e?new Date(e):new Date)},timePickerVisible:function(e){var t=this;e&&this.$nextTick(function(){return t.$refs.timepicker.adjustSpinners()})},selectionMode:function(e){"month"===e?"year"===this.currentView&&"month"===this.currentView||(this.currentView="month"):"dates"===e&&(this.currentView="date")}},methods:{proxyTimePickerDataProperties:function(){var e,t=this,i=function(e){t.$refs.timepicker.value=e},n=function(e){t.$refs.timepicker.date=e},r=function(e){t.$refs.timepicker.selectableRange=e};this.$watch("value",i),this.$watch("date",n),this.$watch("selectableRange",r),e=this.timeFormat,t.$refs.timepicker.format=e,i(this.value),n(this.date),r(this.selectableRange)},handleClear:function(){this.date=this.getDefaultValue(),this.$emit("pick",null)},emit:function(e){for(var t=this,i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];if(e)if(Array.isArray(e)){var s=e.map(function(e){return t.showTime?_r(e):xr(e)});this.$emit.apply(this,["pick",s].concat(n))}else this.$emit.apply(this,["pick",this.showTime?_r(e):xr(e)].concat(n));else this.$emit.apply(this,["pick",e].concat(n));this.userInputDate=null,this.userInputTime=null},showMonthPicker:function(){this.currentView="month"},showYearPicker:function(){this.currentView="year"},prevMonth:function(){this.date=Dr(this.date)},nextMonth:function(){this.date=$r(this.date)},prevYear:function(){"year"===this.currentView?this.date=Er(this.date,10):this.date=Er(this.date)},nextYear:function(){"year"===this.currentView?this.date=Tr(this.date,10):this.date=Tr(this.date)},handleShortcutClick:function(e){e.onClick&&e.onClick(this)},handleTimePick:function(e,t,i){if(or(e)){var n=this.value?yr(this.value,e.getHours(),e.getMinutes(),e.getSeconds()):wr(this.getDefaultValue(),this.defaultTime);this.date=n,this.emit(this.date,!0)}else this.emit(e,!0);i||(this.timePickerVisible=t)},handleTimePickClose:function(){this.timePickerVisible=!1},handleMonthPick:function(e){"month"===this.selectionMode?(this.date=br(this.date,this.year,e,1),this.emit(this.date)):(this.date=Sr(this.date,this.year,e),this.currentView="date")},handleDatePick:function(e){if("day"===this.selectionMode){var t=this.value?br(this.value,e.getFullYear(),e.getMonth(),e.getDate()):wr(e,this.defaultTime);this.checkDateWithinRange(t)||(t=br(this.selectableRange[0][0],e.getFullYear(),e.getMonth(),e.getDate())),this.date=t,this.emit(this.date,this.showTime)}else"week"===this.selectionMode?this.emit(e.date):"dates"===this.selectionMode&&this.emit(e,!0)},handleYearPick:function(e){"year"===this.selectionMode?(this.date=br(this.date,e,0,1),this.emit(this.date)):(this.date=Sr(this.date,e,this.month),this.currentView="month")},changeToNow:function(){this.disabledDate&&this.disabledDate(new Date)||!this.checkDateWithinRange(new Date)||(this.date=new Date,this.emit(this.date))},confirm:function(){if("dates"===this.selectionMode)this.emit(this.value);else{var e=this.value?this.value:wr(this.getDefaultValue(),this.defaultTime);this.date=new Date(e),this.emit(e)}},resetView:function(){"month"===this.selectionMode?this.currentView="month":"year"===this.selectionMode?this.currentView="year":this.currentView="date"},handleEnter:function(){document.body.addEventListener("keydown",this.handleKeydown)},handleLeave:function(){this.$emit("dodestroy"),document.body.removeEventListener("keydown",this.handleKeydown)},handleKeydown:function(e){var t=e.keyCode;this.visible&&!this.timePickerVisible&&(-1!==[38,40,37,39].indexOf(t)&&(this.handleKeyControl(t),e.stopPropagation(),e.preventDefault()),13===t&&null===this.userInputDate&&null===this.userInputTime&&this.emit(this.date,!1))},handleKeyControl:function(e){for(var t={year:{38:-4,40:4,37:-1,39:1,offset:function(e,t){return e.setFullYear(e.getFullYear()+t)}},month:{38:-4,40:4,37:-1,39:1,offset:function(e,t){return e.setMonth(e.getMonth()+t)}},week:{38:-1,40:1,37:-1,39:1,offset:function(e,t){return e.setDate(e.getDate()+7*t)}},day:{38:-7,40:7,37:-1,39:1,offset:function(e,t){return e.setDate(e.getDate()+t)}}},i=this.selectionMode,n=this.date.getTime(),r=new Date(this.date.getTime());Math.abs(n-r.getTime())<=31536e6;){var s=t[i];if(s.offset(r,s[e]),"function"!=typeof this.disabledDate||!this.disabledDate(r)){this.date=r,this.$emit("pick",r,!0);break}}},handleVisibleTimeChange:function(e){var t=cr(e,this.timeFormat);t&&this.checkDateWithinRange(t)&&(this.date=br(t,this.year,this.month,this.monthDate),this.userInputTime=null,this.$refs.timepicker.value=this.date,this.timePickerVisible=!1,this.emit(this.date,!0))},handleVisibleDateChange:function(e){var t=cr(e,this.dateFormat);if(t){if("function"==typeof this.disabledDate&&this.disabledDate(t))return;this.date=yr(t,this.date.getHours(),this.date.getMinutes(),this.date.getSeconds()),this.userInputDate=null,this.resetView(),this.emit(this.date,!0)}},isValidValue:function(e){return e&&!isNaN(e)&&("function"!=typeof this.disabledDate||!this.disabledDate(e))&&this.checkDateWithinRange(e)},getDefaultValue:function(){return this.defaultValue?new Date(this.defaultValue):new Date},checkDateWithinRange:function(e){return!(this.selectableRange.length>0)||kr(e,this.selectableRange,this.format||"HH:mm:ss")}},components:{TimePicker:ts,YearTable:rs,MonthTable:us,DateTable:fs,ElInput:ee,ElButton:Dt},data:function(){return{popperClass:"",date:new Date,value:"",defaultValue:null,defaultTime:null,showTime:!1,selectionMode:"day",shortcuts:"",visible:!1,currentView:"date",disabledDate:"",selectableRange:[],firstDayOfWeek:7,showWeekNumber:!1,timePickerVisible:!1,format:"",arrowControl:!1,userInputDate:null,userInputTime:null}},computed:{year:function(){return this.date.getFullYear()},month:function(){return this.date.getMonth()},week:function(){return mr(this.date)},monthDate:function(){return this.date.getDate()},footerVisible:function(){return this.showTime||"dates"===this.selectionMode},visibleTime:function(){return null!==this.userInputTime?this.userInputTime:ur(this.value||this.defaultValue,this.timeFormat)},visibleDate:function(){return null!==this.userInputDate?this.userInputDate:ur(this.value||this.defaultValue,this.dateFormat)},yearLabel:function(){var e=this.t("el.datepicker.year");if("year"===this.currentView){var t=10*Math.floor(this.year/10);return e?t+" "+e+" - "+(t+9)+" "+e:t+" - "+(t+9)}return this.year+" "+e},timeFormat:function(){return this.format?Pr(this.format):"HH:mm:ss"},dateFormat:function(){return this.format?Mr(this.format):"yyyy-MM-dd"}}},Ur,[],!1,null,null,null);ms.options.__file="packages/date-picker/src/panel/date.vue";var vs=ms.exports,gs=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":function(t){e.$emit("dodestroy")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-picker-panel el-date-range-picker el-popper",class:[{"has-sidebar":e.$slots.sidebar||e.shortcuts,"has-time":e.showTime},e.popperClass]},[i("div",{staticClass:"el-picker-panel__body-wrapper"},[e._t("sidebar"),e.shortcuts?i("div",{staticClass:"el-picker-panel__sidebar"},e._l(e.shortcuts,function(t,n){return i("button",{key:n,staticClass:"el-picker-panel__shortcut",attrs:{type:"button"},on:{click:function(i){e.handleShortcutClick(t)}}},[e._v(e._s(t.text))])}),0):e._e(),i("div",{staticClass:"el-picker-panel__body"},[e.showTime?i("div",{staticClass:"el-date-range-picker__time-header"},[i("span",{staticClass:"el-date-range-picker__editors-wrap"},[i("span",{staticClass:"el-date-range-picker__time-picker-wrap"},[i("el-input",{ref:"minInput",staticClass:"el-date-range-picker__editor",attrs:{size:"small",disabled:e.rangeState.selecting,placeholder:e.t("el.datepicker.startDate"),value:e.minVisibleDate},on:{input:function(t){return e.handleDateInput(t,"min")},change:function(t){return e.handleDateChange(t,"min")}}})],1),i("span",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleMinTimeClose,expression:"handleMinTimeClose"}],staticClass:"el-date-range-picker__time-picker-wrap"},[i("el-input",{staticClass:"el-date-range-picker__editor",attrs:{size:"small",disabled:e.rangeState.selecting,placeholder:e.t("el.datepicker.startTime"),value:e.minVisibleTime},on:{focus:function(t){e.minTimePickerVisible=!0},input:function(t){return e.handleTimeInput(t,"min")},change:function(t){return e.handleTimeChange(t,"min")}}}),i("time-picker",{ref:"minTimePicker",attrs:{"time-arrow-control":e.arrowControl,visible:e.minTimePickerVisible},on:{pick:e.handleMinTimePick,mounted:function(t){e.$refs.minTimePicker.format=e.timeFormat}}})],1)]),i("span",{staticClass:"el-icon-arrow-right"}),i("span",{staticClass:"el-date-range-picker__editors-wrap is-right"},[i("span",{staticClass:"el-date-range-picker__time-picker-wrap"},[i("el-input",{staticClass:"el-date-range-picker__editor",attrs:{size:"small",disabled:e.rangeState.selecting,placeholder:e.t("el.datepicker.endDate"),value:e.maxVisibleDate,readonly:!e.minDate},on:{input:function(t){return e.handleDateInput(t,"max")},change:function(t){return e.handleDateChange(t,"max")}}})],1),i("span",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.handleMaxTimeClose,expression:"handleMaxTimeClose"}],staticClass:"el-date-range-picker__time-picker-wrap"},[i("el-input",{staticClass:"el-date-range-picker__editor",attrs:{size:"small",disabled:e.rangeState.selecting,placeholder:e.t("el.datepicker.endTime"),value:e.maxVisibleTime,readonly:!e.minDate},on:{focus:function(t){e.minDate&&(e.maxTimePickerVisible=!0)},input:function(t){return e.handleTimeInput(t,"max")},change:function(t){return e.handleTimeChange(t,"max")}}}),i("time-picker",{ref:"maxTimePicker",attrs:{"time-arrow-control":e.arrowControl,visible:e.maxTimePickerVisible},on:{pick:e.handleMaxTimePick,mounted:function(t){e.$refs.maxTimePicker.format=e.timeFormat}}})],1)])]):e._e(),i("div",{staticClass:"el-picker-panel__content el-date-range-picker__content is-left"},[i("div",{staticClass:"el-date-range-picker__header"},[i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-left",attrs:{type:"button"},on:{click:e.leftPrevYear}}),i("button",{staticClass:"el-picker-panel__icon-btn el-icon-arrow-left",attrs:{type:"button"},on:{click:e.leftPrevMonth}}),e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-right",class:{"is-disabled":!e.enableYearArrow},attrs:{type:"button",disabled:!e.enableYearArrow},on:{click:e.leftNextYear}}):e._e(),e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-arrow-right",class:{"is-disabled":!e.enableMonthArrow},attrs:{type:"button",disabled:!e.enableMonthArrow},on:{click:e.leftNextMonth}}):e._e(),i("div",[e._v(e._s(e.leftLabel))])]),i("date-table",{attrs:{"selection-mode":"range",date:e.leftDate,"default-value":e.defaultValue,"min-date":e.minDate,"max-date":e.maxDate,"range-state":e.rangeState,"disabled-date":e.disabledDate,"first-day-of-week":e.firstDayOfWeek},on:{changerange:e.handleChangeRange,pick:e.handleRangePick}})],1),i("div",{staticClass:"el-picker-panel__content el-date-range-picker__content is-right"},[i("div",{staticClass:"el-date-range-picker__header"},[e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-left",class:{"is-disabled":!e.enableYearArrow},attrs:{type:"button",disabled:!e.enableYearArrow},on:{click:e.rightPrevYear}}):e._e(),e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-arrow-left",class:{"is-disabled":!e.enableMonthArrow},attrs:{type:"button",disabled:!e.enableMonthArrow},on:{click:e.rightPrevMonth}}):e._e(),i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-right",attrs:{type:"button"},on:{click:e.rightNextYear}}),i("button",{staticClass:"el-picker-panel__icon-btn el-icon-arrow-right",attrs:{type:"button"},on:{click:e.rightNextMonth}}),i("div",[e._v(e._s(e.rightLabel))])]),i("date-table",{attrs:{"selection-mode":"range",date:e.rightDate,"default-value":e.defaultValue,"min-date":e.minDate,"max-date":e.maxDate,"range-state":e.rangeState,"disabled-date":e.disabledDate,"first-day-of-week":e.firstDayOfWeek},on:{changerange:e.handleChangeRange,pick:e.handleRangePick}})],1)])],2),e.showTime?i("div",{staticClass:"el-picker-panel__footer"},[i("el-button",{staticClass:"el-picker-panel__link-btn",attrs:{size:"mini",type:"text"},on:{click:e.handleClear}},[e._v("\n        "+e._s(e.t("el.datepicker.clear"))+"\n      ")]),i("el-button",{staticClass:"el-picker-panel__link-btn",attrs:{plain:"",size:"mini",disabled:e.btnDisabled},on:{click:function(t){e.handleConfirm(!1)}}},[e._v("\n        "+e._s(e.t("el.datepicker.confirm"))+"\n      ")])],1):e._e()])])};gs._withStripped=!0;var bs=function(e){return Array.isArray(e)?[new Date(e[0]),new Date(e[1])]:e?[new Date(e),fr(new Date(e),1)]:[new Date,fr(new Date,1)]},ys=r({mixins:[j],directives:{Clickoutside:nt},computed:{btnDisabled:function(){return!(this.minDate&&this.maxDate&&!this.selecting&&this.isValidValue([this.minDate,this.maxDate]))},leftLabel:function(){return this.leftDate.getFullYear()+" "+this.t("el.datepicker.year")+" "+this.t("el.datepicker.month"+(this.leftDate.getMonth()+1))},rightLabel:function(){return this.rightDate.getFullYear()+" "+this.t("el.datepicker.year")+" "+this.t("el.datepicker.month"+(this.rightDate.getMonth()+1))},leftYear:function(){return this.leftDate.getFullYear()},leftMonth:function(){return this.leftDate.getMonth()},leftMonthDate:function(){return this.leftDate.getDate()},rightYear:function(){return this.rightDate.getFullYear()},rightMonth:function(){return this.rightDate.getMonth()},rightMonthDate:function(){return this.rightDate.getDate()},minVisibleDate:function(){return null!==this.dateUserInput.min?this.dateUserInput.min:this.minDate?ur(this.minDate,this.dateFormat):""},maxVisibleDate:function(){return null!==this.dateUserInput.max?this.dateUserInput.max:this.maxDate||this.minDate?ur(this.maxDate||this.minDate,this.dateFormat):""},minVisibleTime:function(){return null!==this.timeUserInput.min?this.timeUserInput.min:this.minDate?ur(this.minDate,this.timeFormat):""},maxVisibleTime:function(){return null!==this.timeUserInput.max?this.timeUserInput.max:this.maxDate||this.minDate?ur(this.maxDate||this.minDate,this.timeFormat):""},timeFormat:function(){return this.format?Pr(this.format):"HH:mm:ss"},dateFormat:function(){return this.format?Mr(this.format):"yyyy-MM-dd"},enableMonthArrow:function(){var e=(this.leftMonth+1)%12,t=this.leftMonth+1>=12?1:0;return this.unlinkPanels&&new Date(this.leftYear+t,e)<new Date(this.rightYear,this.rightMonth)},enableYearArrow:function(){return this.unlinkPanels&&12*this.rightYear+this.rightMonth-(12*this.leftYear+this.leftMonth+1)>=12}},data:function(){return{popperClass:"",value:[],defaultValue:null,defaultTime:null,minDate:"",maxDate:"",leftDate:new Date,rightDate:$r(new Date),rangeState:{endDate:null,selecting:!1,row:null,column:null},showTime:!1,shortcuts:"",visible:"",disabledDate:"",firstDayOfWeek:7,minTimePickerVisible:!1,maxTimePickerVisible:!1,format:"",arrowControl:!1,unlinkPanels:!1,dateUserInput:{min:null,max:null},timeUserInput:{min:null,max:null}}},watch:{minDate:function(e){var t=this;this.dateUserInput.min=null,this.timeUserInput.min=null,this.$nextTick(function(){if(t.$refs.maxTimePicker&&t.maxDate&&t.maxDate<t.minDate){t.$refs.maxTimePicker.selectableRange=[[cr(ur(t.minDate,"HH:mm:ss"),"HH:mm:ss"),cr("23:59:59","HH:mm:ss")]]}}),e&&this.$refs.minTimePicker&&(this.$refs.minTimePicker.date=e,this.$refs.minTimePicker.value=e)},maxDate:function(e){this.dateUserInput.max=null,this.timeUserInput.max=null,e&&this.$refs.maxTimePicker&&(this.$refs.maxTimePicker.date=e,this.$refs.maxTimePicker.value=e)},minTimePickerVisible:function(e){var t=this;e&&this.$nextTick(function(){t.$refs.minTimePicker.date=t.minDate,t.$refs.minTimePicker.value=t.minDate,t.$refs.minTimePicker.adjustSpinners()})},maxTimePickerVisible:function(e){var t=this;e&&this.$nextTick(function(){t.$refs.maxTimePicker.date=t.maxDate,t.$refs.maxTimePicker.value=t.maxDate,t.$refs.maxTimePicker.adjustSpinners()})},value:function(e){if(e){if(Array.isArray(e))if(this.minDate=or(e[0])?new Date(e[0]):null,this.maxDate=or(e[1])?new Date(e[1]):null,this.minDate)if(this.leftDate=this.minDate,this.unlinkPanels&&this.maxDate){var t=this.minDate.getFullYear(),i=this.minDate.getMonth(),n=this.maxDate.getFullYear(),r=this.maxDate.getMonth();this.rightDate=t===n&&i===r?$r(this.maxDate):this.maxDate}else this.rightDate=$r(this.leftDate);else this.leftDate=bs(this.defaultValue)[0],this.rightDate=$r(this.leftDate)}else this.minDate=null,this.maxDate=null},defaultValue:function(e){if(!Array.isArray(this.value)){var t=bs(e),i=t[0],n=t[1];this.leftDate=i,this.rightDate=e&&e[1]&&this.unlinkPanels?n:$r(this.leftDate)}}},methods:{handleClear:function(){this.minDate=null,this.maxDate=null,this.leftDate=bs(this.defaultValue)[0],this.rightDate=$r(this.leftDate),this.$emit("pick",null)},handleChangeRange:function(e){this.minDate=e.minDate,this.maxDate=e.maxDate,this.rangeState=e.rangeState},handleDateInput:function(e,t){if(this.dateUserInput[t]=e,e.length===this.dateFormat.length){var i=cr(e,this.dateFormat);if(i){if("function"==typeof this.disabledDate&&this.disabledDate(new Date(i)))return;"min"===t?(this.minDate=br(this.minDate||new Date,i.getFullYear(),i.getMonth(),i.getDate()),this.leftDate=new Date(i),this.unlinkPanels||(this.rightDate=$r(this.leftDate))):(this.maxDate=br(this.maxDate||new Date,i.getFullYear(),i.getMonth(),i.getDate()),this.rightDate=new Date(i),this.unlinkPanels||(this.leftDate=Dr(i)))}}},handleDateChange:function(e,t){var i=cr(e,this.dateFormat);i&&("min"===t?(this.minDate=br(this.minDate,i.getFullYear(),i.getMonth(),i.getDate()),this.minDate>this.maxDate&&(this.maxDate=this.minDate)):(this.maxDate=br(this.maxDate,i.getFullYear(),i.getMonth(),i.getDate()),this.maxDate<this.minDate&&(this.minDate=this.maxDate)))},handleTimeInput:function(e,t){var i=this;if(this.timeUserInput[t]=e,e.length===this.timeFormat.length){var n=cr(e,this.timeFormat);n&&("min"===t?(this.minDate=yr(this.minDate,n.getHours(),n.getMinutes(),n.getSeconds()),this.$nextTick(function(e){return i.$refs.minTimePicker.adjustSpinners()})):(this.maxDate=yr(this.maxDate,n.getHours(),n.getMinutes(),n.getSeconds()),this.$nextTick(function(e){return i.$refs.maxTimePicker.adjustSpinners()})))}},handleTimeChange:function(e,t){var i=cr(e,this.timeFormat);i&&("min"===t?(this.minDate=yr(this.minDate,i.getHours(),i.getMinutes(),i.getSeconds()),this.minDate>this.maxDate&&(this.maxDate=this.minDate),this.$refs.minTimePicker.value=this.minDate,this.minTimePickerVisible=!1):(this.maxDate=yr(this.maxDate,i.getHours(),i.getMinutes(),i.getSeconds()),this.maxDate<this.minDate&&(this.minDate=this.maxDate),this.$refs.maxTimePicker.value=this.minDate,this.maxTimePickerVisible=!1))},handleRangePick:function(e){var t=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.defaultTime||[],r=wr(e.minDate,n[0]),s=wr(e.maxDate,n[1]);this.maxDate===s&&this.minDate===r||(this.onPick&&this.onPick(e),this.maxDate=s,this.minDate=r,setTimeout(function(){t.maxDate=s,t.minDate=r},10),i&&!this.showTime&&this.handleConfirm())},handleShortcutClick:function(e){e.onClick&&e.onClick(this)},handleMinTimePick:function(e,t,i){this.minDate=this.minDate||new Date,e&&(this.minDate=yr(this.minDate,e.getHours(),e.getMinutes(),e.getSeconds())),i||(this.minTimePickerVisible=t),(!this.maxDate||this.maxDate&&this.maxDate.getTime()<this.minDate.getTime())&&(this.maxDate=new Date(this.minDate))},handleMinTimeClose:function(){this.minTimePickerVisible=!1},handleMaxTimePick:function(e,t,i){this.maxDate&&e&&(this.maxDate=yr(this.maxDate,e.getHours(),e.getMinutes(),e.getSeconds())),i||(this.maxTimePickerVisible=t),this.maxDate&&this.minDate&&this.minDate.getTime()>this.maxDate.getTime()&&(this.minDate=new Date(this.maxDate))},handleMaxTimeClose:function(){this.maxTimePickerVisible=!1},leftPrevYear:function(){this.leftDate=Er(this.leftDate),this.unlinkPanels||(this.rightDate=$r(this.leftDate))},leftPrevMonth:function(){this.leftDate=Dr(this.leftDate),this.unlinkPanels||(this.rightDate=$r(this.leftDate))},rightNextYear:function(){this.unlinkPanels?this.rightDate=Tr(this.rightDate):(this.leftDate=Tr(this.leftDate),this.rightDate=$r(this.leftDate))},rightNextMonth:function(){this.unlinkPanels?this.rightDate=$r(this.rightDate):(this.leftDate=$r(this.leftDate),this.rightDate=$r(this.leftDate))},leftNextYear:function(){this.leftDate=Tr(this.leftDate)},leftNextMonth:function(){this.leftDate=$r(this.leftDate)},rightPrevYear:function(){this.rightDate=Er(this.rightDate)},rightPrevMonth:function(){this.rightDate=Dr(this.rightDate)},handleConfirm:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isValidValue([this.minDate,this.maxDate])&&this.$emit("pick",[this.minDate,this.maxDate],e)},isValidValue:function(e){return Array.isArray(e)&&e&&e[0]&&e[1]&&or(e[0])&&or(e[1])&&e[0].getTime()<=e[1].getTime()&&("function"!=typeof this.disabledDate||!this.disabledDate(e[0])&&!this.disabledDate(e[1]))},resetView:function(){this.minDate=this.value&&or(this.value[0])?new Date(this.value[0]):null,this.maxDate=this.value&&or(this.value[0])?new Date(this.value[1]):null}},components:{TimePicker:ts,DateTable:fs,ElInput:ee,ElButton:Dt}},gs,[],!1,null,null,null);ys.options.__file="packages/date-picker/src/panel/date-range.vue";var ws=ys.exports,xs=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":function(t){e.$emit("dodestroy")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-picker-panel el-date-range-picker el-popper",class:[{"has-sidebar":e.$slots.sidebar||e.shortcuts},e.popperClass]},[i("div",{staticClass:"el-picker-panel__body-wrapper"},[e._t("sidebar"),e.shortcuts?i("div",{staticClass:"el-picker-panel__sidebar"},e._l(e.shortcuts,function(t,n){return i("button",{key:n,staticClass:"el-picker-panel__shortcut",attrs:{type:"button"},on:{click:function(i){e.handleShortcutClick(t)}}},[e._v(e._s(t.text))])}),0):e._e(),i("div",{staticClass:"el-picker-panel__body"},[i("div",{staticClass:"el-picker-panel__content el-date-range-picker__content is-left"},[i("div",{staticClass:"el-date-range-picker__header"},[i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-left",attrs:{type:"button"},on:{click:e.leftPrevYear}}),e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-right",class:{"is-disabled":!e.enableYearArrow},attrs:{type:"button",disabled:!e.enableYearArrow},on:{click:e.leftNextYear}}):e._e(),i("div",[e._v(e._s(e.leftLabel))])]),i("month-table",{attrs:{"selection-mode":"range",date:e.leftDate,"default-value":e.defaultValue,"min-date":e.minDate,"max-date":e.maxDate,"range-state":e.rangeState,"disabled-date":e.disabledDate},on:{changerange:e.handleChangeRange,pick:e.handleRangePick}})],1),i("div",{staticClass:"el-picker-panel__content el-date-range-picker__content is-right"},[i("div",{staticClass:"el-date-range-picker__header"},[e.unlinkPanels?i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-left",class:{"is-disabled":!e.enableYearArrow},attrs:{type:"button",disabled:!e.enableYearArrow},on:{click:e.rightPrevYear}}):e._e(),i("button",{staticClass:"el-picker-panel__icon-btn el-icon-d-arrow-right",attrs:{type:"button"},on:{click:e.rightNextYear}}),i("div",[e._v(e._s(e.rightLabel))])]),i("month-table",{attrs:{"selection-mode":"range",date:e.rightDate,"default-value":e.defaultValue,"min-date":e.minDate,"max-date":e.maxDate,"range-state":e.rangeState,"disabled-date":e.disabledDate},on:{changerange:e.handleChangeRange,pick:e.handleRangePick}})],1)])],2)])])};xs._withStripped=!0;var _s=function(e){return Array.isArray(e)?[new Date(e[0]),new Date(e[1])]:e?[new Date(e),$r(new Date(e))]:[new Date,$r(new Date)]},Cs=r({mixins:[j],directives:{Clickoutside:nt},computed:{btnDisabled:function(){return!(this.minDate&&this.maxDate&&!this.selecting&&this.isValidValue([this.minDate,this.maxDate]))},leftLabel:function(){return this.leftDate.getFullYear()+" "+this.t("el.datepicker.year")},rightLabel:function(){return this.rightDate.getFullYear()+" "+this.t("el.datepicker.year")},leftYear:function(){return this.leftDate.getFullYear()},rightYear:function(){return this.rightDate.getFullYear()===this.leftDate.getFullYear()?this.leftDate.getFullYear()+1:this.rightDate.getFullYear()},enableYearArrow:function(){return this.unlinkPanels&&this.rightYear>this.leftYear+1}},data:function(){return{popperClass:"",value:[],defaultValue:null,defaultTime:null,minDate:"",maxDate:"",leftDate:new Date,rightDate:Tr(new Date),rangeState:{endDate:null,selecting:!1,row:null,column:null},shortcuts:"",visible:"",disabledDate:"",format:"",arrowControl:!1,unlinkPanels:!1}},watch:{value:function(e){if(e){if(Array.isArray(e))if(this.minDate=or(e[0])?new Date(e[0]):null,this.maxDate=or(e[1])?new Date(e[1]):null,this.minDate)if(this.leftDate=this.minDate,this.unlinkPanels&&this.maxDate){var t=this.minDate.getFullYear(),i=this.maxDate.getFullYear();this.rightDate=t===i?Tr(this.maxDate):this.maxDate}else this.rightDate=Tr(this.leftDate);else this.leftDate=_s(this.defaultValue)[0],this.rightDate=Tr(this.leftDate)}else this.minDate=null,this.maxDate=null},defaultValue:function(e){if(!Array.isArray(this.value)){var t=_s(e),i=t[0],n=t[1];this.leftDate=i,this.rightDate=e&&e[1]&&i.getFullYear()!==n.getFullYear()&&this.unlinkPanels?n:Tr(this.leftDate)}}},methods:{handleClear:function(){this.minDate=null,this.maxDate=null,this.leftDate=_s(this.defaultValue)[0],this.rightDate=Tr(this.leftDate),this.$emit("pick",null)},handleChangeRange:function(e){this.minDate=e.minDate,this.maxDate=e.maxDate,this.rangeState=e.rangeState},handleRangePick:function(e){var t=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.defaultTime||[],r=wr(e.minDate,n[0]),s=wr(e.maxDate,n[1]);this.maxDate===s&&this.minDate===r||(this.onPick&&this.onPick(e),this.maxDate=s,this.minDate=r,setTimeout(function(){t.maxDate=s,t.minDate=r},10),i&&this.handleConfirm())},handleShortcutClick:function(e){e.onClick&&e.onClick(this)},leftPrevYear:function(){this.leftDate=Er(this.leftDate),this.unlinkPanels||(this.rightDate=Er(this.rightDate))},rightNextYear:function(){this.unlinkPanels||(this.leftDate=Tr(this.leftDate)),this.rightDate=Tr(this.rightDate)},leftNextYear:function(){this.leftDate=Tr(this.leftDate)},rightPrevYear:function(){this.rightDate=Er(this.rightDate)},handleConfirm:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isValidValue([this.minDate,this.maxDate])&&this.$emit("pick",[this.minDate,this.maxDate],e)},isValidValue:function(e){return Array.isArray(e)&&e&&e[0]&&e[1]&&or(e[0])&&or(e[1])&&e[0].getTime()<=e[1].getTime()&&("function"!=typeof this.disabledDate||!this.disabledDate(e[0])&&!this.disabledDate(e[1]))},resetView:function(){this.minDate=this.value&&or(this.value[0])?new Date(this.value[0]):null,this.maxDate=this.value&&or(this.value[0])?new Date(this.value[1]):null}},components:{MonthTable:us,ElInput:ee,ElButton:Dt}},xs,[],!1,null,null,null);Cs.options.__file="packages/date-picker/src/panel/month-range.vue";var ks=Cs.exports,Ss=function(e){return"daterange"===e||"datetimerange"===e?ws:"monthrange"===e?ks:vs},Ds={mixins:[Gr],name:"ElDatePicker",props:{type:{type:String,default:"date"},timeArrowControl:Boolean},watch:{type:function(e){this.picker?(this.unmountPicker(),this.panel=Ss(e),this.mountPicker()):this.panel=Ss(e)}},created:function(){this.panel=Ss(this.type)},install:function(e){e.component(Ds.name,Ds)}},$s=Ds,Es=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"before-enter":e.handleMenuEnter,"after-leave":function(t){e.$emit("dodestroy")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],ref:"popper",staticClass:"el-picker-panel time-select el-popper",class:e.popperClass,style:{width:e.width+"px"}},[i("el-scrollbar",{attrs:{noresize:"","wrap-class":"el-picker-panel__content"}},e._l(e.items,function(t){return i("div",{key:t.value,staticClass:"time-select-item",class:{selected:e.value===t.value,disabled:t.disabled,default:t.value===e.defaultValue},attrs:{disabled:t.disabled},on:{click:function(i){e.handleClick(t)}}},[e._v(e._s(t.value))])}),0)],1)])};Es._withStripped=!0;var Ts=function(e){var t=(e||"").split(":");return t.length>=2?{hours:parseInt(t[0],10),minutes:parseInt(t[1],10)}:null},Ms=function(e,t){var i=Ts(e),n=Ts(t),r=i.minutes+60*i.hours,s=n.minutes+60*n.hours;return r===s?0:r>s?1:-1},Ps=function(e,t){var i=Ts(e),n=Ts(t),r={hours:i.hours,minutes:i.minutes};return r.minutes+=n.minutes,r.hours+=n.hours,r.hours+=Math.floor(r.minutes/60),r.minutes=r.minutes%60,function(e){return(e.hours<10?"0"+e.hours:e.hours)+":"+(e.minutes<10?"0"+e.minutes:e.minutes)}(r)},Ns=r({components:{ElScrollbar:Ue},watch:{value:function(e){var t=this;e&&this.$nextTick(function(){return t.scrollToOption()})}},methods:{handleClick:function(e){e.disabled||this.$emit("pick",e.value)},handleClear:function(){this.$emit("pick",null)},scrollToOption:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".selected",t=this.$refs.popper.querySelector(".el-picker-panel__content");rt(t,t.querySelector(e))},handleMenuEnter:function(){var e=this,t=-1!==this.items.map(function(e){return e.value}).indexOf(this.value),i=-1!==this.items.map(function(e){return e.value}).indexOf(this.defaultValue),n=(t?".selected":i&&".default")||".time-select-item:not(.disabled)";this.$nextTick(function(){return e.scrollToOption(n)})},scrollDown:function(e){for(var t=this.items,i=t.length,n=t.length,r=t.map(function(e){return e.value}).indexOf(this.value);n--;)if(!t[r=(r+e+i)%i].disabled)return void this.$emit("pick",t[r].value,!0)},isValidValue:function(e){return-1!==this.items.filter(function(e){return!e.disabled}).map(function(e){return e.value}).indexOf(e)},handleKeydown:function(e){var t=e.keyCode;if(38===t||40===t){var i={40:1,38:-1}[t.toString()];return this.scrollDown(i),void e.stopPropagation()}}},data:function(){return{popperClass:"",start:"09:00",end:"18:00",step:"00:30",value:"",defaultValue:"",visible:!1,minTime:"",maxTime:"",width:0}},computed:{items:function(){var e=this.start,t=this.end,i=this.step,n=[];if(e&&t&&i)for(var r=e;Ms(r,t)<=0;)n.push({value:r,disabled:Ms(r,this.minTime||"-1:-1")<=0||Ms(r,this.maxTime||"100:100")>=0}),r=Ps(r,i);return n}}},Es,[],!1,null,null,null);Ns.options.__file="packages/date-picker/src/panel/time-select.vue";var Os=Ns.exports,Is={mixins:[Gr],name:"ElTimeSelect",componentName:"ElTimeSelect",props:{type:{type:String,default:"time-select"}},beforeCreate:function(){this.panel=Os},install:function(e){e.component(Is.name,Is)}},Fs=Is,As=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":function(t){e.$emit("dodestroy")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-time-range-picker el-picker-panel el-popper",class:e.popperClass},[i("div",{staticClass:"el-time-range-picker__content"},[i("div",{staticClass:"el-time-range-picker__cell"},[i("div",{staticClass:"el-time-range-picker__header"},[e._v(e._s(e.t("el.datepicker.startTime")))]),i("div",{staticClass:"el-time-range-picker__body el-time-panel__content",class:{"has-seconds":e.showSeconds,"is-arrow":e.arrowControl}},[i("time-spinner",{ref:"minSpinner",attrs:{"show-seconds":e.showSeconds,"am-pm-mode":e.amPmMode,"arrow-control":e.arrowControl,date:e.minDate},on:{change:e.handleMinChange,"select-range":e.setMinSelectionRange}})],1)]),i("div",{staticClass:"el-time-range-picker__cell"},[i("div",{staticClass:"el-time-range-picker__header"},[e._v(e._s(e.t("el.datepicker.endTime")))]),i("div",{staticClass:"el-time-range-picker__body el-time-panel__content",class:{"has-seconds":e.showSeconds,"is-arrow":e.arrowControl}},[i("time-spinner",{ref:"maxSpinner",attrs:{"show-seconds":e.showSeconds,"am-pm-mode":e.amPmMode,"arrow-control":e.arrowControl,date:e.maxDate},on:{change:e.handleMaxChange,"select-range":e.setMaxSelectionRange}})],1)])]),i("div",{staticClass:"el-time-panel__footer"},[i("button",{staticClass:"el-time-panel__btn cancel",attrs:{type:"button"},on:{click:function(t){e.handleCancel()}}},[e._v(e._s(e.t("el.datepicker.cancel")))]),i("button",{staticClass:"el-time-panel__btn confirm",attrs:{type:"button",disabled:e.btnDisabled},on:{click:function(t){e.handleConfirm()}}},[e._v(e._s(e.t("el.datepicker.confirm")))])])])])};As._withStripped=!0;var Ls=cr("00:00:00","HH:mm:ss"),Vs=cr("23:59:59","HH:mm:ss"),Bs=function(e){return br(Vs,e.getFullYear(),e.getMonth(),e.getDate())},zs=function(e,t){return new Date(Math.min(e.getTime()+t,Bs(e).getTime()))},Hs=r({mixins:[j],components:{TimeSpinner:Qr},computed:{showSeconds:function(){return-1!==(this.format||"").indexOf("ss")},offset:function(){return this.showSeconds?11:8},spinner:function(){return this.selectionRange[0]<this.offset?this.$refs.minSpinner:this.$refs.maxSpinner},btnDisabled:function(){return this.minDate.getTime()>this.maxDate.getTime()},amPmMode:function(){return-1!==(this.format||"").indexOf("A")?"A":-1!==(this.format||"").indexOf("a")?"a":""}},data:function(){return{popperClass:"",minDate:new Date,maxDate:new Date,value:[],oldValue:[new Date,new Date],defaultValue:null,format:"HH:mm:ss",visible:!1,selectionRange:[0,2],arrowControl:!1}},watch:{value:function(e){Array.isArray(e)?(this.minDate=new Date(e[0]),this.maxDate=new Date(e[1])):Array.isArray(this.defaultValue)?(this.minDate=new Date(this.defaultValue[0]),this.maxDate=new Date(this.defaultValue[1])):this.defaultValue?(this.minDate=new Date(this.defaultValue),this.maxDate=zs(new Date(this.defaultValue),36e5)):(this.minDate=new Date,this.maxDate=zs(new Date,36e5))},visible:function(e){var t=this;e&&(this.oldValue=this.value,this.$nextTick(function(){return t.$refs.minSpinner.emitSelectRange("hours")}))}},methods:{handleClear:function(){this.$emit("pick",null)},handleCancel:function(){this.$emit("pick",this.oldValue)},handleMinChange:function(e){this.minDate=_r(e),this.handleChange()},handleMaxChange:function(e){this.maxDate=_r(e),this.handleChange()},handleChange:function(){var e;this.isValidValue([this.minDate,this.maxDate])&&(this.$refs.minSpinner.selectableRange=[[(e=this.minDate,br(Ls,e.getFullYear(),e.getMonth(),e.getDate())),this.maxDate]],this.$refs.maxSpinner.selectableRange=[[this.minDate,Bs(this.maxDate)]],this.$emit("pick",[this.minDate,this.maxDate],!0))},setMinSelectionRange:function(e,t){this.$emit("select-range",e,t,"min"),this.selectionRange=[e,t]},setMaxSelectionRange:function(e,t){this.$emit("select-range",e,t,"max"),this.selectionRange=[e+this.offset,t+this.offset]},handleConfirm:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.$refs.minSpinner.selectableRange,i=this.$refs.maxSpinner.selectableRange;this.minDate=Cr(this.minDate,t,this.format),this.maxDate=Cr(this.maxDate,i,this.format),this.$emit("pick",[this.minDate,this.maxDate],e)},adjustSpinners:function(){this.$refs.minSpinner.adjustSpinners(),this.$refs.maxSpinner.adjustSpinners()},changeSelectionRange:function(e){var t=this.showSeconds?[0,3,6,11,14,17]:[0,3,8,11],i=["hours","minutes"].concat(this.showSeconds?["seconds"]:[]),n=(t.indexOf(this.selectionRange[0])+e+t.length)%t.length,r=t.length/2;n<r?this.$refs.minSpinner.emitSelectRange(i[n]):this.$refs.maxSpinner.emitSelectRange(i[n-r])},isValidValue:function(e){return Array.isArray(e)&&kr(this.minDate,this.$refs.minSpinner.selectableRange)&&kr(this.maxDate,this.$refs.maxSpinner.selectableRange)},handleKeydown:function(e){var t=e.keyCode,i={38:-1,40:1,37:-1,39:1};if(37===t||39===t){var n=i[t];return this.changeSelectionRange(n),void e.preventDefault()}if(38===t||40===t){var r=i[t];return this.spinner.scrollDown(r),void e.preventDefault()}}}},As,[],!1,null,null,null);Hs.options.__file="packages/date-picker/src/panel/time-range.vue";var Rs=Hs.exports,Ws={mixins:[Gr],name:"ElTimePicker",props:{isRange:Boolean,arrowControl:Boolean},data:function(){return{type:""}},watch:{isRange:function(e){this.picker?(this.unmountPicker(),this.type=e?"timerange":"time",this.panel=e?Rs:ts,this.mountPicker()):(this.type=e?"timerange":"time",this.panel=e?Rs:ts)}},created:function(){this.type=this.isRange?"timerange":"time",this.panel=this.isRange?Rs:ts},install:function(e){e.component(Ws.name,Ws)}},js=Ws,qs=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",[i("transition",{attrs:{name:e.transition},on:{"after-enter":e.handleAfterEnter,"after-leave":e.handleAfterLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!e.disabled&&e.showPopper,expression:"!disabled && showPopper"}],ref:"popper",staticClass:"el-popover el-popper",class:[e.popperClass,e.content&&"el-popover--plain"],style:{width:e.width+"px"},attrs:{role:"tooltip",id:e.tooltipId,"aria-hidden":e.disabled||!e.showPopper?"true":"false"}},[e.title?i("div",{staticClass:"el-popover__title",domProps:{textContent:e._s(e.title)}}):e._e(),e._t("default",[e._v(e._s(e.content))])],2)]),e._t("reference")],2)};qs._withStripped=!0;var Ys=r({name:"ElPopover",mixins:[Me],props:{trigger:{type:String,default:"click",validator:function(e){return["click","focus","hover","manual"].indexOf(e)>-1}},openDelay:{type:Number,default:0},title:String,disabled:Boolean,content:String,reference:{},popperClass:String,width:{},visibleArrow:{default:!0},arrowOffset:{type:Number,default:0},transition:{type:String,default:"fade-in-linear"},tabindex:{type:Number,default:0}},computed:{tooltipId:function(){return"el-popover-"+D()}},watch:{showPopper:function(e){this.disabled||(e?this.$emit("show"):this.$emit("hide"))}},mounted:function(){var e=this,t=this.referenceElm=this.reference||this.$refs.reference,i=this.popper||this.$refs.popper;!t&&this.$slots.reference&&this.$slots.reference[0]&&(t=this.referenceElm=this.$slots.reference[0].elm),t&&(he(t,"el-popover__reference"),t.setAttribute("aria-describedby",this.tooltipId),t.setAttribute("tabindex",this.tabindex),i.setAttribute("tabindex",0),"click"!==this.trigger&&(le(t,"focusin",function(){e.handleFocus();var i=t.__vue__;i&&"function"==typeof i.focus&&i.focus()}),le(i,"focusin",this.handleFocus),le(t,"focusout",this.handleBlur),le(i,"focusout",this.handleBlur)),le(t,"keydown",this.handleKeydown),le(t,"click",this.handleClick)),"click"===this.trigger?(le(t,"click",this.doToggle),le(document,"click",this.handleDocumentClick)):"hover"===this.trigger?(le(t,"mouseenter",this.handleMouseEnter),le(i,"mouseenter",this.handleMouseEnter),le(t,"mouseleave",this.handleMouseLeave),le(i,"mouseleave",this.handleMouseLeave)):"focus"===this.trigger&&(this.tabindex<0&&console.warn("[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key"),t.querySelector("input, textarea")?(le(t,"focusin",this.doShow),le(t,"focusout",this.doClose)):(le(t,"mousedown",this.doShow),le(t,"mouseup",this.doClose)))},beforeDestroy:function(){this.cleanup()},deactivated:function(){this.cleanup()},methods:{doToggle:function(){this.showPopper=!this.showPopper},doShow:function(){this.showPopper=!0},doClose:function(){this.showPopper=!1},handleFocus:function(){he(this.referenceElm,"focusing"),"click"!==this.trigger&&"focus"!==this.trigger||(this.showPopper=!0)},handleClick:function(){de(this.referenceElm,"focusing")},handleBlur:function(){de(this.referenceElm,"focusing"),"click"!==this.trigger&&"focus"!==this.trigger||(this.showPopper=!1)},handleMouseEnter:function(){var e=this;clearTimeout(this._timer),this.openDelay?this._timer=setTimeout(function(){e.showPopper=!0},this.openDelay):this.showPopper=!0},handleKeydown:function(e){27===e.keyCode&&"manual"!==this.trigger&&this.doClose()},handleMouseLeave:function(){var e=this;clearTimeout(this._timer),this._timer=setTimeout(function(){e.showPopper=!1},200)},handleDocumentClick:function(e){var t=this.reference||this.$refs.reference,i=this.popper||this.$refs.popper;!t&&this.$slots.reference&&this.$slots.reference[0]&&(t=this.referenceElm=this.$slots.reference[0].elm),this.$el&&t&&!this.$el.contains(e.target)&&!t.contains(e.target)&&i&&!i.contains(e.target)&&(this.showPopper=!1)},handleAfterEnter:function(){this.$emit("after-enter")},handleAfterLeave:function(){this.$emit("after-leave"),this.doDestroy()},cleanup:function(){this.openDelay&&clearTimeout(this._timer)}},destroyed:function(){var e=this.reference;ue(e,"click",this.doToggle),ue(e,"mouseup",this.doClose),ue(e,"mousedown",this.doShow),ue(e,"focusin",this.doShow),ue(e,"focusout",this.doClose),ue(e,"mousedown",this.doShow),ue(e,"mouseup",this.doClose),ue(e,"mouseleave",this.handleMouseLeave),ue(e,"mouseenter",this.handleMouseEnter),ue(document,"click",this.handleDocumentClick)}},qs,[],!1,null,null,null);Ys.options.__file="packages/popover/src/main.vue";var Ks=Ys.exports,Gs=function(e,t,i){var n=t.expression?t.value:t.arg,r=i.context.$refs[n];r&&(Array.isArray(r)?r[0].$refs.reference=e:r.$refs.reference=e)},Us={bind:function(e,t,i){Gs(e,t,i)},inserted:function(e,t,i){Gs(e,t,i)}};h.a.directive("popover",Us),Ks.install=function(e){e.directive("popover",Us),e.component(Ks.name,Ks)},Ks.directive=Us;var Xs=Ks,Js=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"msgbox-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-message-box__wrapper",attrs:{tabindex:"-1",role:"dialog","aria-modal":"true","aria-label":e.title||"dialog"},on:{click:function(t){return t.target!==t.currentTarget?null:e.handleWrapperClick(t)}}},[i("div",{staticClass:"el-message-box",class:[e.customClass,e.center&&"el-message-box--center"]},[null!==e.title?i("div",{staticClass:"el-message-box__header"},[i("div",{staticClass:"el-message-box__title"},[e.icon&&e.center?i("div",{class:["el-message-box__status",e.icon]}):e._e(),i("span",[e._v(e._s(e.title))])]),e.showClose?i("button",{staticClass:"el-message-box__headerbtn",attrs:{type:"button","aria-label":"Close"},on:{click:function(t){e.handleAction(e.distinguishCancelAndClose?"close":"cancel")},keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.handleAction(e.distinguishCancelAndClose?"close":"cancel")}}},[i("i",{staticClass:"el-message-box__close el-icon-close"})]):e._e()]):e._e(),i("div",{staticClass:"el-message-box__content"},[e.icon&&!e.center&&""!==e.message?i("div",{class:["el-message-box__status",e.icon]}):e._e(),""!==e.message?i("div",{staticClass:"el-message-box__message"},[e._t("default",[e.dangerouslyUseHTMLString?i("p",{domProps:{innerHTML:e._s(e.message)}}):i("p",[e._v(e._s(e.message))])])],2):e._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showInput,expression:"showInput"}],staticClass:"el-message-box__input"},[i("el-input",{ref:"input",attrs:{type:e.inputType,placeholder:e.inputPlaceholder},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleInputEnter(t):null}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}),i("div",{staticClass:"el-message-box__errormsg",style:{visibility:e.editorErrorMessage?"visible":"hidden"}},[e._v(e._s(e.editorErrorMessage))])],1)]),i("div",{staticClass:"el-message-box__btns"},[e.showCancelButton?i("el-button",{class:[e.cancelButtonClasses],attrs:{loading:e.cancelButtonLoading,round:e.roundButton,size:"small"},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.handleAction("cancel")}},nativeOn:{click:function(t){e.handleAction("cancel")}}},[e._v("\n          "+e._s(e.cancelButtonText||e.t("el.messagebox.cancel"))+"\n        ")]):e._e(),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.showConfirmButton,expression:"showConfirmButton"}],ref:"confirm",class:[e.confirmButtonClasses],attrs:{loading:e.confirmButtonLoading,round:e.roundButton,size:"small"},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.handleAction("confirm")}},nativeOn:{click:function(t){e.handleAction("confirm")}}},[e._v("\n          "+e._s(e.confirmButtonText||e.t("el.messagebox.confirm"))+"\n        ")])],1)])])])};Js._withStripped=!0;var Zs,Qs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ea=ea||{};ea.Dialog=function(e,t,i){var n=this;if(this.dialogNode=e,null===this.dialogNode||"dialog"!==this.dialogNode.getAttribute("role"))throw new Error("Dialog() requires a DOM element with ARIA role of dialog.");"string"==typeof t?this.focusAfterClosed=document.getElementById(t):"object"===(void 0===t?"undefined":Qs(t))?this.focusAfterClosed=t:this.focusAfterClosed=null,"string"==typeof i?this.focusFirst=document.getElementById(i):"object"===(void 0===i?"undefined":Qs(i))?this.focusFirst=i:this.focusFirst=null,this.focusFirst?this.focusFirst.focus():Wt.focusFirstDescendant(this.dialogNode),this.lastFocus=document.activeElement,Zs=function(e){n.trapFocus(e)},this.addListeners()},ea.Dialog.prototype.addListeners=function(){document.addEventListener("focus",Zs,!0)},ea.Dialog.prototype.removeListeners=function(){document.removeEventListener("focus",Zs,!0)},ea.Dialog.prototype.closeDialog=function(){var e=this;this.removeListeners(),this.focusAfterClosed&&setTimeout(function(){e.focusAfterClosed.focus()})},ea.Dialog.prototype.trapFocus=function(e){Wt.IgnoreUtilFocusChanges||(this.dialogNode.contains(e.target)?this.lastFocus=e.target:(Wt.focusFirstDescendant(this.dialogNode),this.lastFocus===document.activeElement&&Wt.focusLastDescendant(this.dialogNode),this.lastFocus=document.activeElement))};var ta=ea.Dialog,ia=void 0,na={success:"success",info:"info",warning:"warning",error:"error"},ra=r({mixins:[$e,j],props:{modal:{default:!0},lockScroll:{default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{default:!0},closeOnPressEscape:{default:!0},closeOnHashChange:{default:!0},center:{default:!1,type:Boolean},roundButton:{default:!1,type:Boolean}},components:{ElInput:ee,ElButton:Dt},computed:{icon:function(){var e=this.type;return this.iconClass||(e&&na[e]?"el-icon-"+na[e]:"")},confirmButtonClasses:function(){return"el-button--primary "+this.confirmButtonClass},cancelButtonClasses:function(){return""+this.cancelButtonClass}},methods:{getSafeClose:function(){var e=this,t=this.uid;return function(){e.$nextTick(function(){t===e.uid&&e.doClose()})}},doClose:function(){var e=this;this.visible&&(this.visible=!1,this._closing=!0,this.onClose&&this.onClose(),ia.closeDialog(),this.lockScroll&&setTimeout(this.restoreBodyStyle,200),this.opened=!1,this.doAfterClose(),setTimeout(function(){e.action&&e.callback(e.action,e)}))},handleWrapperClick:function(){this.closeOnClickModal&&this.handleAction(this.distinguishCancelAndClose?"close":"cancel")},handleInputEnter:function(){if("textarea"!==this.inputType)return this.handleAction("confirm")},handleAction:function(e){("prompt"!==this.$type||"confirm"!==e||this.validate())&&(this.action=e,"function"==typeof this.beforeClose?(this.close=this.getSafeClose(),this.beforeClose(e,this,this.close)):this.doClose())},validate:function(){if("prompt"===this.$type){var e=this.inputPattern;if(e&&!e.test(this.inputValue||""))return this.editorErrorMessage=this.inputErrorMessage||R("el.messagebox.error"),he(this.getInputElement(),"invalid"),!1;var t=this.inputValidator;if("function"==typeof t){var i=t(this.inputValue);if(!1===i)return this.editorErrorMessage=this.inputErrorMessage||R("el.messagebox.error"),he(this.getInputElement(),"invalid"),!1;if("string"==typeof i)return this.editorErrorMessage=i,he(this.getInputElement(),"invalid"),!1}}return this.editorErrorMessage="",de(this.getInputElement(),"invalid"),!0},getFirstFocus:function(){var e=this.$el.querySelector(".el-message-box__btns .el-button"),t=this.$el.querySelector(".el-message-box__btns .el-message-box__title");return e||t},getInputElement:function(){var e=this.$refs.input.$refs;return e.input||e.textarea},handleClose:function(){this.handleAction("close")}},watch:{inputValue:{immediate:!0,handler:function(e){var t=this;this.$nextTick(function(i){"prompt"===t.$type&&null!==e&&t.validate()})}},visible:function(e){var t=this;e&&(this.uid++,"alert"!==this.$type&&"confirm"!==this.$type||this.$nextTick(function(){t.$refs.confirm.$el.focus()}),this.focusAfterClosed=document.activeElement,ia=new ta(this.$el,this.focusAfterClosed,this.getFirstFocus())),"prompt"===this.$type&&(e?setTimeout(function(){t.$refs.input&&t.$refs.input.$el&&t.getInputElement().focus()},500):(this.editorErrorMessage="",de(this.getInputElement(),"invalid")))}},mounted:function(){var e=this;this.$nextTick(function(){e.closeOnHashChange&&window.addEventListener("hashchange",e.close)})},beforeDestroy:function(){this.closeOnHashChange&&window.removeEventListener("hashchange",this.close),setTimeout(function(){ia.closeDialog()})},data:function(){return{uid:1,title:void 0,message:"",type:"",iconClass:"",customClass:"",showInput:!1,inputValue:null,inputPlaceholder:"",inputType:"text",inputPattern:null,inputValidator:null,inputErrorMessage:"",showConfirmButton:!0,showCancelButton:!1,action:"",confirmButtonText:"",cancelButtonText:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonClass:"",confirmButtonDisabled:!1,cancelButtonClass:"",editorErrorMessage:null,callback:null,dangerouslyUseHTMLString:!1,focusAfterClosed:null,isOnComposition:!1,distinguishCancelAndClose:!1}}},Js,[],!1,null,null,null);ra.options.__file="packages/message-box/src/main.vue";var sa=ra.exports,aa="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function oa(e){return null!==e&&"object"===(void 0===e?"undefined":aa(e))&&_(e,"componentOptions")}var la="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ua={title:null,message:"",type:"",iconClass:"",showInput:!1,showClose:!0,modalFade:!0,lockScroll:!0,closeOnClickModal:!0,closeOnPressEscape:!0,closeOnHashChange:!0,inputValue:null,inputPlaceholder:"",inputType:"text",inputPattern:null,inputValidator:null,inputErrorMessage:"",showConfirmButton:!0,showCancelButton:!1,confirmButtonPosition:"right",confirmButtonHighlight:!1,cancelButtonHighlight:!1,confirmButtonText:"",cancelButtonText:"",confirmButtonClass:"",cancelButtonClass:"",customClass:"",beforeClose:null,dangerouslyUseHTMLString:!1,center:!1,roundButton:!1,distinguishCancelAndClose:!1},ca=h.a.extend(sa),ha=void 0,da=void 0,pa=[],fa=function(e){if(ha){var t=ha.callback;"function"==typeof t&&(da.showInput?t(da.inputValue,e):t(e)),ha.resolve&&("confirm"===e?da.showInput?ha.resolve({value:da.inputValue,action:e}):ha.resolve(e):!ha.reject||"cancel"!==e&&"close"!==e||ha.reject(e))}},ma=function e(){if(da||((da=new ca({el:document.createElement("div")})).callback=fa),da.action="",(!da.visible||da.closeTimer)&&pa.length>0){var t=(ha=pa.shift()).options;for(var i in t)t.hasOwnProperty(i)&&(da[i]=t[i]);void 0===t.callback&&(da.callback=fa);var n=da.callback;da.callback=function(t,i){n(t,i),e()},oa(da.message)?(da.$slots.default=[da.message],da.message=null):delete da.$slots.default,["modal","showClose","closeOnClickModal","closeOnPressEscape","closeOnHashChange"].forEach(function(e){void 0===da[e]&&(da[e]=!0)}),document.body.appendChild(da.$el),h.a.nextTick(function(){da.visible=!0})}},va=function e(t,i){if(!h.a.prototype.$isServer){if("string"==typeof t||oa(t)?(t={message:t},"string"==typeof arguments[1]&&(t.title=arguments[1])):t.callback&&!i&&(i=t.callback),"undefined"!=typeof Promise)return new Promise(function(n,r){pa.push({options:J({},ua,e.defaults,t),callback:i,resolve:n,reject:r}),ma()});pa.push({options:J({},ua,e.defaults,t),callback:i}),ma()}};va.setDefaults=function(e){va.defaults=e},va.alert=function(e,t,i){return"object"===(void 0===t?"undefined":la(t))?(i=t,t=""):void 0===t&&(t=""),va(J({title:t,message:e,$type:"alert",closeOnPressEscape:!1,closeOnClickModal:!1},i))},va.confirm=function(e,t,i){return"object"===(void 0===t?"undefined":la(t))?(i=t,t=""):void 0===t&&(t=""),va(J({title:t,message:e,$type:"confirm",showCancelButton:!0},i))},va.prompt=function(e,t,i){return"object"===(void 0===t?"undefined":la(t))?(i=t,t=""):void 0===t&&(t=""),va(J({title:t,message:e,showCancelButton:!0,showInput:!0,$type:"prompt"},i))},va.close=function(){da.doClose(),da.visible=!1,pa=[],ha=null};var ga=va,ba=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-breadcrumb",attrs:{"aria-label":"Breadcrumb",role:"navigation"}},[this._t("default")],2)};ba._withStripped=!0;var ya=r({name:"ElBreadcrumb",props:{separator:{type:String,default:"/"},separatorClass:{type:String,default:""}},provide:function(){return{elBreadcrumb:this}},mounted:function(){var e=this.$el.querySelectorAll(".el-breadcrumb__item");e.length&&e[e.length-1].setAttribute("aria-current","page")}},ba,[],!1,null,null,null);ya.options.__file="packages/breadcrumb/src/breadcrumb.vue";var wa=ya.exports;wa.install=function(e){e.component(wa.name,wa)};var xa=wa,_a=function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"el-breadcrumb__item"},[t("span",{ref:"link",class:["el-breadcrumb__inner",this.to?"is-link":""],attrs:{role:"link"}},[this._t("default")],2),this.separatorClass?t("i",{staticClass:"el-breadcrumb__separator",class:this.separatorClass}):t("span",{staticClass:"el-breadcrumb__separator",attrs:{role:"presentation"}},[this._v(this._s(this.separator))])])};_a._withStripped=!0;var Ca=r({name:"ElBreadcrumbItem",props:{to:{},replace:Boolean},data:function(){return{separator:"",separatorClass:""}},inject:["elBreadcrumb"],mounted:function(){var e=this;this.separator=this.elBreadcrumb.separator,this.separatorClass=this.elBreadcrumb.separatorClass;var t=this.$refs.link;t.setAttribute("role","link"),t.addEventListener("click",function(t){var i=e.to,n=e.$router;i&&n&&(e.replace?n.replace(i):n.push(i))})}},_a,[],!1,null,null,null);Ca.options.__file="packages/breadcrumb/src/breadcrumb-item.vue";var ka=Ca.exports;ka.install=function(e){e.component(ka.name,ka)};var Sa=ka,Da=function(){var e=this.$createElement;return(this._self._c||e)("form",{staticClass:"el-form",class:[this.labelPosition?"el-form--label-"+this.labelPosition:"",{"el-form--inline":this.inline}]},[this._t("default")],2)};Da._withStripped=!0;var $a=r({name:"ElForm",componentName:"ElForm",provide:function(){return{elForm:this}},props:{model:Object,rules:Object,labelPosition:String,labelWidth:String,labelSuffix:{type:String,default:""},inline:Boolean,inlineMessage:Boolean,statusIcon:Boolean,showMessage:{type:Boolean,default:!0},size:String,disabled:Boolean,validateOnRuleChange:{type:Boolean,default:!0},hideRequiredAsterisk:{type:Boolean,default:!1}},watch:{rules:function(){this.fields.forEach(function(e){e.removeValidateEvents(),e.addValidateEvents()}),this.validateOnRuleChange&&this.validate(function(){})}},computed:{autoLabelWidth:function(){if(!this.potentialLabelWidthArr.length)return 0;var e=Math.max.apply(Math,this.potentialLabelWidthArr);return e?e+"px":""}},data:function(){return{fields:[],potentialLabelWidthArr:[]}},created:function(){var e=this;this.$on("el.form.addField",function(t){t&&e.fields.push(t)}),this.$on("el.form.removeField",function(t){t.prop&&e.fields.splice(e.fields.indexOf(t),1)})},methods:{resetFields:function(){this.model?this.fields.forEach(function(e){e.resetField()}):console.warn("[Element Warn][Form]model is required for resetFields to work.")},clearValidate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];(e.length?"string"==typeof e?this.fields.filter(function(t){return e===t.prop}):this.fields.filter(function(t){return e.indexOf(t.prop)>-1}):this.fields).forEach(function(e){e.clearValidate()})},validate:function(e){var t=this;if(this.model){var i=void 0;"function"!=typeof e&&window.Promise&&(i=new window.Promise(function(t,i){e=function(e){e?t(e):i(e)}}));var n=!0,r=0;0===this.fields.length&&e&&e(!0);var s={};return this.fields.forEach(function(i){i.validate("",function(i,a){i&&(n=!1),s=J({},s,a),"function"==typeof e&&++r===t.fields.length&&e(n,s)})}),i||void 0}console.warn("[Element Warn][Form]model is required for validate to work!")},validateField:function(e,t){e=[].concat(e);var i=this.fields.filter(function(t){return-1!==e.indexOf(t.prop)});i.length?i.forEach(function(e){e.validate("",t)}):console.warn("[Element Warn]please pass correct props!")},getLabelWidthIndex:function(e){var t=this.potentialLabelWidthArr.indexOf(e);if(-1===t)throw new Error("[ElementForm]unpected width ",e);return t},registerLabelWidth:function(e,t){if(e&&t){var i=this.getLabelWidthIndex(t);this.potentialLabelWidthArr.splice(i,1,e)}else e&&this.potentialLabelWidthArr.push(e)},deregisterLabelWidth:function(e){var t=this.getLabelWidthIndex(e);this.potentialLabelWidthArr.splice(t,1)}}},Da,[],!1,null,null,null);$a.options.__file="packages/form/src/form.vue";var Ea=$a.exports;Ea.install=function(e){e.component(Ea.name,Ea)};var Ta=Ea,Ma=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-form-item",class:[{"el-form-item--feedback":e.elForm&&e.elForm.statusIcon,"is-error":"error"===e.validateState,"is-validating":"validating"===e.validateState,"is-success":"success"===e.validateState,"is-required":e.isRequired||e.required,"is-no-asterisk":e.elForm&&e.elForm.hideRequiredAsterisk},e.sizeClass?"el-form-item--"+e.sizeClass:""]},[i("label-wrap",{attrs:{"is-auto-width":e.labelStyle&&"auto"===e.labelStyle.width,"update-all":"auto"===e.form.labelWidth}},[e.label||e.$slots.label?i("label",{staticClass:"el-form-item__label",style:e.labelStyle,attrs:{for:e.labelFor}},[e._t("label",[e._v(e._s(e.label+e.form.labelSuffix))])],2):e._e()]),i("div",{staticClass:"el-form-item__content",style:e.contentStyle},[e._t("default"),i("transition",{attrs:{name:"el-zoom-in-top"}},["error"===e.validateState&&e.showMessage&&e.form.showMessage?e._t("error",[i("div",{staticClass:"el-form-item__error",class:{"el-form-item__error--inline":"boolean"==typeof e.inlineMessage?e.inlineMessage:e.elForm&&e.elForm.inlineMessage||!1}},[e._v("\n          "+e._s(e.validateMessage)+"\n        ")])],{error:e.validateMessage}):e._e()],2)],2)],1)};Ma._withStripped=!0;var Pa=i(8),Na=i.n(Pa),Oa=i(3),Ia=i.n(Oa),Fa=/%[sdj%]/g,Aa=function(){};function La(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=1,r=t[0],s=t.length;if("function"==typeof r)return r.apply(null,t.slice(1));if("string"==typeof r){for(var a=String(r).replace(Fa,function(e){if("%%"===e)return"%";if(n>=s)return e;switch(e){case"%s":return String(t[n++]);case"%d":return Number(t[n++]);case"%j":try{return JSON.stringify(t[n++])}catch(e){return"[Circular]"}break;default:return e}}),o=t[n];n<s;o=t[++n])a+=" "+o;return a}return r}function Va(e,t){return null==e||(!("array"!==t||!Array.isArray(e)||e.length)||!(!function(e){return"string"===e||"url"===e||"hex"===e||"email"===e||"pattern"===e}(t)||"string"!=typeof e||e))}function Ba(e,t,i){var n=0,r=e.length;!function s(a){if(a&&a.length)i(a);else{var o=n;n+=1,o<r?t(e[o],s):i([])}}([])}function za(e,t,i,n){if(t.first)return Ba(function(e){var t=[];return Object.keys(e).forEach(function(i){t.push.apply(t,e[i])}),t}(e),i,n);var r=t.firstFields||[];!0===r&&(r=Object.keys(e));var s=Object.keys(e),a=s.length,o=0,l=[],u=function(e){l.push.apply(l,e),++o===a&&n(l)};s.forEach(function(t){var n=e[t];-1!==r.indexOf(t)?Ba(n,i,u):function(e,t,i){var n=[],r=0,s=e.length;function a(e){n.push.apply(n,e),++r===s&&i(n)}e.forEach(function(e){t(e,a)})}(n,i,u)})}function Ha(e){return function(t){return t&&t.message?(t.field=t.field||e.fullField,t):{message:t,field:t.field||e.fullField}}}function Ra(e,t){if(t)for(var i in t)if(t.hasOwnProperty(i)){var n=t[i];"object"===(void 0===n?"undefined":Ia()(n))&&"object"===Ia()(e[i])?e[i]=Na()({},e[i],n):e[i]=n}return e}var Wa=function(e,t,i,n,r,s){!e.required||i.hasOwnProperty(e.field)&&!Va(t,s||e.type)||n.push(La(r.messages.required,e.fullField))};var ja=function(e,t,i,n,r){(/^\s+$/.test(t)||""===t)&&n.push(La(r.messages.whitespace,e.fullField))},qa={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i"),hex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i},Ya={integer:function(e){return Ya.number(e)&&parseInt(e,10)===e},float:function(e){return Ya.number(e)&&!Ya.integer(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch(e){return!1}},date:function(e){return"function"==typeof e.getTime&&"function"==typeof e.getMonth&&"function"==typeof e.getYear},number:function(e){return!isNaN(e)&&"number"==typeof e},object:function(e){return"object"===(void 0===e?"undefined":Ia()(e))&&!Ya.array(e)},method:function(e){return"function"==typeof e},email:function(e){return"string"==typeof e&&!!e.match(qa.email)&&e.length<255},url:function(e){return"string"==typeof e&&!!e.match(qa.url)},hex:function(e){return"string"==typeof e&&!!e.match(qa.hex)}};var Ka=function(e,t,i,n,r){if(e.required&&void 0===t)Wa(e,t,i,n,r);else{var s=e.type;["integer","float","array","regexp","object","method","email","number","date","url","hex"].indexOf(s)>-1?Ya[s](t)||n.push(La(r.messages.types[s],e.fullField,e.type)):s&&(void 0===t?"undefined":Ia()(t))!==e.type&&n.push(La(r.messages.types[s],e.fullField,e.type))}};var Ga="enum";var Ua={required:Wa,whitespace:ja,type:Ka,range:function(e,t,i,n,r){var s="number"==typeof e.len,a="number"==typeof e.min,o="number"==typeof e.max,l=t,u=null,c="number"==typeof t,h="string"==typeof t,d=Array.isArray(t);if(c?u="number":h?u="string":d&&(u="array"),!u)return!1;d&&(l=t.length),h&&(l=t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"_").length),s?l!==e.len&&n.push(La(r.messages[u].len,e.fullField,e.len)):a&&!o&&l<e.min?n.push(La(r.messages[u].min,e.fullField,e.min)):o&&!a&&l>e.max?n.push(La(r.messages[u].max,e.fullField,e.max)):a&&o&&(l<e.min||l>e.max)&&n.push(La(r.messages[u].range,e.fullField,e.min,e.max))},enum:function(e,t,i,n,r){e[Ga]=Array.isArray(e[Ga])?e[Ga]:[],-1===e[Ga].indexOf(t)&&n.push(La(r.messages[Ga],e.fullField,e[Ga].join(", ")))},pattern:function(e,t,i,n,r){e.pattern&&(e.pattern instanceof RegExp?(e.pattern.lastIndex=0,e.pattern.test(t)||n.push(La(r.messages.pattern.mismatch,e.fullField,t,e.pattern))):"string"==typeof e.pattern&&(new RegExp(e.pattern).test(t)||n.push(La(r.messages.pattern.mismatch,e.fullField,t,e.pattern))))}};var Xa="enum";var Ja=function(e,t,i,n,r){var s=e.type,a=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t,s)&&!e.required)return i();Ua.required(e,t,n,a,r,s),Va(t,s)||Ua.type(e,t,n,a,r)}i(a)},Za={string:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t,"string")&&!e.required)return i();Ua.required(e,t,n,s,r,"string"),Va(t,"string")||(Ua.type(e,t,n,s,r),Ua.range(e,t,n,s,r),Ua.pattern(e,t,n,s,r),!0===e.whitespace&&Ua.whitespace(e,t,n,s,r))}i(s)},method:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&Ua.type(e,t,n,s,r)}i(s)},number:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&(Ua.type(e,t,n,s,r),Ua.range(e,t,n,s,r))}i(s)},boolean:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&Ua.type(e,t,n,s,r)}i(s)},regexp:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),Va(t)||Ua.type(e,t,n,s,r)}i(s)},integer:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&(Ua.type(e,t,n,s,r),Ua.range(e,t,n,s,r))}i(s)},float:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&(Ua.type(e,t,n,s,r),Ua.range(e,t,n,s,r))}i(s)},array:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t,"array")&&!e.required)return i();Ua.required(e,t,n,s,r,"array"),Va(t,"array")||(Ua.type(e,t,n,s,r),Ua.range(e,t,n,s,r))}i(s)},object:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),void 0!==t&&Ua.type(e,t,n,s,r)}i(s)},enum:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();Ua.required(e,t,n,s,r),t&&Ua[Xa](e,t,n,s,r)}i(s)},pattern:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t,"string")&&!e.required)return i();Ua.required(e,t,n,s,r),Va(t,"string")||Ua.pattern(e,t,n,s,r)}i(s)},date:function(e,t,i,n,r){var s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(Va(t)&&!e.required)return i();if(Ua.required(e,t,n,s,r),!Va(t)){var a=void 0;a="number"==typeof t?new Date(t):t,Ua.type(e,a,n,s,r),a&&Ua.range(e,a.getTime(),n,s,r)}}i(s)},url:Ja,hex:Ja,email:Ja,required:function(e,t,i,n,r){var s=[],a=Array.isArray(t)?"array":void 0===t?"undefined":Ia()(t);Ua.required(e,t,n,s,r,a),i(s)}};function Qa(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){var e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}var eo=Qa();function to(e){this.rules=null,this._messages=eo,this.define(e)}to.prototype={messages:function(e){return e&&(this._messages=Ra(Qa(),e)),this._messages},define:function(e){if(!e)throw new Error("Cannot configure a schema with no rules");if("object"!==(void 0===e?"undefined":Ia()(e))||Array.isArray(e))throw new Error("Rules must be an object");this.rules={};var t=void 0,i=void 0;for(t in e)e.hasOwnProperty(t)&&(i=e[t],this.rules[t]=Array.isArray(i)?i:[i])},validate:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2],r=e,s=i,a=n;if("function"==typeof s&&(a=s,s={}),this.rules&&0!==Object.keys(this.rules).length){if(s.messages){var o=this.messages();o===eo&&(o=Qa()),Ra(o,s.messages),s.messages=o}else s.messages=this.messages();var l=void 0,u=void 0,c={};(s.keys||Object.keys(this.rules)).forEach(function(i){l=t.rules[i],u=r[i],l.forEach(function(n){var s=n;"function"==typeof s.transform&&(r===e&&(r=Na()({},r)),u=r[i]=s.transform(u)),(s="function"==typeof s?{validator:s}:Na()({},s)).validator=t.getValidationMethod(s),s.field=i,s.fullField=s.fullField||i,s.type=t.getType(s),s.validator&&(c[i]=c[i]||[],c[i].push({rule:s,value:u,source:r,field:i}))})});var h={};za(c,s,function(e,t){var i=e.rule,n=!("object"!==i.type&&"array"!==i.type||"object"!==Ia()(i.fields)&&"object"!==Ia()(i.defaultField));function r(e,t){return Na()({},t,{fullField:i.fullField+"."+e})}function a(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(Array.isArray(a)||(a=[a]),a.length&&Aa("async-validator:",a),a.length&&i.message&&(a=[].concat(i.message)),a=a.map(Ha(i)),s.first&&a.length)return h[i.field]=1,t(a);if(n){if(i.required&&!e.value)return a=i.message?[].concat(i.message).map(Ha(i)):s.error?[s.error(i,La(s.messages.required,i.field))]:[],t(a);var o={};if(i.defaultField)for(var l in e.value)e.value.hasOwnProperty(l)&&(o[l]=i.defaultField);for(var u in o=Na()({},o,e.rule.fields))if(o.hasOwnProperty(u)){var c=Array.isArray(o[u])?o[u]:[o[u]];o[u]=c.map(r.bind(null,u))}var d=new to(o);d.messages(s.messages),e.rule.options&&(e.rule.options.messages=s.messages,e.rule.options.error=s.error),d.validate(e.value,e.rule.options||s,function(e){t(e&&e.length?a.concat(e):e)})}else t(a)}n=n&&(i.required||!i.required&&e.value),i.field=e.field;var o=i.validator(i,e.value,a,e.source,s);o&&o.then&&o.then(function(){return a()},function(e){return a(e)})},function(e){!function(e){var t,i=void 0,n=void 0,r=[],s={};for(i=0;i<e.length;i++)t=e[i],Array.isArray(t)?r=r.concat.apply(r,t):r.push(t);if(r.length)for(i=0;i<r.length;i++)s[n=r[i].field]=s[n]||[],s[n].push(r[i]);else r=null,s=null;a(r,s)}(e)})}else a&&a()},getType:function(e){if(void 0===e.type&&e.pattern instanceof RegExp&&(e.type="pattern"),"function"!=typeof e.validator&&e.type&&!Za.hasOwnProperty(e.type))throw new Error(La("Unknown rule type %s",e.type));return e.type||"string"},getValidationMethod:function(e){if("function"==typeof e.validator)return e.validator;var t=Object.keys(e),i=t.indexOf("message");return-1!==i&&t.splice(i,1),1===t.length&&"required"===t[0]?Za.required:Za[this.getType(e)]||!1}},to.register=function(e,t){if("function"!=typeof t)throw new Error("Cannot register a validator by type, validator is not a function");Za[e]=t},to.messages=eo;var io=to,no=r({props:{isAutoWidth:Boolean,updateAll:Boolean},inject:["elForm","elFormItem"],render:function(){var e=arguments[0],t=this.$slots.default;if(!t)return null;if(this.isAutoWidth){var i=this.elForm.autoLabelWidth,n={};if(i&&"auto"!==i){var r=parseInt(i,10)-this.computedWidth;r&&(n.marginLeft=r+"px")}return e("div",{class:"el-form-item__label-wrap",style:n},[t])}return t[0]},methods:{getLabelWidth:function(){if(this.$el&&this.$el.firstElementChild){var e=window.getComputedStyle(this.$el.firstElementChild).width;return Math.ceil(parseFloat(e))}return 0},updateLabelWidth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"update";this.$slots.default&&this.isAutoWidth&&this.$el.firstElementChild&&("update"===e?this.computedWidth=this.getLabelWidth():"remove"===e&&this.elForm.deregisterLabelWidth(this.computedWidth))}},watch:{computedWidth:function(e,t){this.updateAll&&(this.elForm.registerLabelWidth(e,t),this.elFormItem.updateComputedLabelWidth(e))}},data:function(){return{computedWidth:0}},mounted:function(){this.updateLabelWidth("update")},updated:function(){this.updateLabelWidth("update")},beforeDestroy:function(){this.updateLabelWidth("remove")}},void 0,void 0,!1,null,null,null);no.options.__file="packages/form/src/label-wrap.vue";var ro=no.exports,so=r({name:"ElFormItem",componentName:"ElFormItem",mixins:[l],provide:function(){return{elFormItem:this}},inject:["elForm"],props:{label:String,labelWidth:String,prop:String,required:{type:Boolean,default:void 0},rules:[Object,Array],error:String,validateStatus:String,for:String,inlineMessage:{type:[String,Boolean],default:""},showMessage:{type:Boolean,default:!0},size:String},components:{LabelWrap:ro},watch:{error:{immediate:!0,handler:function(e){this.validateMessage=e,this.validateState=e?"error":""}},validateStatus:function(e){this.validateState=e}},computed:{labelFor:function(){return this.for||this.prop},labelStyle:function(){var e={};if("top"===this.form.labelPosition)return e;var t=this.labelWidth||this.form.labelWidth;return t&&(e.width=t),e},contentStyle:function(){var e={},t=this.label;if("top"===this.form.labelPosition||this.form.inline)return e;if(!t&&!this.labelWidth&&this.isNested)return e;var i=this.labelWidth||this.form.labelWidth;return"auto"===i?"auto"===this.labelWidth?e.marginLeft=this.computedLabelWidth:"auto"===this.form.labelWidth&&(e.marginLeft=this.elForm.autoLabelWidth):e.marginLeft=i,e},form:function(){for(var e=this.$parent,t=e.$options.componentName;"ElForm"!==t;)"ElFormItem"===t&&(this.isNested=!0),t=(e=e.$parent).$options.componentName;return e},fieldValue:function(){var e=this.form.model;if(e&&this.prop){var t=this.prop;return-1!==t.indexOf(":")&&(t=t.replace(/:/,".")),S(e,t,!0).v}},isRequired:function(){var e=this.getRules(),t=!1;return e&&e.length&&e.every(function(e){return!e.required||(t=!0,!1)}),t},_formSize:function(){return this.elForm.size},elFormItemSize:function(){return this.size||this._formSize},sizeClass:function(){return this.elFormItemSize||(this.$ELEMENT||{}).size}},data:function(){return{validateState:"",validateMessage:"",validateDisabled:!1,validator:{},isNested:!1,computedLabelWidth:""}},methods:{validate:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x;this.validateDisabled=!1;var n=this.getFilteredRule(e);if((!n||0===n.length)&&void 0===this.required)return i(),!0;this.validateState="validating";var r={};n&&n.length>0&&n.forEach(function(e){delete e.trigger}),r[this.prop]=n;var s=new io(r),a={};a[this.prop]=this.fieldValue,s.validate(a,{firstFields:!0},function(e,n){t.validateState=e?"error":"success",t.validateMessage=e?e[0].message:"",i(t.validateMessage,n),t.elForm&&t.elForm.$emit("validate",t.prop,!e,t.validateMessage||null)})},clearValidate:function(){this.validateState="",this.validateMessage="",this.validateDisabled=!1},resetField:function(){var e=this;this.validateState="",this.validateMessage="";var t=this.form.model,i=this.fieldValue,n=this.prop;-1!==n.indexOf(":")&&(n=n.replace(/:/,"."));var r=S(t,n,!0);this.validateDisabled=!0,Array.isArray(i)?r.o[r.k]=[].concat(this.initialValue):r.o[r.k]=this.initialValue,this.$nextTick(function(){e.validateDisabled=!1}),this.broadcast("ElTimeSelect","fieldReset",this.initialValue)},getRules:function(){var e=this.form.rules,t=this.rules,i=void 0!==this.required?{required:!!this.required}:[],n=S(e,this.prop||"");return e=e?n.o[this.prop||""]||n.v:[],[].concat(t||e||[]).concat(i)},getFilteredRule:function(e){return this.getRules().filter(function(t){return!t.trigger||""===e||(Array.isArray(t.trigger)?t.trigger.indexOf(e)>-1:t.trigger===e)}).map(function(e){return J({},e)})},onFieldBlur:function(){this.validate("blur")},onFieldChange:function(){this.validateDisabled?this.validateDisabled=!1:this.validate("change")},updateComputedLabelWidth:function(e){this.computedLabelWidth=e?e+"px":""},addValidateEvents:function(){(this.getRules().length||void 0!==this.required)&&(this.$on("el.form.blur",this.onFieldBlur),this.$on("el.form.change",this.onFieldChange))},removeValidateEvents:function(){this.$off()}},mounted:function(){if(this.prop){this.dispatch("ElForm","el.form.addField",[this]);var e=this.fieldValue;Array.isArray(e)&&(e=[].concat(e)),Object.defineProperty(this,"initialValue",{value:e}),this.addValidateEvents()}},beforeDestroy:function(){this.dispatch("ElForm","el.form.removeField",[this])}},Ma,[],!1,null,null,null);so.options.__file="packages/form/src/form-item.vue";var ao=so.exports;ao.install=function(e){e.component(ao.name,ao)};var oo=ao,lo=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-tabs__active-bar",class:"is-"+this.rootTabs.tabPosition,style:this.barStyle})};lo._withStripped=!0;var uo=r({name:"TabBar",props:{tabs:Array},inject:["rootTabs"],computed:{barStyle:{get:function(){var e=this,t={},i=0,n=0,r=-1!==["top","bottom"].indexOf(this.rootTabs.tabPosition)?"width":"height",s="width"===r?"x":"y",a=function(e){return e.toLowerCase().replace(/( |^)[a-z]/g,function(e){return e.toUpperCase()})};this.tabs.every(function(t,s){var o=T(e.$parent.$refs.tabs||[],function(e){return e.id.replace("tab-","")===t.paneName});return!!o&&(t.active?(n=o["client"+a(r)],"width"===r&&e.tabs.length>1&&(n-=0===s||s===e.tabs.length-1?20:40),!1):(i+=o["client"+a(r)],!0))}),"width"===r&&0!==i&&(i+=20);var o="translate"+a(s)+"("+i+"px)";return t[r]=n+"px",t.transform=o,t.msTransform=o,t.webkitTransform=o,t}}}},lo,[],!1,null,null,null);uo.options.__file="packages/tabs/src/tab-bar.vue";var co=uo.exports;function ho(){}var po=function(e){return e.toLowerCase().replace(/( |^)[a-z]/g,function(e){return e.toUpperCase()})},fo=r({name:"TabNav",components:{TabBar:co},inject:["rootTabs"],props:{panes:Array,currentName:String,editable:Boolean,onTabClick:{type:Function,default:ho},onTabRemove:{type:Function,default:ho},type:String,stretch:Boolean},data:function(){return{scrollable:!1,navOffset:0,isFocus:!1,focusable:!0}},computed:{navStyle:function(){return{transform:"translate"+(-1!==["top","bottom"].indexOf(this.rootTabs.tabPosition)?"X":"Y")+"(-"+this.navOffset+"px)"}},sizeName:function(){return-1!==["top","bottom"].indexOf(this.rootTabs.tabPosition)?"width":"height"}},methods:{scrollPrev:function(){var e=this.$refs.navScroll["offset"+po(this.sizeName)],t=this.navOffset;if(t){var i=t>e?t-e:0;this.navOffset=i}},scrollNext:function(){var e=this.$refs.nav["offset"+po(this.sizeName)],t=this.$refs.navScroll["offset"+po(this.sizeName)],i=this.navOffset;if(!(e-i<=t)){var n=e-i>2*t?i+t:e-t;this.navOffset=n}},scrollToActiveTab:function(){if(this.scrollable){var e=this.$refs.nav,t=this.$el.querySelector(".is-active");if(t){var i=this.$refs.navScroll,n=t.getBoundingClientRect(),r=i.getBoundingClientRect(),s=e.offsetWidth-r.width,a=this.navOffset,o=a;n.left<r.left&&(o=a-(r.left-n.left)),n.right>r.right&&(o=a+n.right-r.right),o=Math.max(o,0),this.navOffset=Math.min(o,s)}}},update:function(){if(this.$refs.nav){var e=this.sizeName,t=this.$refs.nav["offset"+po(e)],i=this.$refs.navScroll["offset"+po(e)],n=this.navOffset;if(i<t){var r=this.navOffset;this.scrollable=this.scrollable||{},this.scrollable.prev=r,this.scrollable.next=r+i<t,t-r<i&&(this.navOffset=t-i)}else this.scrollable=!1,n>0&&(this.navOffset=0)}},changeTab:function(e){var t=e.keyCode,i=void 0,n=void 0,r=void 0;-1!==[37,38,39,40].indexOf(t)&&(r=e.currentTarget.querySelectorAll("[role=tab]"),n=Array.prototype.indexOf.call(r,e.target),r[i=37===t||38===t?0===n?r.length-1:n-1:n<r.length-1?n+1:0].focus(),r[i].click(),this.setFocus())},setFocus:function(){this.focusable&&(this.isFocus=!0)},removeFocus:function(){this.isFocus=!1},visibilityChangeHandler:function(){var e=this,t=document.visibilityState;"hidden"===t?this.focusable=!1:"visible"===t&&setTimeout(function(){e.focusable=!0},50)},windowBlurHandler:function(){this.focusable=!1},windowFocusHandler:function(){var e=this;setTimeout(function(){e.focusable=!0},50)}},updated:function(){this.update()},render:function(e){var t=this,i=this.type,n=this.panes,r=this.editable,s=this.stretch,a=this.onTabClick,o=this.onTabRemove,l=this.navStyle,u=this.scrollable,c=this.scrollNext,h=this.scrollPrev,d=this.changeTab,p=this.setFocus,f=this.removeFocus,m=u?[e("span",{class:["el-tabs__nav-prev",u.prev?"":"is-disabled"],on:{click:h}},[e("i",{class:"el-icon-arrow-left"})]),e("span",{class:["el-tabs__nav-next",u.next?"":"is-disabled"],on:{click:c}},[e("i",{class:"el-icon-arrow-right"})])]:null,v=this._l(n,function(i,n){var s,l=i.name||i.index||n,u=i.isClosable||r;i.index=""+n;var c=u?e("span",{class:"el-icon-close",on:{click:function(e){o(i,e)}}}):null,h=i.$slots.label||i.label,d=i.active?0:-1;return e("div",{class:(s={"el-tabs__item":!0},s["is-"+t.rootTabs.tabPosition]=!0,s["is-active"]=i.active,s["is-disabled"]=i.disabled,s["is-closable"]=u,s["is-focus"]=t.isFocus,s),attrs:{id:"tab-"+l,"aria-controls":"pane-"+l,role:"tab","aria-selected":i.active,tabindex:d},key:"tab-"+l,ref:"tabs",refInFor:!0,on:{focus:function(){p()},blur:function(){f()},click:function(e){f(),a(i,l,e)},keydown:function(e){!u||46!==e.keyCode&&8!==e.keyCode||o(i,e)}}},[h,c])});return e("div",{class:["el-tabs__nav-wrap",u?"is-scrollable":"","is-"+this.rootTabs.tabPosition]},[m,e("div",{class:["el-tabs__nav-scroll"],ref:"navScroll"},[e("div",{class:["el-tabs__nav","is-"+this.rootTabs.tabPosition,s&&-1!==["top","bottom"].indexOf(this.rootTabs.tabPosition)?"is-stretch":""],ref:"nav",style:l,attrs:{role:"tablist"},on:{keydown:d}},[i?null:e("tab-bar",{attrs:{tabs:n}}),v])])])},mounted:function(){var e=this;We(this.$el,this.update),document.addEventListener("visibilitychange",this.visibilityChangeHandler),window.addEventListener("blur",this.windowBlurHandler),window.addEventListener("focus",this.windowFocusHandler),setTimeout(function(){e.scrollToActiveTab()},0)},beforeDestroy:function(){this.$el&&this.update&&je(this.$el,this.update),document.removeEventListener("visibilitychange",this.visibilityChangeHandler),window.removeEventListener("blur",this.windowBlurHandler),window.removeEventListener("focus",this.windowFocusHandler)}},void 0,void 0,!1,null,null,null);fo.options.__file="packages/tabs/src/tab-nav.vue";var mo=r({name:"ElTabs",components:{TabNav:fo.exports},props:{type:String,activeName:String,closable:Boolean,addable:Boolean,value:{},editable:Boolean,tabPosition:{type:String,default:"top"},beforeLeave:Function,stretch:Boolean},provide:function(){return{rootTabs:this}},data:function(){return{currentName:this.value||this.activeName,panes:[]}},watch:{activeName:function(e){this.setCurrentName(e)},value:function(e){this.setCurrentName(e)},currentName:function(e){var t=this;this.$refs.nav&&this.$nextTick(function(){t.$refs.nav.$nextTick(function(e){t.$refs.nav.scrollToActiveTab()})})}},methods:{calcPaneInstances:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.$slots.default){var i=this.$slots.default.filter(function(e){return e.tag&&e.componentOptions&&"ElTabPane"===e.componentOptions.Ctor.options.name}).map(function(e){return e.componentInstance}),n=!(i.length===this.panes.length&&i.every(function(t,i){return t===e.panes[i]}));(t||n)&&(this.panes=i)}else 0!==this.panes.length&&(this.panes=[])},handleTabClick:function(e,t,i){e.disabled||(this.setCurrentName(t),this.$emit("tab-click",e,i))},handleTabRemove:function(e,t){e.disabled||(t.stopPropagation(),this.$emit("edit",e.name,"remove"),this.$emit("tab-remove",e.name))},handleTabAdd:function(){this.$emit("edit",null,"add"),this.$emit("tab-add")},setCurrentName:function(e){var t=this,i=function(){t.currentName=e,t.$emit("input",e)};if(this.currentName!==e&&this.beforeLeave){var n=this.beforeLeave(e,this.currentName);n&&n.then?n.then(function(){i(),t.$refs.nav&&t.$refs.nav.removeFocus()},function(){}):!1!==n&&i()}else i()}},render:function(e){var t,i=this.type,n=this.handleTabClick,r=this.handleTabRemove,s=this.handleTabAdd,a=this.currentName,o=this.panes,l=this.editable,u=this.addable,c=this.tabPosition,h=this.stretch,d=l||u?e("span",{class:"el-tabs__new-tab",on:{click:s,keydown:function(e){13===e.keyCode&&s()}},attrs:{tabindex:"0"}},[e("i",{class:"el-icon-plus"})]):null,p=e("div",{class:["el-tabs__header","is-"+c]},[d,e("tab-nav",{props:{currentName:a,onTabClick:n,onTabRemove:r,editable:l,type:i,panes:o,stretch:h},ref:"nav"})]),f=e("div",{class:"el-tabs__content"},[this.$slots.default]);return e("div",{class:(t={"el-tabs":!0,"el-tabs--card":"card"===i},t["el-tabs--"+c]=!0,t["el-tabs--border-card"]="border-card"===i,t)},["bottom"!==c?[p,f]:[f,p]])},created:function(){this.currentName||this.setCurrentName("0"),this.$on("tab-nav-update",this.calcPaneInstances.bind(null,!0))},mounted:function(){this.calcPaneInstances()},updated:function(){this.calcPaneInstances()}},void 0,void 0,!1,null,null,null);mo.options.__file="packages/tabs/src/tabs.vue";var vo=mo.exports;vo.install=function(e){e.component(vo.name,vo)};var go=vo,bo=function(){var e=this,t=e.$createElement,i=e._self._c||t;return!e.lazy||e.loaded||e.active?i("div",{directives:[{name:"show",rawName:"v-show",value:e.active,expression:"active"}],staticClass:"el-tab-pane",attrs:{role:"tabpanel","aria-hidden":!e.active,id:"pane-"+e.paneName,"aria-labelledby":"tab-"+e.paneName}},[e._t("default")],2):e._e()};bo._withStripped=!0;var yo=r({name:"ElTabPane",componentName:"ElTabPane",props:{label:String,labelContent:Function,name:String,closable:Boolean,disabled:Boolean,lazy:Boolean},data:function(){return{index:null,loaded:!1}},computed:{isClosable:function(){return this.closable||this.$parent.closable},active:function(){var e=this.$parent.currentName===(this.name||this.index);return e&&(this.loaded=!0),e},paneName:function(){return this.name||this.index}},updated:function(){this.$parent.$emit("tab-nav-update")}},bo,[],!1,null,null,null);yo.options.__file="packages/tabs/src/tab-pane.vue";var wo=yo.exports;wo.install=function(e){e.component(wo.name,wo)};var xo=wo,_o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-tree",class:{"el-tree--highlight-current":e.highlightCurrent,"is-dragging":!!e.dragState.draggingNode,"is-drop-not-allow":!e.dragState.allowDrop,"is-drop-inner":"inner"===e.dragState.dropType},attrs:{role:"tree"}},[e._l(e.root.childNodes,function(t){return i("el-tree-node",{key:e.getNodeKey(t),attrs:{node:t,props:e.props,"render-after-expand":e.renderAfterExpand,"show-checkbox":e.showCheckbox,"render-content":e.renderContent},on:{"node-expand":e.handleNodeExpand}})}),e.isEmpty?i("div",{staticClass:"el-tree__empty-block"},[i("span",{staticClass:"el-tree__empty-text"},[e._v(e._s(e.emptyText))])]):e._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:e.dragState.showDropIndicator,expression:"dragState.showDropIndicator"}],ref:"dropIndicator",staticClass:"el-tree__drop-indicator"})],2)};_o._withStripped=!0;var Co="$treeNodeId",ko=function(e,t){t&&!t[Co]&&Object.defineProperty(t,Co,{value:e.id,enumerable:!1,configurable:!1,writable:!1})},So=function(e,t){return e?t[e]:t[Co]},Do=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();var $o=function(e){for(var t=!0,i=!0,n=!0,r=0,s=e.length;r<s;r++){var a=e[r];(!0!==a.checked||a.indeterminate)&&(t=!1,a.disabled||(n=!1)),(!1!==a.checked||a.indeterminate)&&(i=!1)}return{all:t,none:i,allWithoutDisable:n,half:!t&&!i}},Eo=function e(t){if(0!==t.childNodes.length){var i=$o(t.childNodes),n=i.all,r=i.none,s=i.half;n?(t.checked=!0,t.indeterminate=!1):s?(t.checked=!1,t.indeterminate=!0):r&&(t.checked=!1,t.indeterminate=!1);var a=t.parent;a&&0!==a.level&&(t.store.checkStrictly||e(a))}},To=function(e,t){var i=e.store.props,n=e.data||{},r=i[t];if("function"==typeof r)return r(n,e);if("string"==typeof r)return n[r];if(void 0===r){var s=n[t];return void 0===s?"":s}},Mo=0,Po=function(){function e(t){for(var i in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=Mo++,this.text=null,this.checked=!1,this.indeterminate=!1,this.data=null,this.expanded=!1,this.parent=null,this.visible=!0,this.isCurrent=!1,t)t.hasOwnProperty(i)&&(this[i]=t[i]);this.level=0,this.loaded=!1,this.childNodes=[],this.loading=!1,this.parent&&(this.level=this.parent.level+1);var n=this.store;if(!n)throw new Error("[Node]store is required!");n.registerNode(this);var r=n.props;if(r&&void 0!==r.isLeaf){var s=To(this,"isLeaf");"boolean"==typeof s&&(this.isLeafByUser=s)}if(!0!==n.lazy&&this.data?(this.setData(this.data),n.defaultExpandAll&&(this.expanded=!0)):this.level>0&&n.lazy&&n.defaultExpandAll&&this.expand(),Array.isArray(this.data)||ko(this,this.data),this.data){var a=n.defaultExpandedKeys,o=n.key;o&&a&&-1!==a.indexOf(this.key)&&this.expand(null,n.autoExpandParent),o&&void 0!==n.currentNodeKey&&this.key===n.currentNodeKey&&(n.currentNode=this,n.currentNode.isCurrent=!0),n.lazy&&n._initDefaultCheckedNode(this),this.updateLeafState()}}return e.prototype.setData=function(e){Array.isArray(e)||ko(this,e),this.data=e,this.childNodes=[];for(var t=void 0,i=0,n=(t=0===this.level&&this.data instanceof Array?this.data:To(this,"children")||[]).length;i<n;i++)this.insertChild({data:t[i]})},e.prototype.contains=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return function i(n){for(var r=n.childNodes||[],s=!1,a=0,o=r.length;a<o;a++){var l=r[a];if(l===e||t&&i(l)){s=!0;break}}return s}(this)},e.prototype.remove=function(){var e=this.parent;e&&e.removeChild(this)},e.prototype.insertChild=function(t,i,n){if(!t)throw new Error("insertChild error: child is required.");if(!(t instanceof e)){if(!n){var r=this.getChildren(!0);-1===r.indexOf(t.data)&&(void 0===i||i<0?r.push(t.data):r.splice(i,0,t.data))}J(t,{parent:this,store:this.store}),t=new e(t)}t.level=this.level+1,void 0===i||i<0?this.childNodes.push(t):this.childNodes.splice(i,0,t),this.updateLeafState()},e.prototype.insertBefore=function(e,t){var i=void 0;t&&(i=this.childNodes.indexOf(t)),this.insertChild(e,i)},e.prototype.insertAfter=function(e,t){var i=void 0;t&&-1!==(i=this.childNodes.indexOf(t))&&(i+=1),this.insertChild(e,i)},e.prototype.removeChild=function(e){var t=this.getChildren()||[],i=t.indexOf(e.data);i>-1&&t.splice(i,1);var n=this.childNodes.indexOf(e);n>-1&&(this.store&&this.store.deregisterNode(e),e.parent=null,this.childNodes.splice(n,1)),this.updateLeafState()},e.prototype.removeChildByData=function(e){for(var t=null,i=0;i<this.childNodes.length;i++)if(this.childNodes[i].data===e){t=this.childNodes[i];break}t&&this.removeChild(t)},e.prototype.expand=function(e,t){var i=this,n=function(){if(t)for(var n=i.parent;n.level>0;)n.expanded=!0,n=n.parent;i.expanded=!0,e&&e()};this.shouldLoadData()?this.loadData(function(e){e instanceof Array&&(i.checked?i.setChecked(!0,!0):i.store.checkStrictly||Eo(i),n())}):n()},e.prototype.doCreateChildren=function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.forEach(function(e){t.insertChild(J({data:e},i),void 0,!0)})},e.prototype.collapse=function(){this.expanded=!1},e.prototype.shouldLoadData=function(){return!0===this.store.lazy&&this.store.load&&!this.loaded},e.prototype.updateLeafState=function(){if(!0!==this.store.lazy||!0===this.loaded||void 0===this.isLeafByUser){var e=this.childNodes;!this.store.lazy||!0===this.store.lazy&&!0===this.loaded?this.isLeaf=!e||0===e.length:this.isLeaf=!1}else this.isLeaf=this.isLeafByUser},e.prototype.setChecked=function(e,t,i,n){var r=this;if(this.indeterminate="half"===e,this.checked=!0===e,!this.store.checkStrictly){if(!this.shouldLoadData()||this.store.checkDescendants){var s=$o(this.childNodes),a=s.all,o=s.allWithoutDisable;this.isLeaf||a||!o||(this.checked=!1,e=!1);var l=function(){if(t){for(var i=r.childNodes,s=0,a=i.length;s<a;s++){var o=i[s];n=n||!1!==e;var l=o.disabled?o.checked:n;o.setChecked(l,t,!0,n)}var u=$o(i),c=u.half,h=u.all;h||(r.checked=h,r.indeterminate=c)}};if(this.shouldLoadData())return void this.loadData(function(){l(),Eo(r)},{checked:!1!==e});l()}var u=this.parent;u&&0!==u.level&&(i||Eo(u))}},e.prototype.getChildren=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(0===this.level)return this.data;var t=this.data;if(!t)return null;var i=this.store.props,n="children";return i&&(n=i.children||"children"),void 0===t[n]&&(t[n]=null),e&&!t[n]&&(t[n]=[]),t[n]},e.prototype.updateChildren=function(){var e=this,t=this.getChildren()||[],i=this.childNodes.map(function(e){return e.data}),n={},r=[];t.forEach(function(e,t){var s=e[Co];!!s&&E(i,function(e){return e[Co]===s})>=0?n[s]={index:t,data:e}:r.push({index:t,data:e})}),this.store.lazy||i.forEach(function(t){n[t[Co]]||e.removeChildByData(t)}),r.forEach(function(t){var i=t.index,n=t.data;e.insertChild({data:n},i)}),this.updateLeafState()},e.prototype.loadData=function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!0!==this.store.lazy||!this.store.load||this.loaded||this.loading&&!Object.keys(i).length)e&&e.call(this);else{this.loading=!0;this.store.load(this,function(n){t.loaded=!0,t.loading=!1,t.childNodes=[],t.doCreateChildren(n,i),t.updateLeafState(),e&&e.call(t,n)})}},Do(e,[{key:"label",get:function(){return To(this,"label")}},{key:"key",get:function(){var e=this.store.key;return this.data?this.data[e]:null}},{key:"disabled",get:function(){return To(this,"disabled")}},{key:"nextSibling",get:function(){var e=this.parent;if(e){var t=e.childNodes.indexOf(this);if(t>-1)return e.childNodes[t+1]}return null}},{key:"previousSibling",get:function(){var e=this.parent;if(e){var t=e.childNodes.indexOf(this);if(t>-1)return t>0?e.childNodes[t-1]:null}return null}}]),e}(),No="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var Oo=function(){function e(t){var i=this;for(var n in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentNode=null,this.currentNodeKey=null,t)t.hasOwnProperty(n)&&(this[n]=t[n]);(this.nodesMap={},this.root=new Po({data:this.data,store:this}),this.lazy&&this.load)?(0,this.load)(this.root,function(e){i.root.doCreateChildren(e),i._initDefaultCheckedNodes()}):this._initDefaultCheckedNodes()}return e.prototype.filter=function(e){var t=this.filterNodeMethod,i=this.lazy;!function n(r){var s=r.root?r.root.childNodes:r.childNodes;if(s.forEach(function(i){i.visible=t.call(i,e,i.data,i),n(i)}),!r.visible&&s.length){var a;a=!s.some(function(e){return e.visible}),r.root?r.root.visible=!1===a:r.visible=!1===a}e&&(!r.visible||r.isLeaf||i||r.expand())}(this)},e.prototype.setData=function(e){e!==this.root.data?(this.root.setData(e),this._initDefaultCheckedNodes()):this.root.updateChildren()},e.prototype.getNode=function(e){if(e instanceof Po)return e;var t="object"!==(void 0===e?"undefined":No(e))?e:So(this.key,e);return this.nodesMap[t]||null},e.prototype.insertBefore=function(e,t){var i=this.getNode(t);i.parent.insertBefore({data:e},i)},e.prototype.insertAfter=function(e,t){var i=this.getNode(t);i.parent.insertAfter({data:e},i)},e.prototype.remove=function(e){var t=this.getNode(e);t&&t.parent&&(t===this.currentNode&&(this.currentNode=null),t.parent.removeChild(t))},e.prototype.append=function(e,t){var i=t?this.getNode(t):this.root;i&&i.insertChild({data:e})},e.prototype._initDefaultCheckedNodes=function(){var e=this,t=this.defaultCheckedKeys||[],i=this.nodesMap;t.forEach(function(t){var n=i[t];n&&n.setChecked(!0,!e.checkStrictly)})},e.prototype._initDefaultCheckedNode=function(e){-1!==(this.defaultCheckedKeys||[]).indexOf(e.key)&&e.setChecked(!0,!this.checkStrictly)},e.prototype.setDefaultCheckedKey=function(e){e!==this.defaultCheckedKeys&&(this.defaultCheckedKeys=e,this._initDefaultCheckedNodes())},e.prototype.registerNode=function(e){this.key&&e&&e.data&&(void 0!==e.key&&(this.nodesMap[e.key]=e))},e.prototype.deregisterNode=function(e){var t=this;this.key&&e&&e.data&&(e.childNodes.forEach(function(e){t.deregisterNode(e)}),delete this.nodesMap[e.key])},e.prototype.getCheckedNodes=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=[];return function n(r){(r.root?r.root.childNodes:r.childNodes).forEach(function(r){(r.checked||t&&r.indeterminate)&&(!e||e&&r.isLeaf)&&i.push(r.data),n(r)})}(this),i},e.prototype.getCheckedKeys=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.getCheckedNodes(t).map(function(t){return(t||{})[e.key]})},e.prototype.getHalfCheckedNodes=function(){var e=[];return function t(i){(i.root?i.root.childNodes:i.childNodes).forEach(function(i){i.indeterminate&&e.push(i.data),t(i)})}(this),e},e.prototype.getHalfCheckedKeys=function(){var e=this;return this.getHalfCheckedNodes().map(function(t){return(t||{})[e.key]})},e.prototype._getAllNodes=function(){var e=[],t=this.nodesMap;for(var i in t)t.hasOwnProperty(i)&&e.push(t[i]);return e},e.prototype.updateChildren=function(e,t){var i=this.nodesMap[e];if(i){for(var n=i.childNodes,r=n.length-1;r>=0;r--){var s=n[r];this.remove(s.data)}for(var a=0,o=t.length;a<o;a++){var l=t[a];this.append(l,i.data)}}},e.prototype._setCheckedKeys=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments[2],n=this._getAllNodes().sort(function(e,t){return t.level-e.level}),r=Object.create(null),s=Object.keys(i);n.forEach(function(e){return e.setChecked(!1,!1)});for(var a=0,o=n.length;a<o;a++){var l=n[a],u=l.data[e].toString();if(s.indexOf(u)>-1){for(var c=l.parent;c&&c.level>0;)r[c.data[e]]=!0,c=c.parent;l.isLeaf||this.checkStrictly?l.setChecked(!0,!1):(l.setChecked(!0,!0),t&&function(){l.setChecked(!1,!1);!function e(t){t.childNodes.forEach(function(t){t.isLeaf||t.setChecked(!1,!1),e(t)})}(l)}())}else l.checked&&!r[u]&&l.setChecked(!1,!1)}},e.prototype.setCheckedNodes=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.key,n={};e.forEach(function(e){n[(e||{})[i]]=!0}),this._setCheckedKeys(i,t,n)},e.prototype.setCheckedKeys=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.defaultCheckedKeys=e;var i=this.key,n={};e.forEach(function(e){n[e]=!0}),this._setCheckedKeys(i,t,n)},e.prototype.setDefaultExpandedKeys=function(e){var t=this;e=e||[],this.defaultExpandedKeys=e,e.forEach(function(e){var i=t.getNode(e);i&&i.expand(null,t.autoExpandParent)})},e.prototype.setChecked=function(e,t,i){var n=this.getNode(e);n&&n.setChecked(!!t,i)},e.prototype.getCurrentNode=function(){return this.currentNode},e.prototype.setCurrentNode=function(e){var t=this.currentNode;t&&(t.isCurrent=!1),this.currentNode=e,this.currentNode.isCurrent=!0},e.prototype.setUserCurrentNode=function(e){var t=e[this.key],i=this.nodesMap[t];this.setCurrentNode(i)},e.prototype.setCurrentNodeKey=function(e){if(null===e)return this.currentNode.isCurrent=!1,void(this.currentNode=null);var t=this.getNode(e);t&&this.setCurrentNode(t)},e}(),Io=function(){var e=this,t=this,i=t.$createElement,n=t._self._c||i;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.node.visible,expression:"node.visible"}],ref:"node",staticClass:"el-tree-node",class:{"is-expanded":t.expanded,"is-current":t.node.isCurrent,"is-hidden":!t.node.visible,"is-focusable":!t.node.disabled,"is-checked":!t.node.disabled&&t.node.checked},attrs:{role:"treeitem",tabindex:"-1","aria-expanded":t.expanded,"aria-disabled":t.node.disabled,"aria-checked":t.node.checked,draggable:t.tree.draggable},on:{click:function(e){return e.stopPropagation(),t.handleClick(e)},contextmenu:function(t){return e.handleContextMenu(t)},dragstart:function(e){return e.stopPropagation(),t.handleDragStart(e)},dragover:function(e){return e.stopPropagation(),t.handleDragOver(e)},dragend:function(e){return e.stopPropagation(),t.handleDragEnd(e)},drop:function(e){return e.stopPropagation(),t.handleDrop(e)}}},[n("div",{staticClass:"el-tree-node__content",style:{"padding-left":(t.node.level-1)*t.tree.indent+"px"}},[n("span",{class:[{"is-leaf":t.node.isLeaf,expanded:!t.node.isLeaf&&t.expanded},"el-tree-node__expand-icon",t.tree.iconClass?t.tree.iconClass:"el-icon-caret-right"],on:{click:function(e){return e.stopPropagation(),t.handleExpandIconClick(e)}}}),t.showCheckbox?n("el-checkbox",{attrs:{indeterminate:t.node.indeterminate,disabled:!!t.node.disabled},on:{change:t.handleCheckChange},nativeOn:{click:function(e){e.stopPropagation()}},model:{value:t.node.checked,callback:function(e){t.$set(t.node,"checked",e)},expression:"node.checked"}}):t._e(),t.node.loading?n("span",{staticClass:"el-tree-node__loading-icon el-icon-loading"}):t._e(),n("node-content",{attrs:{node:t.node}})],1),n("el-collapse-transition",[!t.renderAfterExpand||t.childNodeRendered?n("div",{directives:[{name:"show",rawName:"v-show",value:t.expanded,expression:"expanded"}],staticClass:"el-tree-node__children",attrs:{role:"group","aria-expanded":t.expanded}},t._l(t.node.childNodes,function(e){return n("el-tree-node",{key:t.getNodeKey(e),attrs:{"render-content":t.renderContent,"render-after-expand":t.renderAfterExpand,"show-checkbox":t.showCheckbox,node:e},on:{"node-expand":t.handleChildNodeExpand}})}),1):t._e()])],1)};Io._withStripped=!0;var Fo=r({name:"ElTreeNode",componentName:"ElTreeNode",mixins:[l],props:{node:{default:function(){return{}}},props:{},renderContent:Function,renderAfterExpand:{type:Boolean,default:!0},showCheckbox:{type:Boolean,default:!1}},components:{ElCollapseTransition:ei,ElCheckbox:Ai,NodeContent:{props:{node:{required:!0}},render:function(e){var t=this.$parent,i=t.tree,n=this.node,r=n.data,s=n.store;return t.renderContent?t.renderContent.call(t._renderProxy,e,{_self:i.$vnode.context,node:n,data:r,store:s}):i.$scopedSlots.default?i.$scopedSlots.default({node:n,data:r}):e("span",{class:"el-tree-node__label"},[n.label])}}},data:function(){return{tree:null,expanded:!1,childNodeRendered:!1,oldChecked:null,oldIndeterminate:null}},watch:{"node.indeterminate":function(e){this.handleSelectChange(this.node.checked,e)},"node.checked":function(e){this.handleSelectChange(e,this.node.indeterminate)},"node.expanded":function(e){var t=this;this.$nextTick(function(){return t.expanded=e}),e&&(this.childNodeRendered=!0)}},methods:{getNodeKey:function(e){return So(this.tree.nodeKey,e.data)},handleSelectChange:function(e,t){this.oldChecked!==e&&this.oldIndeterminate!==t&&this.tree.$emit("check-change",this.node.data,e,t),this.oldChecked=e,this.indeterminate=t},handleClick:function(){var e=this.tree.store;e.setCurrentNode(this.node),this.tree.$emit("current-change",e.currentNode?e.currentNode.data:null,e.currentNode),this.tree.currentNode=this,this.tree.expandOnClickNode&&this.handleExpandIconClick(),this.tree.checkOnClickNode&&!this.node.disabled&&this.handleCheckChange(null,{target:{checked:!this.node.checked}}),this.tree.$emit("node-click",this.node.data,this.node,this)},handleContextMenu:function(e){this.tree._events["node-contextmenu"]&&this.tree._events["node-contextmenu"].length>0&&(e.stopPropagation(),e.preventDefault()),this.tree.$emit("node-contextmenu",e,this.node.data,this.node,this)},handleExpandIconClick:function(){this.node.isLeaf||(this.expanded?(this.tree.$emit("node-collapse",this.node.data,this.node,this),this.node.collapse()):(this.node.expand(),this.$emit("node-expand",this.node.data,this.node,this)))},handleCheckChange:function(e,t){var i=this;this.node.setChecked(t.target.checked,!this.tree.checkStrictly),this.$nextTick(function(){var e=i.tree.store;i.tree.$emit("check",i.node.data,{checkedNodes:e.getCheckedNodes(),checkedKeys:e.getCheckedKeys(),halfCheckedNodes:e.getHalfCheckedNodes(),halfCheckedKeys:e.getHalfCheckedKeys()})})},handleChildNodeExpand:function(e,t,i){this.broadcast("ElTreeNode","tree-node-expand",t),this.tree.$emit("node-expand",e,t,i)},handleDragStart:function(e){this.tree.draggable&&this.tree.$emit("tree-node-drag-start",e,this)},handleDragOver:function(e){this.tree.draggable&&(this.tree.$emit("tree-node-drag-over",e,this),e.preventDefault())},handleDrop:function(e){e.preventDefault()},handleDragEnd:function(e){this.tree.draggable&&this.tree.$emit("tree-node-drag-end",e,this)}},created:function(){var e=this,t=this.$parent;t.isTree?this.tree=t:this.tree=t.tree;var i=this.tree;i||console.warn("Can not find node's tree.");var n=(i.props||{}).children||"children";this.$watch("node.data."+n,function(){e.node.updateChildren()}),this.node.expanded&&(this.expanded=!0,this.childNodeRendered=!0),this.tree.accordion&&this.$on("tree-node-expand",function(t){e.node!==t&&e.node.collapse()})}},Io,[],!1,null,null,null);Fo.options.__file="packages/tree/src/tree-node.vue";var Ao=r({name:"ElTree",mixins:[l],components:{ElTreeNode:Fo.exports},data:function(){return{store:null,root:null,currentNode:null,treeItems:null,checkboxItems:[],dragState:{showDropIndicator:!1,draggingNode:null,dropNode:null,allowDrop:!0}}},props:{data:{type:Array},emptyText:{type:String,default:function(){return R("el.tree.emptyText")}},renderAfterExpand:{type:Boolean,default:!0},nodeKey:String,checkStrictly:Boolean,defaultExpandAll:Boolean,expandOnClickNode:{type:Boolean,default:!0},checkOnClickNode:Boolean,checkDescendants:{type:Boolean,default:!1},autoExpandParent:{type:Boolean,default:!0},defaultCheckedKeys:Array,defaultExpandedKeys:Array,currentNodeKey:[String,Number],renderContent:Function,showCheckbox:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},allowDrag:Function,allowDrop:Function,props:{default:function(){return{children:"children",label:"label",disabled:"disabled"}}},lazy:{type:Boolean,default:!1},highlightCurrent:Boolean,load:Function,filterNodeMethod:Function,accordion:Boolean,indent:{type:Number,default:18},iconClass:String},computed:{children:{set:function(e){this.data=e},get:function(){return this.data}},treeItemArray:function(){return Array.prototype.slice.call(this.treeItems)},isEmpty:function(){var e=this.root.childNodes;return!e||0===e.length||e.every(function(e){return!e.visible})}},watch:{defaultCheckedKeys:function(e){this.store.setDefaultCheckedKey(e)},defaultExpandedKeys:function(e){this.store.defaultExpandedKeys=e,this.store.setDefaultExpandedKeys(e)},data:function(e){this.store.setData(e)},checkboxItems:function(e){Array.prototype.forEach.call(e,function(e){e.setAttribute("tabindex",-1)})},checkStrictly:function(e){this.store.checkStrictly=e}},methods:{filter:function(e){if(!this.filterNodeMethod)throw new Error("[Tree] filterNodeMethod is required when filter");this.store.filter(e)},getNodeKey:function(e){return So(this.nodeKey,e.data)},getNodePath:function(e){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in getNodePath");var t=this.store.getNode(e);if(!t)return[];for(var i=[t.data],n=t.parent;n&&n!==this.root;)i.push(n.data),n=n.parent;return i.reverse()},getCheckedNodes:function(e,t){return this.store.getCheckedNodes(e,t)},getCheckedKeys:function(e){return this.store.getCheckedKeys(e)},getCurrentNode:function(){var e=this.store.getCurrentNode();return e?e.data:null},getCurrentKey:function(){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in getCurrentKey");var e=this.getCurrentNode();return e?e[this.nodeKey]:null},setCheckedNodes:function(e,t){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedNodes");this.store.setCheckedNodes(e,t)},setCheckedKeys:function(e,t){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedKeys");this.store.setCheckedKeys(e,t)},setChecked:function(e,t,i){this.store.setChecked(e,t,i)},getHalfCheckedNodes:function(){return this.store.getHalfCheckedNodes()},getHalfCheckedKeys:function(){return this.store.getHalfCheckedKeys()},setCurrentNode:function(e){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentNode");this.store.setUserCurrentNode(e)},setCurrentKey:function(e){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentKey");this.store.setCurrentNodeKey(e)},getNode:function(e){return this.store.getNode(e)},remove:function(e){this.store.remove(e)},append:function(e,t){this.store.append(e,t)},insertBefore:function(e,t){this.store.insertBefore(e,t)},insertAfter:function(e,t){this.store.insertAfter(e,t)},handleNodeExpand:function(e,t,i){this.broadcast("ElTreeNode","tree-node-expand",t),this.$emit("node-expand",e,t,i)},updateKeyChildren:function(e,t){if(!this.nodeKey)throw new Error("[Tree] nodeKey is required in updateKeyChild");this.store.updateChildren(e,t)},initTabIndex:function(){this.treeItems=this.$el.querySelectorAll(".is-focusable[role=treeitem]"),this.checkboxItems=this.$el.querySelectorAll("input[type=checkbox]");var e=this.$el.querySelectorAll(".is-checked[role=treeitem]");e.length?e[0].setAttribute("tabindex",0):this.treeItems[0]&&this.treeItems[0].setAttribute("tabindex",0)},handleKeydown:function(e){var t=e.target;if(-1!==t.className.indexOf("el-tree-node")){var i=e.keyCode;this.treeItems=this.$el.querySelectorAll(".is-focusable[role=treeitem]");var n=this.treeItemArray.indexOf(t),r=void 0;[38,40].indexOf(i)>-1&&(e.preventDefault(),r=38===i?0!==n?n-1:0:n<this.treeItemArray.length-1?n+1:0,this.treeItemArray[r].focus()),[37,39].indexOf(i)>-1&&(e.preventDefault(),t.click());var s=t.querySelector('[type="checkbox"]');[13,32].indexOf(i)>-1&&s&&(e.preventDefault(),s.click())}}},created:function(){var e=this;this.isTree=!0,this.store=new Oo({key:this.nodeKey,data:this.data,lazy:this.lazy,props:this.props,load:this.load,currentNodeKey:this.currentNodeKey,checkStrictly:this.checkStrictly,checkDescendants:this.checkDescendants,defaultCheckedKeys:this.defaultCheckedKeys,defaultExpandedKeys:this.defaultExpandedKeys,autoExpandParent:this.autoExpandParent,defaultExpandAll:this.defaultExpandAll,filterNodeMethod:this.filterNodeMethod}),this.root=this.store.root;var t=this.dragState;this.$on("tree-node-drag-start",function(i,n){if("function"==typeof e.allowDrag&&!e.allowDrag(n.node))return i.preventDefault(),!1;i.dataTransfer.effectAllowed="move";try{i.dataTransfer.setData("text/plain","")}catch(e){}t.draggingNode=n,e.$emit("node-drag-start",n.node,i)}),this.$on("tree-node-drag-over",function(i,n){var r=function(e,t){for(var i=e;i&&"BODY"!==i.tagName;){if(i.__vue__&&i.__vue__.$options.name===t)return i.__vue__;i=i.parentNode}return null}(i.target,"ElTreeNode"),s=t.dropNode;s&&s!==r&&de(s.$el,"is-drop-inner");var a=t.draggingNode;if(a&&r){var o=!0,l=!0,u=!0,c=!0;"function"==typeof e.allowDrop&&(o=e.allowDrop(a.node,r.node,"prev"),c=l=e.allowDrop(a.node,r.node,"inner"),u=e.allowDrop(a.node,r.node,"next")),i.dataTransfer.dropEffect=l?"move":"none",(o||l||u)&&s!==r&&(s&&e.$emit("node-drag-leave",a.node,s.node,i),e.$emit("node-drag-enter",a.node,r.node,i)),(o||l||u)&&(t.dropNode=r),r.node.nextSibling===a.node&&(u=!1),r.node.previousSibling===a.node&&(o=!1),r.node.contains(a.node,!1)&&(l=!1),(a.node===r.node||a.node.contains(r.node))&&(o=!1,l=!1,u=!1);var h=r.$el.getBoundingClientRect(),d=e.$el.getBoundingClientRect(),p=void 0,f=o?l?.25:u?.45:1:-1,m=u?l?.75:o?.55:0:1,v=-9999,g=i.clientY-h.top;p=g<h.height*f?"before":g>h.height*m?"after":l?"inner":"none";var b=r.$el.querySelector(".el-tree-node__expand-icon").getBoundingClientRect(),y=e.$refs.dropIndicator;"before"===p?v=b.top-d.top:"after"===p&&(v=b.bottom-d.top),y.style.top=v+"px",y.style.left=b.right-d.left+"px","inner"===p?he(r.$el,"is-drop-inner"):de(r.$el,"is-drop-inner"),t.showDropIndicator="before"===p||"after"===p,t.allowDrop=t.showDropIndicator||c,t.dropType=p,e.$emit("node-drag-over",a.node,r.node,i)}}),this.$on("tree-node-drag-end",function(i){var n=t.draggingNode,r=t.dropType,s=t.dropNode;if(i.preventDefault(),i.dataTransfer.dropEffect="move",n&&s){var a={data:n.node.data};"none"!==r&&n.node.remove(),"before"===r?s.node.parent.insertBefore(a,s.node):"after"===r?s.node.parent.insertAfter(a,s.node):"inner"===r&&s.node.insertChild(a),"none"!==r&&e.store.registerNode(a),de(s.$el,"is-drop-inner"),e.$emit("node-drag-end",n.node,s.node,r,i),"none"!==r&&e.$emit("node-drop",n.node,s.node,r,i)}n&&!s&&e.$emit("node-drag-end",n.node,null,r,i),t.showDropIndicator=!1,t.draggingNode=null,t.dropNode=null,t.allowDrop=!0})},mounted:function(){this.initTabIndex(),this.$el.addEventListener("keydown",this.handleKeydown)},updated:function(){this.treeItems=this.$el.querySelectorAll("[role=treeitem]"),this.checkboxItems=this.$el.querySelectorAll("input[type=checkbox]")}},_o,[],!1,null,null,null);Ao.options.__file="packages/tree/src/tree.vue";var Lo=Ao.exports;Lo.install=function(e){e.component(Lo.name,Lo)};var Vo=Lo,Bo=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-alert-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-alert",class:[e.typeClass,e.center?"is-center":"","is-"+e.effect],attrs:{role:"alert"}},[e.showIcon?i("i",{staticClass:"el-alert__icon",class:[e.iconClass,e.isBigIcon]}):e._e(),i("div",{staticClass:"el-alert__content"},[e.title||e.$slots.title?i("span",{staticClass:"el-alert__title",class:[e.isBoldTitle]},[e._t("title",[e._v(e._s(e.title))])],2):e._e(),e.$slots.default&&!e.description?i("p",{staticClass:"el-alert__description"},[e._t("default")],2):e._e(),e.description&&!e.$slots.default?i("p",{staticClass:"el-alert__description"},[e._v(e._s(e.description))]):e._e(),i("i",{directives:[{name:"show",rawName:"v-show",value:e.closable,expression:"closable"}],staticClass:"el-alert__closebtn",class:{"is-customed":""!==e.closeText,"el-icon-close":""===e.closeText},on:{click:function(t){e.close()}}},[e._v(e._s(e.closeText))])])])])};Bo._withStripped=!0;var zo={success:"el-icon-success",warning:"el-icon-warning",error:"el-icon-error"},Ho=r({name:"ElAlert",props:{title:{type:String,default:""},description:{type:String,default:""},type:{type:String,default:"info"},closable:{type:Boolean,default:!0},closeText:{type:String,default:""},showIcon:Boolean,center:Boolean,effect:{type:String,default:"light",validator:function(e){return-1!==["light","dark"].indexOf(e)}}},data:function(){return{visible:!0}},methods:{close:function(){this.visible=!1,this.$emit("close")}},computed:{typeClass:function(){return"el-alert--"+this.type},iconClass:function(){return zo[this.type]||"el-icon-info"},isBigIcon:function(){return this.description||this.$slots.default?"is-big":""},isBoldTitle:function(){return this.description||this.$slots.default?"is-bold":""}}},Bo,[],!1,null,null,null);Ho.options.__file="packages/alert/src/main.vue";var Ro=Ho.exports;Ro.install=function(e){e.component(Ro.name,Ro)};var Wo=Ro,jo=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-notification-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],class:["el-notification",e.customClass,e.horizontalClass],style:e.positionStyle,attrs:{role:"alert"},on:{mouseenter:function(t){e.clearTimer()},mouseleave:function(t){e.startTimer()},click:e.click}},[e.type||e.iconClass?i("i",{staticClass:"el-notification__icon",class:[e.typeClass,e.iconClass]}):e._e(),i("div",{staticClass:"el-notification__group",class:{"is-with-icon":e.typeClass||e.iconClass}},[i("h2",{staticClass:"el-notification__title",domProps:{textContent:e._s(e.title)}}),i("div",{directives:[{name:"show",rawName:"v-show",value:e.message,expression:"message"}],staticClass:"el-notification__content"},[e._t("default",[e.dangerouslyUseHTMLString?i("p",{domProps:{innerHTML:e._s(e.message)}}):i("p",[e._v(e._s(e.message))])])],2),e.showClose?i("div",{staticClass:"el-notification__closeBtn el-icon-close",on:{click:function(t){return t.stopPropagation(),e.close(t)}}}):e._e()])])])};jo._withStripped=!0;var qo={success:"success",info:"info",warning:"warning",error:"error"},Yo=r({data:function(){return{visible:!1,title:"",message:"",duration:4500,type:"",showClose:!0,customClass:"",iconClass:"",onClose:null,onClick:null,closed:!1,verticalOffset:0,timer:null,dangerouslyUseHTMLString:!1,position:"top-right"}},computed:{typeClass:function(){return this.type&&qo[this.type]?"el-icon-"+qo[this.type]:""},horizontalClass:function(){return this.position.indexOf("right")>-1?"right":"left"},verticalProperty:function(){return/^top-/.test(this.position)?"top":"bottom"},positionStyle:function(){var e;return(e={})[this.verticalProperty]=this.verticalOffset+"px",e}},watch:{closed:function(e){e&&(this.visible=!1,this.$el.addEventListener("transitionend",this.destroyElement))}},methods:{destroyElement:function(){this.$el.removeEventListener("transitionend",this.destroyElement),this.$destroy(!0),this.$el.parentNode.removeChild(this.$el)},click:function(){"function"==typeof this.onClick&&this.onClick()},close:function(){this.closed=!0,"function"==typeof this.onClose&&this.onClose()},clearTimer:function(){clearTimeout(this.timer)},startTimer:function(){var e=this;this.duration>0&&(this.timer=setTimeout(function(){e.closed||e.close()},this.duration))},keydown:function(e){46===e.keyCode||8===e.keyCode?this.clearTimer():27===e.keyCode?this.closed||this.close():this.startTimer()}},mounted:function(){var e=this;this.duration>0&&(this.timer=setTimeout(function(){e.closed||e.close()},this.duration)),document.addEventListener("keydown",this.keydown)},beforeDestroy:function(){document.removeEventListener("keydown",this.keydown)}},jo,[],!1,null,null,null);Yo.options.__file="packages/notification/src/main.vue";var Ko=Yo.exports,Go=h.a.extend(Ko),Uo=void 0,Xo=[],Jo=1,Zo=function e(t){if(!h.a.prototype.$isServer){var i=(t=t||{}).onClose,n="notification_"+Jo++,r=t.position||"top-right";t.onClose=function(){e.close(n,i)},Uo=new Go({data:t}),oa(t.message)&&(Uo.$slots.default=[t.message],t.message="REPLACED_BY_VNODE"),Uo.id=n,Uo.$mount(),document.body.appendChild(Uo.$el),Uo.visible=!0,Uo.dom=Uo.$el,Uo.dom.style.zIndex=_e.nextZIndex();var s=t.offset||0;return Xo.filter(function(e){return e.position===r}).forEach(function(e){s+=e.$el.offsetHeight+16}),s+=16,Uo.verticalOffset=s,Xo.push(Uo),Uo}};["success","warning","info","error"].forEach(function(e){Zo[e]=function(t){return("string"==typeof t||oa(t))&&(t={message:t}),t.type=e,Zo(t)}}),Zo.close=function(e,t){var i=-1,n=Xo.length,r=Xo.filter(function(t,n){return t.id===e&&(i=n,!0)})[0];if(r&&("function"==typeof t&&t(r),Xo.splice(i,1),!(n<=1)))for(var s=r.position,a=r.dom.offsetHeight,o=i;o<n-1;o++)Xo[o].position===s&&(Xo[o].dom.style[r.verticalProperty]=parseInt(Xo[o].dom.style[r.verticalProperty],10)-a-16+"px")},Zo.closeAll=function(){for(var e=Xo.length-1;e>=0;e--)Xo[e].close()};var Qo=Zo,el=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-slider",class:{"is-vertical":e.vertical,"el-slider--with-input":e.showInput},attrs:{role:"slider","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-orientation":e.vertical?"vertical":"horizontal","aria-disabled":e.sliderDisabled}},[e.showInput&&!e.range?i("el-input-number",{ref:"input",staticClass:"el-slider__input",attrs:{step:e.step,disabled:e.sliderDisabled,controls:e.showInputControls,min:e.min,max:e.max,debounce:e.debounce,size:e.inputSize},on:{change:e.emitChange},model:{value:e.firstValue,callback:function(t){e.firstValue=t},expression:"firstValue"}}):e._e(),i("div",{ref:"slider",staticClass:"el-slider__runway",class:{"show-input":e.showInput,disabled:e.sliderDisabled},style:e.runwayStyle,on:{click:e.onSliderClick}},[i("div",{staticClass:"el-slider__bar",style:e.barStyle}),i("slider-button",{ref:"button1",attrs:{vertical:e.vertical,"tooltip-class":e.tooltipClass},model:{value:e.firstValue,callback:function(t){e.firstValue=t},expression:"firstValue"}}),e.range?i("slider-button",{ref:"button2",attrs:{vertical:e.vertical,"tooltip-class":e.tooltipClass},model:{value:e.secondValue,callback:function(t){e.secondValue=t},expression:"secondValue"}}):e._e(),e._l(e.stops,function(t,n){return e.showStops?i("div",{key:n,staticClass:"el-slider__stop",style:e.getStopStyle(t)}):e._e()}),e.markList.length>0?[i("div",e._l(e.markList,function(t,n){return i("div",{key:n,staticClass:"el-slider__stop el-slider__marks-stop",style:e.getStopStyle(t.position)})}),0),i("div",{staticClass:"el-slider__marks"},e._l(e.markList,function(t,n){return i("slider-marker",{key:n,style:e.getStopStyle(t.position),attrs:{mark:t.mark}})}),1)]:e._e()],2)],1)};el._withStripped=!0;var tl=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"button",staticClass:"el-slider__button-wrapper",class:{hover:e.hovering,dragging:e.dragging},style:e.wrapperStyle,attrs:{tabindex:"0"},on:{mouseenter:e.handleMouseEnter,mouseleave:e.handleMouseLeave,mousedown:e.onButtonDown,touchstart:e.onButtonDown,focus:e.handleMouseEnter,blur:e.handleMouseLeave,keydown:[function(t){return"button"in t||!e._k(t.keyCode,"left",37,t.key,["Left","ArrowLeft"])?"button"in t&&0!==t.button?null:e.onLeftKeyDown(t):null},function(t){return"button"in t||!e._k(t.keyCode,"right",39,t.key,["Right","ArrowRight"])?"button"in t&&2!==t.button?null:e.onRightKeyDown(t):null},function(t){return"button"in t||!e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?(t.preventDefault(),e.onLeftKeyDown(t)):null},function(t){return"button"in t||!e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?(t.preventDefault(),e.onRightKeyDown(t)):null}]}},[i("el-tooltip",{ref:"tooltip",attrs:{placement:"top","popper-class":e.tooltipClass,disabled:!e.showTooltip}},[i("span",{attrs:{slot:"content"},slot:"content"},[e._v(e._s(e.formatValue))]),i("div",{staticClass:"el-slider__button",class:{hover:e.hovering,dragging:e.dragging}})])],1)};tl._withStripped=!0;var il=r({name:"ElSliderButton",components:{ElTooltip:oi},props:{value:{type:Number,default:0},vertical:{type:Boolean,default:!1},tooltipClass:String},data:function(){return{hovering:!1,dragging:!1,isClick:!1,startX:0,currentX:0,startY:0,currentY:0,startPosition:0,newPosition:null,oldValue:this.value}},computed:{disabled:function(){return this.$parent.sliderDisabled},max:function(){return this.$parent.max},min:function(){return this.$parent.min},step:function(){return this.$parent.step},showTooltip:function(){return this.$parent.showTooltip},precision:function(){return this.$parent.precision},currentPosition:function(){return(this.value-this.min)/(this.max-this.min)*100+"%"},enableFormat:function(){return this.$parent.formatTooltip instanceof Function},formatValue:function(){return this.enableFormat&&this.$parent.formatTooltip(this.value)||this.value},wrapperStyle:function(){return this.vertical?{bottom:this.currentPosition}:{left:this.currentPosition}}},watch:{dragging:function(e){this.$parent.dragging=e}},methods:{displayTooltip:function(){this.$refs.tooltip&&(this.$refs.tooltip.showPopper=!0)},hideTooltip:function(){this.$refs.tooltip&&(this.$refs.tooltip.showPopper=!1)},handleMouseEnter:function(){this.hovering=!0,this.displayTooltip()},handleMouseLeave:function(){this.hovering=!1,this.hideTooltip()},onButtonDown:function(e){this.disabled||(e.preventDefault(),this.onDragStart(e),window.addEventListener("mousemove",this.onDragging),window.addEventListener("touchmove",this.onDragging),window.addEventListener("mouseup",this.onDragEnd),window.addEventListener("touchend",this.onDragEnd),window.addEventListener("contextmenu",this.onDragEnd))},onLeftKeyDown:function(){this.disabled||(this.newPosition=parseFloat(this.currentPosition)-this.step/(this.max-this.min)*100,this.setPosition(this.newPosition),this.$parent.emitChange())},onRightKeyDown:function(){this.disabled||(this.newPosition=parseFloat(this.currentPosition)+this.step/(this.max-this.min)*100,this.setPosition(this.newPosition),this.$parent.emitChange())},onDragStart:function(e){this.dragging=!0,this.isClick=!0,"touchstart"===e.type&&(e.clientY=e.touches[0].clientY,e.clientX=e.touches[0].clientX),this.vertical?this.startY=e.clientY:this.startX=e.clientX,this.startPosition=parseFloat(this.currentPosition),this.newPosition=this.startPosition},onDragging:function(e){if(this.dragging){this.isClick=!1,this.displayTooltip(),this.$parent.resetSize();var t=0;"touchmove"===e.type&&(e.clientY=e.touches[0].clientY,e.clientX=e.touches[0].clientX),this.vertical?(this.currentY=e.clientY,t=(this.startY-this.currentY)/this.$parent.sliderSize*100):(this.currentX=e.clientX,t=(this.currentX-this.startX)/this.$parent.sliderSize*100),this.newPosition=this.startPosition+t,this.setPosition(this.newPosition)}},onDragEnd:function(){var e=this;this.dragging&&(setTimeout(function(){e.dragging=!1,e.hideTooltip(),e.isClick||(e.setPosition(e.newPosition),e.$parent.emitChange())},0),window.removeEventListener("mousemove",this.onDragging),window.removeEventListener("touchmove",this.onDragging),window.removeEventListener("mouseup",this.onDragEnd),window.removeEventListener("touchend",this.onDragEnd),window.removeEventListener("contextmenu",this.onDragEnd))},setPosition:function(e){var t=this;if(null!==e&&!isNaN(e)){e<0?e=0:e>100&&(e=100);var i=100/((this.max-this.min)/this.step),n=Math.round(e/i)*i*(this.max-this.min)*.01+this.min;n=parseFloat(n.toFixed(this.precision)),this.$emit("input",n),this.$nextTick(function(){t.displayTooltip(),t.$refs.tooltip&&t.$refs.tooltip.updatePopper()}),this.dragging||this.value===this.oldValue||(this.oldValue=this.value)}}}},tl,[],!1,null,null,null);il.options.__file="packages/slider/src/button.vue";var nl=il.exports,rl={name:"ElMarker",props:{mark:{type:[String,Object]}},render:function(){var e=arguments[0],t="string"==typeof this.mark?this.mark:this.mark.label;return e("div",{class:"el-slider__marks-text",style:this.mark.style||{}},[t])}},sl=r({name:"ElSlider",mixins:[l],inject:{elForm:{default:""}},props:{min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},value:{type:[Number,Array],default:0},showInput:{type:Boolean,default:!1},showInputControls:{type:Boolean,default:!0},inputSize:{type:String,default:"small"},showStops:{type:Boolean,default:!1},showTooltip:{type:Boolean,default:!0},formatTooltip:Function,disabled:{type:Boolean,default:!1},range:{type:Boolean,default:!1},vertical:{type:Boolean,default:!1},height:{type:String},debounce:{type:Number,default:300},label:{type:String},tooltipClass:String,marks:Object},components:{ElInputNumber:yi,SliderButton:nl,SliderMarker:rl},data:function(){return{firstValue:null,secondValue:null,oldValue:null,dragging:!1,sliderSize:1}},watch:{value:function(e,t){this.dragging||Array.isArray(e)&&Array.isArray(t)&&e.every(function(e,i){return e===t[i]})||this.setValues()},dragging:function(e){e||this.setValues()},firstValue:function(e){this.range?this.$emit("input",[this.minValue,this.maxValue]):this.$emit("input",e)},secondValue:function(){this.range&&this.$emit("input",[this.minValue,this.maxValue])},min:function(){this.setValues()},max:function(){this.setValues()}},methods:{valueChanged:function(){var e=this;return this.range?![this.minValue,this.maxValue].every(function(t,i){return t===e.oldValue[i]}):this.value!==this.oldValue},setValues:function(){if(this.min>this.max)console.error("[Element Error][Slider]min should not be greater than max.");else{var e=this.value;this.range&&Array.isArray(e)?e[1]<this.min?this.$emit("input",[this.min,this.min]):e[0]>this.max?this.$emit("input",[this.max,this.max]):e[0]<this.min?this.$emit("input",[this.min,e[1]]):e[1]>this.max?this.$emit("input",[e[0],this.max]):(this.firstValue=e[0],this.secondValue=e[1],this.valueChanged()&&(this.dispatch("ElFormItem","el.form.change",[this.minValue,this.maxValue]),this.oldValue=e.slice())):this.range||"number"!=typeof e||isNaN(e)||(e<this.min?this.$emit("input",this.min):e>this.max?this.$emit("input",this.max):(this.firstValue=e,this.valueChanged()&&(this.dispatch("ElFormItem","el.form.change",e),this.oldValue=e)))}},setPosition:function(e){var t=this.min+e*(this.max-this.min)/100;if(this.range){var i=void 0;i=Math.abs(this.minValue-t)<Math.abs(this.maxValue-t)?this.firstValue<this.secondValue?"button1":"button2":this.firstValue>this.secondValue?"button1":"button2",this.$refs[i].setPosition(e)}else this.$refs.button1.setPosition(e)},onSliderClick:function(e){if(!this.sliderDisabled&&!this.dragging){if(this.resetSize(),this.vertical){var t=this.$refs.slider.getBoundingClientRect().bottom;this.setPosition((t-e.clientY)/this.sliderSize*100)}else{var i=this.$refs.slider.getBoundingClientRect().left;this.setPosition((e.clientX-i)/this.sliderSize*100)}this.emitChange()}},resetSize:function(){this.$refs.slider&&(this.sliderSize=this.$refs.slider["client"+(this.vertical?"Height":"Width")])},emitChange:function(){var e=this;this.$nextTick(function(){e.$emit("change",e.range?[e.minValue,e.maxValue]:e.value)})},getStopStyle:function(e){return this.vertical?{bottom:e+"%"}:{left:e+"%"}}},computed:{stops:function(){var e=this;if(!this.showStops||this.min>this.max)return[];if(0===this.step)return[];for(var t=(this.max-this.min)/this.step,i=100*this.step/(this.max-this.min),n=[],r=1;r<t;r++)n.push(r*i);return this.range?n.filter(function(t){return t<100*(e.minValue-e.min)/(e.max-e.min)||t>100*(e.maxValue-e.min)/(e.max-e.min)}):n.filter(function(t){return t>100*(e.firstValue-e.min)/(e.max-e.min)})},markList:function(){var e=this;return this.marks?Object.keys(this.marks).map(parseFloat).sort(function(e,t){return e-t}).filter(function(t){return t<=e.max&&t>=e.min}).map(function(t){return{point:t,position:100*(t-e.min)/(e.max-e.min),mark:e.marks[t]}}):[]},minValue:function(){return Math.min(this.firstValue,this.secondValue)},maxValue:function(){return Math.max(this.firstValue,this.secondValue)},barSize:function(){return this.range?100*(this.maxValue-this.minValue)/(this.max-this.min)+"%":100*(this.firstValue-this.min)/(this.max-this.min)+"%"},barStart:function(){return this.range?100*(this.minValue-this.min)/(this.max-this.min)+"%":"0%"},precision:function(){var e=[this.min,this.max,this.step].map(function(e){var t=(""+e).split(".")[1];return t?t.length:0});return Math.max.apply(null,e)},runwayStyle:function(){return this.vertical?{height:this.height}:{}},barStyle:function(){return this.vertical?{height:this.barSize,bottom:this.barStart}:{width:this.barSize,left:this.barStart}},sliderDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},mounted:function(){var e=void 0;this.range?(Array.isArray(this.value)?(this.firstValue=Math.max(this.min,this.value[0]),this.secondValue=Math.min(this.max,this.value[1])):(this.firstValue=this.min,this.secondValue=this.max),this.oldValue=[this.firstValue,this.secondValue],e=this.firstValue+"-"+this.secondValue):("number"!=typeof this.value||isNaN(this.value)?this.firstValue=this.min:this.firstValue=Math.min(this.max,Math.max(this.min,this.value)),this.oldValue=this.firstValue,e=this.firstValue),this.$el.setAttribute("aria-valuetext",e),this.$el.setAttribute("aria-label",this.label?this.label:"slider between "+this.min+" and "+this.max),this.resetSize(),window.addEventListener("resize",this.resetSize)},beforeDestroy:function(){window.removeEventListener("resize",this.resetSize)}},el,[],!1,null,null,null);sl.options.__file="packages/slider/src/main.vue";var al=sl.exports;al.install=function(e){e.component(al.name,al)};var ol=al,ll=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-loading-fade"},on:{"after-leave":e.handleAfterLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-loading-mask",class:[e.customClass,{"is-fullscreen":e.fullscreen}],style:{backgroundColor:e.background||""}},[i("div",{staticClass:"el-loading-spinner"},[e.spinner?i("i",{class:e.spinner}):i("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[i("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})]),e.text?i("p",{staticClass:"el-loading-text"},[e._v(e._s(e.text))]):e._e()])])])};ll._withStripped=!0;var ul=r({data:function(){return{text:null,spinner:null,background:null,fullscreen:!0,visible:!1,customClass:""}},methods:{handleAfterLeave:function(){this.$emit("after-leave")},setText:function(e){this.text=e}}},ll,[],!1,null,null,null);ul.options.__file="packages/loading/src/loading.vue";var cl=ul.exports,hl=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!e||!t)throw new Error("instance & callback is required");var r=!1,s=function(){r||(r=!0,t&&t.apply(null,arguments))};n?e.$once("after-leave",s):e.$on("after-leave",s),setTimeout(function(){s()},i+100)},dl=h.a.extend(cl),pl={install:function(e){if(!e.prototype.$isServer){var t=function(t,n){n.value?e.nextTick(function(){n.modifiers.fullscreen?(t.originalPosition=pe(document.body,"position"),t.originalOverflow=pe(document.body,"overflow"),t.maskStyle.zIndex=_e.nextZIndex(),he(t.mask,"is-fullscreen"),i(document.body,t,n)):(de(t.mask,"is-fullscreen"),n.modifiers.body?(t.originalPosition=pe(document.body,"position"),["top","left"].forEach(function(e){var i="top"===e?"scrollTop":"scrollLeft";t.maskStyle[e]=t.getBoundingClientRect()[e]+document.body[i]+document.documentElement[i]-parseInt(pe(document.body,"margin-"+e),10)+"px"}),["height","width"].forEach(function(e){t.maskStyle[e]=t.getBoundingClientRect()[e]+"px"}),i(document.body,t,n)):(t.originalPosition=pe(t,"position"),i(t,t,n)))}):(hl(t.instance,function(e){if(t.instance.hiding){t.domVisible=!1;var i=n.modifiers.fullscreen||n.modifiers.body?document.body:t;de(i,"el-loading-parent--relative"),de(i,"el-loading-parent--hidden"),t.instance.hiding=!1}},300,!0),t.instance.visible=!1,t.instance.hiding=!0)},i=function(t,i,n){i.domVisible||"none"===pe(i,"display")||"hidden"===pe(i,"visibility")?i.domVisible&&!0===i.instance.hiding&&(i.instance.visible=!0,i.instance.hiding=!1):(Object.keys(i.maskStyle).forEach(function(e){i.mask.style[e]=i.maskStyle[e]}),"absolute"!==i.originalPosition&&"fixed"!==i.originalPosition&&he(t,"el-loading-parent--relative"),n.modifiers.fullscreen&&n.modifiers.lock&&he(t,"el-loading-parent--hidden"),i.domVisible=!0,t.appendChild(i.mask),e.nextTick(function(){i.instance.hiding?i.instance.$emit("after-leave"):i.instance.visible=!0}),i.domInserted=!0)};e.directive("loading",{bind:function(e,i,n){var r=e.getAttribute("element-loading-text"),s=e.getAttribute("element-loading-spinner"),a=e.getAttribute("element-loading-background"),o=e.getAttribute("element-loading-custom-class"),l=n.context,u=new dl({el:document.createElement("div"),data:{text:l&&l[r]||r,spinner:l&&l[s]||s,background:l&&l[a]||a,customClass:l&&l[o]||o,fullscreen:!!i.modifiers.fullscreen}});e.instance=u,e.mask=u.$el,e.maskStyle={},i.value&&t(e,i)},update:function(e,i){e.instance.setText(e.getAttribute("element-loading-text")),i.oldValue!==i.value&&t(e,i)},unbind:function(e,i){e.domInserted&&(e.mask&&e.mask.parentNode&&e.mask.parentNode.removeChild(e.mask),t(e,{value:!1,modifiers:i.modifiers})),e.instance&&e.instance.$destroy()}})}}},fl=pl,ml=h.a.extend(cl),vl={text:null,fullscreen:!0,body:!1,lock:!1,customClass:""},gl=void 0;ml.prototype.originalPosition="",ml.prototype.originalOverflow="",ml.prototype.close=function(){var e=this;this.fullscreen&&(gl=void 0),hl(this,function(t){var i=e.fullscreen||e.body?document.body:e.target;de(i,"el-loading-parent--relative"),de(i,"el-loading-parent--hidden"),e.$el&&e.$el.parentNode&&e.$el.parentNode.removeChild(e.$el),e.$destroy()},300),this.visible=!1};var bl=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!h.a.prototype.$isServer){if("string"==typeof(e=J({},vl,e)).target&&(e.target=document.querySelector(e.target)),e.target=e.target||document.body,e.target!==document.body?e.fullscreen=!1:e.body=!0,e.fullscreen&&gl)return gl;var t=e.body?document.body:e.target,i=new ml({el:document.createElement("div"),data:e});return function(e,t,i){var n={};e.fullscreen?(i.originalPosition=pe(document.body,"position"),i.originalOverflow=pe(document.body,"overflow"),n.zIndex=_e.nextZIndex()):e.body?(i.originalPosition=pe(document.body,"position"),["top","left"].forEach(function(t){var i="top"===t?"scrollTop":"scrollLeft";n[t]=e.target.getBoundingClientRect()[t]+document.body[i]+document.documentElement[i]+"px"}),["height","width"].forEach(function(t){n[t]=e.target.getBoundingClientRect()[t]+"px"})):i.originalPosition=pe(t,"position"),Object.keys(n).forEach(function(e){i.$el.style[e]=n[e]})}(e,t,i),"absolute"!==i.originalPosition&&"fixed"!==i.originalPosition&&he(t,"el-loading-parent--relative"),e.fullscreen&&e.lock&&he(t,"el-loading-parent--hidden"),t.appendChild(i.$el),h.a.nextTick(function(){i.visible=!0}),e.fullscreen&&(gl=i),i}},yl={install:function(e){e.use(fl),e.prototype.$loading=bl},directive:fl,service:bl},wl=function(){var e=this.$createElement;return(this._self._c||e)("i",{class:"el-icon-"+this.name})};wl._withStripped=!0;var xl=r({name:"ElIcon",props:{name:String}},wl,[],!1,null,null,null);xl.options.__file="packages/icon/src/icon.vue";var _l=xl.exports;_l.install=function(e){e.component(_l.name,_l)};var Cl=_l,kl={name:"ElRow",componentName:"ElRow",props:{tag:{type:String,default:"div"},gutter:Number,type:String,justify:{type:String,default:"start"},align:{type:String,default:"top"}},computed:{style:function(){var e={};return this.gutter&&(e.marginLeft="-"+this.gutter/2+"px",e.marginRight=e.marginLeft),e}},render:function(e){return e(this.tag,{class:["el-row","start"!==this.justify?"is-justify-"+this.justify:"","top"!==this.align?"is-align-"+this.align:"",{"el-row--flex":"flex"===this.type}],style:this.style},this.$slots.default)},install:function(e){e.component(kl.name,kl)}},Sl=kl,Dl="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$l={name:"ElCol",props:{span:{type:Number,default:24},tag:{type:String,default:"div"},offset:Number,pull:Number,push:Number,xs:[Number,Object],sm:[Number,Object],md:[Number,Object],lg:[Number,Object],xl:[Number,Object]},computed:{gutter:function(){for(var e=this.$parent;e&&"ElRow"!==e.$options.componentName;)e=e.$parent;return e?e.gutter:0}},render:function(e){var t=this,i=[],n={};return this.gutter&&(n.paddingLeft=this.gutter/2+"px",n.paddingRight=n.paddingLeft),["span","offset","pull","push"].forEach(function(e){(t[e]||0===t[e])&&i.push("span"!==e?"el-col-"+e+"-"+t[e]:"el-col-"+t[e])}),["xs","sm","md","lg","xl"].forEach(function(e){if("number"==typeof t[e])i.push("el-col-"+e+"-"+t[e]);else if("object"===Dl(t[e])){var n=t[e];Object.keys(n).forEach(function(t){i.push("span"!==t?"el-col-"+e+"-"+t+"-"+n[t]:"el-col-"+e+"-"+n[t])})}}),e(this.tag,{class:["el-col",i],style:n},this.$slots.default)},install:function(e){e.component($l.name,$l)}},El=$l,Tl=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition-group",{class:["el-upload-list","el-upload-list--"+e.listType,{"is-disabled":e.disabled}],attrs:{tag:"ul",name:"el-list"}},e._l(e.files,function(t){return i("li",{key:t.uid,class:["el-upload-list__item","is-"+t.status,e.focusing?"focusing":""],attrs:{tabindex:"0"},on:{keydown:function(i){if(!("button"in i)&&e._k(i.keyCode,"delete",[8,46],i.key,["Backspace","Delete","Del"]))return null;!e.disabled&&e.$emit("remove",t)},focus:function(t){e.focusing=!0},blur:function(t){e.focusing=!1},click:function(t){e.focusing=!1}}},[e._t("default",["uploading"!==t.status&&["picture-card","picture"].indexOf(e.listType)>-1?i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:t.url,alt:""}}):e._e(),i("a",{staticClass:"el-upload-list__item-name",on:{click:function(i){e.handleClick(t)}}},[i("i",{staticClass:"el-icon-document"}),e._v(e._s(t.name)+"\n      ")]),i("label",{staticClass:"el-upload-list__item-status-label"},[i("i",{class:{"el-icon-upload-success":!0,"el-icon-circle-check":"text"===e.listType,"el-icon-check":["picture-card","picture"].indexOf(e.listType)>-1}})]),e.disabled?e._e():i("i",{staticClass:"el-icon-close",on:{click:function(i){e.$emit("remove",t)}}}),e.disabled?e._e():i("i",{staticClass:"el-icon-close-tip"},[e._v(e._s(e.t("el.upload.deleteTip")))]),"uploading"===t.status?i("el-progress",{attrs:{type:"picture-card"===e.listType?"circle":"line","stroke-width":"picture-card"===e.listType?6:2,percentage:e.parsePercentage(t.percentage)}}):e._e(),"picture-card"===e.listType?i("span",{staticClass:"el-upload-list__item-actions"},[e.handlePreview&&"picture-card"===e.listType?i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(i){e.handlePreview(t)}}},[i("i",{staticClass:"el-icon-zoom-in"})]):e._e(),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(i){e.$emit("remove",t)}}},[i("i",{staticClass:"el-icon-delete"})])]):e._e()],{file:t})],2)}),0)};Tl._withStripped=!0;var Ml=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-progress",class:["el-progress--"+e.type,e.status?"is-"+e.status:"",{"el-progress--without-text":!e.showText,"el-progress--text-inside":e.textInside}],attrs:{role:"progressbar","aria-valuenow":e.percentage,"aria-valuemin":"0","aria-valuemax":"100"}},["line"===e.type?i("div",{staticClass:"el-progress-bar"},[i("div",{staticClass:"el-progress-bar__outer",style:{height:e.strokeWidth+"px"}},[i("div",{staticClass:"el-progress-bar__inner",style:e.barStyle},[e.showText&&e.textInside?i("div",{staticClass:"el-progress-bar__innerText"},[e._v(e._s(e.content))]):e._e()])])]):i("div",{staticClass:"el-progress-circle",style:{height:e.width+"px",width:e.width+"px"}},[i("svg",{attrs:{viewBox:"0 0 100 100"}},[i("path",{staticClass:"el-progress-circle__track",style:e.trailPathStyle,attrs:{d:e.trackPath,stroke:"#e5e9f2","stroke-width":e.relativeStrokeWidth,fill:"none"}}),i("path",{staticClass:"el-progress-circle__path",style:e.circlePathStyle,attrs:{d:e.trackPath,stroke:e.stroke,fill:"none","stroke-linecap":"round","stroke-width":e.percentage?e.relativeStrokeWidth:0}})])]),e.showText&&!e.textInside?i("div",{staticClass:"el-progress__text",style:{fontSize:e.progressTextSize+"px"}},[e.status?i("i",{class:e.iconClass}):[e._v(e._s(e.content))]],2):e._e()])};Ml._withStripped=!0;var Pl=r({name:"ElProgress",props:{type:{type:String,default:"line",validator:function(e){return["line","circle","dashboard"].indexOf(e)>-1}},percentage:{type:Number,default:0,required:!0,validator:function(e){return e>=0&&e<=100}},status:{type:String,validator:function(e){return["success","exception","warning"].indexOf(e)>-1}},strokeWidth:{type:Number,default:6},textInside:{type:Boolean,default:!1},width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:[String,Array,Function],default:""},format:Function},computed:{barStyle:function(){var e={};return e.width=this.percentage+"%",e.backgroundColor=this.getCurrentColor(this.percentage),e},relativeStrokeWidth:function(){return(this.strokeWidth/this.width*100).toFixed(1)},radius:function(){return"circle"===this.type||"dashboard"===this.type?parseInt(50-parseFloat(this.relativeStrokeWidth)/2,10):0},trackPath:function(){var e=this.radius,t="dashboard"===this.type;return"\n        M 50 50\n        m 0 "+(t?"":"-")+e+"\n        a "+e+" "+e+" 0 1 1 0 "+(t?"-":"")+2*e+"\n        a "+e+" "+e+" 0 1 1 0 "+(t?"":"-")+2*e+"\n        "},perimeter:function(){return 2*Math.PI*this.radius},rate:function(){return"dashboard"===this.type?.75:1},strokeDashoffset:function(){return-1*this.perimeter*(1-this.rate)/2+"px"},trailPathStyle:function(){return{strokeDasharray:this.perimeter*this.rate+"px, "+this.perimeter+"px",strokeDashoffset:this.strokeDashoffset}},circlePathStyle:function(){return{strokeDasharray:this.perimeter*this.rate*(this.percentage/100)+"px, "+this.perimeter+"px",strokeDashoffset:this.strokeDashoffset,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"}},stroke:function(){var e=void 0;if(this.color)e=this.getCurrentColor(this.percentage);else switch(this.status){case"success":e="#13ce66";break;case"exception":e="#ff4949";break;case"warning":e="#e6a23c";break;default:e="#20a0ff"}return e},iconClass:function(){return"warning"===this.status?"el-icon-warning":"line"===this.type?"success"===this.status?"el-icon-circle-check":"el-icon-circle-close":"success"===this.status?"el-icon-check":"el-icon-close"},progressTextSize:function(){return"line"===this.type?12+.4*this.strokeWidth:.111111*this.width+2},content:function(){return"function"==typeof this.format?this.format(this.percentage)||"":this.percentage+"%"}},methods:{getCurrentColor:function(e){return"function"==typeof this.color?this.color(e):"string"==typeof this.color?this.color:this.getLevelColor(e)},getLevelColor:function(e){for(var t=this.getColorArray().sort(function(e,t){return e.percentage-t.percentage}),i=0;i<t.length;i++)if(t[i].percentage>e)return t[i].color;return t[t.length-1].color},getColorArray:function(){var e=this.color,t=100/e.length;return e.map(function(e,i){return"string"==typeof e?{color:e,progress:(i+1)*t}:e})}}},Ml,[],!1,null,null,null);Pl.options.__file="packages/progress/src/progress.vue";var Nl=Pl.exports;Nl.install=function(e){e.component(Nl.name,Nl)};var Ol=Nl,Il=r({name:"ElUploadList",mixins:[j],data:function(){return{focusing:!1}},components:{ElProgress:Ol},props:{files:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},handlePreview:Function,listType:String},methods:{parsePercentage:function(e){return parseInt(e,10)},handleClick:function(e){this.handlePreview&&this.handlePreview(e)}}},Tl,[],!1,null,null,null);Il.options.__file="packages/upload/src/upload-list.vue";var Fl=Il.exports,Al=i(6),Ll=i.n(Al);var Vl=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"el-upload-dragger",class:{"is-dragover":e.dragover},on:{drop:function(t){return t.preventDefault(),e.onDrop(t)},dragover:function(t){return t.preventDefault(),e.onDragover(t)},dragleave:function(t){t.preventDefault(),e.dragover=!1}}},[e._t("default")],2)};Vl._withStripped=!0;var Bl=r({name:"ElUploadDrag",props:{disabled:Boolean},inject:{uploader:{default:""}},data:function(){return{dragover:!1}},methods:{onDragover:function(){this.disabled||(this.dragover=!0)},onDrop:function(e){if(!this.disabled&&this.uploader){var t=this.uploader.accept;this.dragover=!1,t?this.$emit("file",[].slice.call(e.dataTransfer.files).filter(function(e){var i=e.type,n=e.name,r=n.indexOf(".")>-1?"."+n.split(".").pop():"",s=i.replace(/\/.*$/,"");return t.split(",").map(function(e){return e.trim()}).filter(function(e){return e}).some(function(e){return/\..+$/.test(e)?r===e:/\/\*$/.test(e)?s===e.replace(/\/\*$/,""):!!/^[^\/]+\/[^\/]+$/.test(e)&&i===e})})):this.$emit("file",e.dataTransfer.files)}}}},Vl,[],!1,null,null,null);Bl.options.__file="packages/upload/src/upload-dragger.vue";var zl=r({inject:["uploader"],components:{UploadDragger:Bl.exports},props:{type:String,action:{type:String,required:!0},name:{type:String,default:"file"},data:Object,headers:Object,withCredentials:Boolean,multiple:Boolean,accept:String,onStart:Function,onProgress:Function,onSuccess:Function,onError:Function,beforeUpload:Function,drag:Boolean,onPreview:{type:Function,default:function(){}},onRemove:{type:Function,default:function(){}},fileList:Array,autoUpload:Boolean,listType:String,httpRequest:{type:Function,default:function(e){if("undefined"!=typeof XMLHttpRequest){var t=new XMLHttpRequest,i=e.action;t.upload&&(t.upload.onprogress=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),e.onProgress(t)});var n=new FormData;e.data&&Object.keys(e.data).forEach(function(t){n.append(t,e.data[t])}),n.append(e.filename,e.file,e.file.name),t.onerror=function(t){e.onError(t)},t.onload=function(){if(t.status<200||t.status>=300)return e.onError(function(e,t,i){var n=void 0;n=i.response?""+(i.response.error||i.response):i.responseText?""+i.responseText:"fail to post "+e+" "+i.status;var r=new Error(n);return r.status=i.status,r.method="post",r.url=e,r}(i,0,t));e.onSuccess(function(e){var t=e.responseText||e.response;if(!t)return t;try{return JSON.parse(t)}catch(e){return t}}(t))},t.open("post",i,!0),e.withCredentials&&"withCredentials"in t&&(t.withCredentials=!0);var r=e.headers||{};for(var s in r)r.hasOwnProperty(s)&&null!==r[s]&&t.setRequestHeader(s,r[s]);return t.send(n),t}}},disabled:Boolean,limit:Number,onExceed:Function},data:function(){return{mouseover:!1,reqs:{}}},methods:{isImage:function(e){return-1!==e.indexOf("image")},handleChange:function(e){var t=e.target.files;t&&this.uploadFiles(t)},uploadFiles:function(e){var t=this;if(this.limit&&this.fileList.length+e.length>this.limit)this.onExceed&&this.onExceed(e,this.fileList);else{var i=Array.prototype.slice.call(e);this.multiple||(i=i.slice(0,1)),0!==i.length&&i.forEach(function(e){t.onStart(e),t.autoUpload&&t.upload(e)})}},upload:function(e){var t=this;if(this.$refs.input.value=null,!this.beforeUpload)return this.post(e);var i=this.beforeUpload(e);i&&i.then?i.then(function(i){var n=Object.prototype.toString.call(i);if("[object File]"===n||"[object Blob]"===n){for(var r in"[object Blob]"===n&&(i=new File([i],e.name,{type:e.type})),e)e.hasOwnProperty(r)&&(i[r]=e[r]);t.post(i)}else t.post(e)},function(){t.onRemove(null,e)}):!1!==i?this.post(e):this.onRemove(null,e)},abort:function(e){var t=this.reqs;if(e){var i=e;e.uid&&(i=e.uid),t[i]&&t[i].abort()}else Object.keys(t).forEach(function(e){t[e]&&t[e].abort(),delete t[e]})},post:function(e){var t=this,i=e.uid,n={headers:this.headers,withCredentials:this.withCredentials,file:e,data:this.data,filename:this.name,action:this.action,onProgress:function(i){t.onProgress(i,e)},onSuccess:function(n){t.onSuccess(n,e),delete t.reqs[i]},onError:function(n){t.onError(n,e),delete t.reqs[i]}},r=this.httpRequest(n);this.reqs[i]=r,r&&r.then&&r.then(n.onSuccess,n.onError)},handleClick:function(){this.disabled||(this.$refs.input.value=null,this.$refs.input.click())},handleKeydown:function(e){e.target===e.currentTarget&&(13!==e.keyCode&&32!==e.keyCode||this.handleClick())}},render:function(e){var t=this.handleClick,i=this.drag,n=this.name,r=this.handleChange,s=this.multiple,a=this.accept,o=this.listType,l=this.uploadFiles,u=this.disabled,c={class:{"el-upload":!0},on:{click:t,keydown:this.handleKeydown}};return c.class["el-upload--"+o]=!0,e("div",Ll()([c,{attrs:{tabindex:"0"}}]),[i?e("upload-dragger",{attrs:{disabled:u},on:{file:l}},[this.$slots.default]):this.$slots.default,e("input",{class:"el-upload__input",attrs:{type:"file",name:n,multiple:s,accept:a},ref:"input",on:{change:r}})])}},void 0,void 0,!1,null,null,null);zl.options.__file="packages/upload/src/upload.vue";var Hl=zl.exports;function Rl(){}var Wl=r({name:"ElUpload",mixins:[Y],components:{ElProgress:Ol,UploadList:Fl,Upload:Hl},provide:function(){return{uploader:this}},inject:{elForm:{default:""}},props:{action:{type:String,required:!0},headers:{type:Object,default:function(){return{}}},data:Object,multiple:Boolean,name:{type:String,default:"file"},drag:Boolean,dragger:Boolean,withCredentials:Boolean,showFileList:{type:Boolean,default:!0},accept:String,type:{type:String,default:"select"},beforeUpload:Function,beforeRemove:Function,onRemove:{type:Function,default:Rl},onChange:{type:Function,default:Rl},onPreview:{type:Function},onSuccess:{type:Function,default:Rl},onProgress:{type:Function,default:Rl},onError:{type:Function,default:Rl},fileList:{type:Array,default:function(){return[]}},autoUpload:{type:Boolean,default:!0},listType:{type:String,default:"text"},httpRequest:Function,disabled:Boolean,limit:Number,onExceed:{type:Function,default:Rl}},data:function(){return{uploadFiles:[],dragOver:!1,draging:!1,tempIndex:1}},computed:{uploadDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},watch:{listType:function(e){"picture-card"!==e&&"picture"!==e||(this.uploadFiles=this.uploadFiles.map(function(e){if(!e.url&&e.raw)try{e.url=URL.createObjectURL(e.raw)}catch(e){console.error("[Element Error][Upload]",e)}return e}))},fileList:{immediate:!0,handler:function(e){var t=this;this.uploadFiles=e.map(function(e){return e.uid=e.uid||Date.now()+t.tempIndex++,e.status=e.status||"success",e})}}},methods:{handleStart:function(e){e.uid=Date.now()+this.tempIndex++;var t={status:"ready",name:e.name,size:e.size,percentage:0,uid:e.uid,raw:e};if("picture-card"===this.listType||"picture"===this.listType)try{t.url=URL.createObjectURL(e)}catch(e){return void console.error("[Element Error][Upload]",e)}this.uploadFiles.push(t),this.onChange(t,this.uploadFiles)},handleProgress:function(e,t){var i=this.getFile(t);this.onProgress(e,i,this.uploadFiles),i.status="uploading",i.percentage=e.percent||0},handleSuccess:function(e,t){var i=this.getFile(t);i&&(i.status="success",i.response=e,this.onSuccess(e,i,this.uploadFiles),this.onChange(i,this.uploadFiles))},handleError:function(e,t){var i=this.getFile(t),n=this.uploadFiles;i.status="fail",n.splice(n.indexOf(i),1),this.onError(e,i,this.uploadFiles),this.onChange(i,this.uploadFiles)},handleRemove:function(e,t){var i=this;t&&(e=this.getFile(t));var n=function(){i.abort(e);var t=i.uploadFiles;t.splice(t.indexOf(e),1),i.onRemove(e,t)};if(this.beforeRemove){if("function"==typeof this.beforeRemove){var r=this.beforeRemove(e,this.uploadFiles);r&&r.then?r.then(function(){n()},Rl):!1!==r&&n()}}else n()},getFile:function(e){var t=this.uploadFiles,i=void 0;return t.every(function(t){return!(i=e.uid===t.uid?t:null)}),i},abort:function(e){this.$refs["upload-inner"].abort(e)},clearFiles:function(){this.uploadFiles=[]},submit:function(){var e=this;this.uploadFiles.filter(function(e){return"ready"===e.status}).forEach(function(t){e.$refs["upload-inner"].upload(t.raw)})},getMigratingConfig:function(){return{props:{"default-file-list":"default-file-list is renamed to file-list.","show-upload-list":"show-upload-list is renamed to show-file-list.","thumbnail-mode":"thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan"}}}},beforeDestroy:function(){this.uploadFiles.forEach(function(e){e.url&&0===e.url.indexOf("blob:")&&URL.revokeObjectURL(e.url)})},render:function(e){var t=this,i=void 0;this.showFileList&&(i=e(Fl,{attrs:{disabled:this.uploadDisabled,listType:this.listType,files:this.uploadFiles,handlePreview:this.onPreview},on:{remove:this.handleRemove}},[function(e){if(t.$scopedSlots.file)return t.$scopedSlots.file({file:e.file})}]));var n=e("upload",{props:{type:this.type,drag:this.drag,action:this.action,multiple:this.multiple,"before-upload":this.beforeUpload,"with-credentials":this.withCredentials,headers:this.headers,name:this.name,data:this.data,accept:this.accept,fileList:this.uploadFiles,autoUpload:this.autoUpload,listType:this.listType,disabled:this.uploadDisabled,limit:this.limit,"on-exceed":this.onExceed,"on-start":this.handleStart,"on-progress":this.handleProgress,"on-success":this.handleSuccess,"on-error":this.handleError,"on-preview":this.onPreview,"on-remove":this.handleRemove,"http-request":this.httpRequest},ref:"upload-inner"},[this.$slots.trigger||this.$slots.default]);return e("div",["picture-card"===this.listType?i:"",this.$slots.trigger?[n,this.$slots.default]:n,this.$slots.tip,"picture-card"!==this.listType?i:""])}},void 0,void 0,!1,null,null,null);Wl.options.__file="packages/upload/src/index.vue";var jl=Wl.exports;jl.install=function(e){e.component(jl.name,jl)};var ql=jl,Yl=function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"el-spinner"},[t("svg",{staticClass:"el-spinner-inner",style:{width:this.radius/2+"px",height:this.radius/2+"px"},attrs:{viewBox:"0 0 50 50"}},[t("circle",{staticClass:"path",attrs:{cx:"25",cy:"25",r:"20",fill:"none",stroke:this.strokeColor,"stroke-width":this.strokeWidth}})])])};Yl._withStripped=!0;var Kl=r({name:"ElSpinner",props:{type:String,radius:{type:Number,default:100},strokeWidth:{type:Number,default:5},strokeColor:{type:String,default:"#efefef"}}},Yl,[],!1,null,null,null);Kl.options.__file="packages/spinner/src/spinner.vue";var Gl=Kl.exports;Gl.install=function(e){e.component(Gl.name,Gl)};var Ul=Gl,Xl=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-message-fade"},on:{"after-leave":e.handleAfterLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],class:["el-message",e.type&&!e.iconClass?"el-message--"+e.type:"",e.center?"is-center":"",e.showClose?"is-closable":"",e.customClass],style:e.positionStyle,attrs:{role:"alert"},on:{mouseenter:e.clearTimer,mouseleave:e.startTimer}},[e.iconClass?i("i",{class:e.iconClass}):i("i",{class:e.typeClass}),e._t("default",[e.dangerouslyUseHTMLString?i("p",{staticClass:"el-message__content",domProps:{innerHTML:e._s(e.message)}}):i("p",{staticClass:"el-message__content"},[e._v(e._s(e.message))])]),e.showClose?i("i",{staticClass:"el-message__closeBtn el-icon-close",on:{click:e.close}}):e._e()],2)])};Xl._withStripped=!0;var Jl={success:"success",info:"info",warning:"warning",error:"error"},Zl=r({data:function(){return{visible:!1,message:"",duration:3e3,type:"info",iconClass:"",customClass:"",onClose:null,showClose:!1,closed:!1,verticalOffset:20,timer:null,dangerouslyUseHTMLString:!1,center:!1}},computed:{typeClass:function(){return this.type&&!this.iconClass?"el-message__icon el-icon-"+Jl[this.type]:""},positionStyle:function(){return{top:this.verticalOffset+"px"}}},watch:{closed:function(e){e&&(this.visible=!1)}},methods:{handleAfterLeave:function(){this.$destroy(!0),this.$el.parentNode.removeChild(this.$el)},close:function(){this.closed=!0,"function"==typeof this.onClose&&this.onClose(this)},clearTimer:function(){clearTimeout(this.timer)},startTimer:function(){var e=this;this.duration>0&&(this.timer=setTimeout(function(){e.closed||e.close()},this.duration))},keydown:function(e){27===e.keyCode&&(this.closed||this.close())}},mounted:function(){this.startTimer(),document.addEventListener("keydown",this.keydown)},beforeDestroy:function(){document.removeEventListener("keydown",this.keydown)}},Xl,[],!1,null,null,null);Zl.options.__file="packages/message/src/main.vue";var Ql=Zl.exports,eu=h.a.extend(Ql),tu=void 0,iu=[],nu=1,ru=function e(t){if(!h.a.prototype.$isServer){"string"==typeof(t=t||{})&&(t={message:t});var i=t.onClose,n="message_"+nu++;t.onClose=function(){e.close(n,i)},(tu=new eu({data:t})).id=n,oa(tu.message)&&(tu.$slots.default=[tu.message],tu.message=null),tu.$mount(),document.body.appendChild(tu.$el);var r=t.offset||20;return iu.forEach(function(e){r+=e.$el.offsetHeight+16}),tu.verticalOffset=r,tu.visible=!0,tu.$el.style.zIndex=_e.nextZIndex(),iu.push(tu),tu}};["success","warning","info","error"].forEach(function(e){ru[e]=function(t){return"string"==typeof t&&(t={message:t}),t.type=e,ru(t)}}),ru.close=function(e,t){for(var i=iu.length,n=-1,r=0;r<i;r++)if(e===iu[r].id){n=r,"function"==typeof t&&t(iu[r]),iu.splice(r,1);break}if(!(i<=1||-1===n||n>iu.length-1))for(var s=iu[n].$el.offsetHeight,a=n;a<i-1;a++){var o=iu[a].$el;o.style.top=parseInt(o.style.top,10)-s-16+"px"}},ru.closeAll=function(){for(var e=iu.length-1;e>=0;e--)iu[e].close()};var su=ru,au=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-badge"},[e._t("default"),i("transition",{attrs:{name:"el-zoom-in-center"}},[i("sup",{directives:[{name:"show",rawName:"v-show",value:!e.hidden&&(e.content||0===e.content||e.isDot),expression:"!hidden && (content || content === 0 || isDot)"}],staticClass:"el-badge__content",class:["el-badge__content--"+e.type,{"is-fixed":e.$slots.default,"is-dot":e.isDot}],domProps:{textContent:e._s(e.content)}})])],2)};au._withStripped=!0;var ou=r({name:"ElBadge",props:{value:[String,Number],max:Number,isDot:Boolean,hidden:Boolean,type:{type:String,validator:function(e){return["primary","success","warning","info","danger"].indexOf(e)>-1}}},computed:{content:function(){if(!this.isDot){var e=this.value,t=this.max;return"number"==typeof e&&"number"==typeof t&&t<e?t+"+":e}}}},au,[],!1,null,null,null);ou.options.__file="packages/badge/src/main.vue";var lu=ou.exports;lu.install=function(e){e.component(lu.name,lu)};var uu=lu,cu=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-card",class:e.shadow?"is-"+e.shadow+"-shadow":"is-always-shadow"},[e.$slots.header||e.header?i("div",{staticClass:"el-card__header"},[e._t("header",[e._v(e._s(e.header))])],2):e._e(),i("div",{staticClass:"el-card__body",style:e.bodyStyle},[e._t("default")],2)])};cu._withStripped=!0;var hu=r({name:"ElCard",props:{header:{},bodyStyle:{},shadow:{type:String}}},cu,[],!1,null,null,null);hu.options.__file="packages/card/src/main.vue";var du=hu.exports;du.install=function(e){e.component(du.name,du)};var pu=du,fu=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-rate",attrs:{role:"slider","aria-valuenow":e.currentValue,"aria-valuetext":e.text,"aria-valuemin":"0","aria-valuemax":e.max,tabindex:"0"},on:{keydown:e.handleKey}},[e._l(e.max,function(t,n){return i("span",{key:n,staticClass:"el-rate__item",style:{cursor:e.rateDisabled?"auto":"pointer"},on:{mousemove:function(i){e.setCurrentValue(t,i)},mouseleave:e.resetCurrentValue,click:function(i){e.selectValue(t)}}},[i("i",{staticClass:"el-rate__icon",class:[e.classes[t-1],{hover:e.hoverIndex===t}],style:e.getIconStyle(t)},[e.showDecimalIcon(t)?i("i",{staticClass:"el-rate__decimal",class:e.decimalIconClass,style:e.decimalStyle}):e._e()])])}),e.showText||e.showScore?i("span",{staticClass:"el-rate__text",style:{color:e.textColor}},[e._v(e._s(e.text))]):e._e()],2)};fu._withStripped=!0;var mu=r({name:"ElRate",mixins:[Y],inject:{elForm:{default:""}},data:function(){return{pointerAtLeftHalf:!0,currentValue:this.value,hoverIndex:-1}},props:{value:{type:Number,default:0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:[Array,Object],default:function(){return["#F7BA2A","#F7BA2A","#F7BA2A"]}},voidColor:{type:String,default:"#C6D1DE"},disabledVoidColor:{type:String,default:"#EFF2F7"},iconClasses:{type:[Array,Object],default:function(){return["el-icon-star-on","el-icon-star-on","el-icon-star-on"]}},voidIconClass:{type:String,default:"el-icon-star-off"},disabledVoidIconClass:{type:String,default:"el-icon-star-on"},disabled:{type:Boolean,default:!1},allowHalf:{type:Boolean,default:!1},showText:{type:Boolean,default:!1},showScore:{type:Boolean,default:!1},textColor:{type:String,default:"#1f2d3d"},texts:{type:Array,default:function(){return["极差","失望","一般","满意","惊喜"]}},scoreTemplate:{type:String,default:"{value}"}},computed:{text:function(){var e="";return this.showScore?e=this.scoreTemplate.replace(/\{\s*value\s*\}/,this.rateDisabled?this.value:this.currentValue):this.showText&&(e=this.texts[Math.ceil(this.currentValue)-1]),e},decimalStyle:function(){var e="";return this.rateDisabled?e=this.valueDecimal+"%":this.allowHalf&&(e="50%"),{color:this.activeColor,width:e}},valueDecimal:function(){return 100*this.value-100*Math.floor(this.value)},classMap:function(){var e;return Array.isArray(this.iconClasses)?((e={})[this.lowThreshold]=this.iconClasses[0],e[this.highThreshold]={value:this.iconClasses[1],excluded:!0},e[this.max]=this.iconClasses[2],e):this.iconClasses},decimalIconClass:function(){return this.getValueFromMap(this.value,this.classMap)},voidClass:function(){return this.rateDisabled?this.disabledVoidIconClass:this.voidIconClass},activeClass:function(){return this.getValueFromMap(this.currentValue,this.classMap)},colorMap:function(){var e;return Array.isArray(this.colors)?((e={})[this.lowThreshold]=this.colors[0],e[this.highThreshold]={value:this.colors[1],excluded:!0},e[this.max]=this.colors[2],e):this.colors},activeColor:function(){return this.getValueFromMap(this.currentValue,this.colorMap)},classes:function(){var e=[],t=0,i=this.currentValue;for(this.allowHalf&&this.currentValue!==Math.floor(this.currentValue)&&i--;t<i;t++)e.push(this.activeClass);for(;t<this.max;t++)e.push(this.voidClass);return e},rateDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},watch:{value:function(e){this.currentValue=e,this.pointerAtLeftHalf=this.value!==Math.floor(this.value)}},methods:{getMigratingConfig:function(){return{props:{"text-template":"text-template is renamed to score-template."}}},getValueFromMap:function(e,t){var i=Object.keys(t).filter(function(i){var n=t[i];return!!m(n)&&n.excluded?e<i:e<=i}).sort(function(e,t){return e-t}),n=t[i[0]];return m(n)?n.value:n||""},showDecimalIcon:function(e){var t=this.rateDisabled&&this.valueDecimal>0&&e-1<this.value&&e>this.value,i=this.allowHalf&&this.pointerAtLeftHalf&&e-.5<=this.currentValue&&e>this.currentValue;return t||i},getIconStyle:function(e){var t=this.rateDisabled?this.disabledVoidColor:this.voidColor;return{color:e<=this.currentValue?this.activeColor:t}},selectValue:function(e){this.rateDisabled||(this.allowHalf&&this.pointerAtLeftHalf?(this.$emit("input",this.currentValue),this.$emit("change",this.currentValue)):(this.$emit("input",e),this.$emit("change",e)))},handleKey:function(e){if(!this.rateDisabled){var t=this.currentValue,i=e.keyCode;38===i||39===i?(this.allowHalf?t+=.5:t+=1,e.stopPropagation(),e.preventDefault()):37!==i&&40!==i||(this.allowHalf?t-=.5:t-=1,e.stopPropagation(),e.preventDefault()),t=(t=t<0?0:t)>this.max?this.max:t,this.$emit("input",t),this.$emit("change",t)}},setCurrentValue:function(e,t){if(!this.rateDisabled){if(this.allowHalf){var i=t.target;ce(i,"el-rate__item")&&(i=i.querySelector(".el-rate__icon")),ce(i,"el-rate__decimal")&&(i=i.parentNode),this.pointerAtLeftHalf=2*t.offsetX<=i.clientWidth,this.currentValue=this.pointerAtLeftHalf?e-.5:e}else this.currentValue=e;this.hoverIndex=e}},resetCurrentValue:function(){this.rateDisabled||(this.allowHalf&&(this.pointerAtLeftHalf=this.value!==Math.floor(this.value)),this.currentValue=this.value,this.hoverIndex=-1)}},created:function(){this.value||this.$emit("input",0)}},fu,[],!1,null,null,null);mu.options.__file="packages/rate/src/main.vue";var vu=mu.exports;vu.install=function(e){e.component(vu.name,vu)};var gu=vu,bu=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-steps",class:[!this.simple&&"el-steps--"+this.direction,this.simple&&"el-steps--simple"]},[this._t("default")],2)};bu._withStripped=!0;var yu=r({name:"ElSteps",mixins:[Y],props:{space:[Number,String],active:Number,direction:{type:String,default:"horizontal"},alignCenter:Boolean,simple:Boolean,finishStatus:{type:String,default:"finish"},processStatus:{type:String,default:"process"}},data:function(){return{steps:[],stepOffset:0}},methods:{getMigratingConfig:function(){return{props:{center:"center is removed."}}}},watch:{active:function(e,t){this.$emit("change",e,t)},steps:function(e){e.forEach(function(e,t){e.index=t})}}},bu,[],!1,null,null,null);yu.options.__file="packages/steps/src/steps.vue";var wu=yu.exports;wu.install=function(e){e.component(wu.name,wu)};var xu=wu,_u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-step",class:[!e.isSimple&&"is-"+e.$parent.direction,e.isSimple&&"is-simple",e.isLast&&!e.space&&!e.isCenter&&"is-flex",e.isCenter&&!e.isVertical&&!e.isSimple&&"is-center"],style:e.style},[i("div",{staticClass:"el-step__head",class:"is-"+e.currentStatus},[i("div",{staticClass:"el-step__line",style:e.isLast?"":{marginRight:e.$parent.stepOffset+"px"}},[i("i",{staticClass:"el-step__line-inner",style:e.lineStyle})]),i("div",{staticClass:"el-step__icon",class:"is-"+(e.icon?"icon":"text")},["success"!==e.currentStatus&&"error"!==e.currentStatus?e._t("icon",[e.icon?i("i",{staticClass:"el-step__icon-inner",class:[e.icon]}):e._e(),e.icon||e.isSimple?e._e():i("div",{staticClass:"el-step__icon-inner"},[e._v(e._s(e.index+1))])]):i("i",{staticClass:"el-step__icon-inner is-status",class:["el-icon-"+("success"===e.currentStatus?"check":"close")]})],2)]),i("div",{staticClass:"el-step__main"},[i("div",{ref:"title",staticClass:"el-step__title",class:["is-"+e.currentStatus]},[e._t("title",[e._v(e._s(e.title))])],2),e.isSimple?i("div",{staticClass:"el-step__arrow"}):i("div",{staticClass:"el-step__description",class:["is-"+e.currentStatus]},[e._t("description",[e._v(e._s(e.description))])],2)])])};_u._withStripped=!0;var Cu=r({name:"ElStep",props:{title:String,icon:String,description:String,status:String},data:function(){return{index:-1,lineStyle:{},internalStatus:""}},beforeCreate:function(){this.$parent.steps.push(this)},beforeDestroy:function(){var e=this.$parent.steps,t=e.indexOf(this);t>=0&&e.splice(t,1)},computed:{currentStatus:function(){return this.status||this.internalStatus},prevStatus:function(){var e=this.$parent.steps[this.index-1];return e?e.currentStatus:"wait"},isCenter:function(){return this.$parent.alignCenter},isVertical:function(){return"vertical"===this.$parent.direction},isSimple:function(){return this.$parent.simple},isLast:function(){var e=this.$parent;return e.steps[e.steps.length-1]===this},stepsCount:function(){return this.$parent.steps.length},space:function(){var e=this.isSimple,t=this.$parent.space;return e?"":t},style:function(){var e={},t=this.$parent.steps.length,i="number"==typeof this.space?this.space+"px":this.space?this.space:100/(t-(this.isCenter?0:1))+"%";return e.flexBasis=i,this.isVertical?e:(this.isLast?e.maxWidth=100/this.stepsCount+"%":e.marginRight=-this.$parent.stepOffset+"px",e)}},methods:{updateStatus:function(e){var t=this.$parent.$children[this.index-1];e>this.index?this.internalStatus=this.$parent.finishStatus:e===this.index&&"error"!==this.prevStatus?this.internalStatus=this.$parent.processStatus:this.internalStatus="wait",t&&t.calcProgress(this.internalStatus)},calcProgress:function(e){var t=100,i={};i.transitionDelay=150*this.index+"ms",e===this.$parent.processStatus?(this.currentStatus,t=0):"wait"===e&&(t=0,i.transitionDelay=-150*this.index+"ms"),i.borderWidth=t&&!this.isSimple?"1px":0,"vertical"===this.$parent.direction?i.height=t+"%":i.width=t+"%",this.lineStyle=i}},mounted:function(){var e=this,t=this.$watch("index",function(i){e.$watch("$parent.active",e.updateStatus,{immediate:!0}),e.$watch("$parent.processStatus",function(){var t=e.$parent.active;e.updateStatus(t)},{immediate:!0}),t()})}},_u,[],!1,null,null,null);Cu.options.__file="packages/steps/src/step.vue";var ku=Cu.exports;ku.install=function(e){e.component(ku.name,ku)};var Su=ku,Du=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.carouselClasses,on:{mouseenter:function(t){return t.stopPropagation(),e.handleMouseEnter(t)},mouseleave:function(t){return t.stopPropagation(),e.handleMouseLeave(t)}}},[i("div",{staticClass:"el-carousel__container",style:{height:e.height}},[e.arrowDisplay?i("transition",{attrs:{name:"carousel-arrow-left"}},[i("button",{directives:[{name:"show",rawName:"v-show",value:("always"===e.arrow||e.hover)&&(e.loop||e.activeIndex>0),expression:"(arrow === 'always' || hover) && (loop || activeIndex > 0)"}],staticClass:"el-carousel__arrow el-carousel__arrow--left",attrs:{type:"button"},on:{mouseenter:function(t){e.handleButtonEnter("left")},mouseleave:e.handleButtonLeave,click:function(t){t.stopPropagation(),e.throttledArrowClick(e.activeIndex-1)}}},[i("i",{staticClass:"el-icon-arrow-left"})])]):e._e(),e.arrowDisplay?i("transition",{attrs:{name:"carousel-arrow-right"}},[i("button",{directives:[{name:"show",rawName:"v-show",value:("always"===e.arrow||e.hover)&&(e.loop||e.activeIndex<e.items.length-1),expression:"(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"}],staticClass:"el-carousel__arrow el-carousel__arrow--right",attrs:{type:"button"},on:{mouseenter:function(t){e.handleButtonEnter("right")},mouseleave:e.handleButtonLeave,click:function(t){t.stopPropagation(),e.throttledArrowClick(e.activeIndex+1)}}},[i("i",{staticClass:"el-icon-arrow-right"})])]):e._e(),e._t("default")],2),"none"!==e.indicatorPosition?i("ul",{class:e.indicatorsClasses},e._l(e.items,function(t,n){return i("li",{key:n,class:["el-carousel__indicator","el-carousel__indicator--"+e.direction,{"is-active":n===e.activeIndex}],on:{mouseenter:function(t){e.throttledIndicatorHover(n)},click:function(t){t.stopPropagation(),e.handleIndicatorClick(n)}}},[i("button",{staticClass:"el-carousel__button"},[e.hasLabel?i("span",[e._v(e._s(t.label))]):e._e()])])}),0):e._e()])};Du._withStripped=!0;var $u=i(4),Eu=i.n($u),Tu=r({name:"ElCarousel",props:{initialIndex:{type:Number,default:0},height:String,trigger:{type:String,default:"hover"},autoplay:{type:Boolean,default:!0},interval:{type:Number,default:3e3},indicatorPosition:String,indicator:{type:Boolean,default:!0},arrow:{type:String,default:"hover"},type:String,loop:{type:Boolean,default:!0},direction:{type:String,default:"horizontal",validator:function(e){return-1!==["horizontal","vertical"].indexOf(e)}}},data:function(){return{items:[],activeIndex:-1,containerWidth:0,timer:null,hover:!1}},computed:{arrowDisplay:function(){return"never"!==this.arrow&&"vertical"!==this.direction},hasLabel:function(){return this.items.some(function(e){return e.label.toString().length>0})},carouselClasses:function(){var e=["el-carousel","el-carousel--"+this.direction];return"card"===this.type&&e.push("el-carousel--card"),e},indicatorsClasses:function(){var e=["el-carousel__indicators","el-carousel__indicators--"+this.direction];return this.hasLabel&&e.push("el-carousel__indicators--labels"),"outside"!==this.indicatorPosition&&"card"!==this.type||e.push("el-carousel__indicators--outside"),e}},watch:{items:function(e){e.length>0&&this.setActiveItem(this.initialIndex)},activeIndex:function(e,t){this.resetItemPosition(t),this.$emit("change",e,t)},autoplay:function(e){e?this.startTimer():this.pauseTimer()},loop:function(){this.setActiveItem(this.activeIndex)}},methods:{handleMouseEnter:function(){this.hover=!0,this.pauseTimer()},handleMouseLeave:function(){this.hover=!1,this.startTimer()},itemInStage:function(e,t){var i=this.items.length;return t===i-1&&e.inStage&&this.items[0].active||e.inStage&&this.items[t+1]&&this.items[t+1].active?"left":!!(0===t&&e.inStage&&this.items[i-1].active||e.inStage&&this.items[t-1]&&this.items[t-1].active)&&"right"},handleButtonEnter:function(e){var t=this;"vertical"!==this.direction&&this.items.forEach(function(i,n){e===t.itemInStage(i,n)&&(i.hover=!0)})},handleButtonLeave:function(){"vertical"!==this.direction&&this.items.forEach(function(e){e.hover=!1})},updateItems:function(){this.items=this.$children.filter(function(e){return"ElCarouselItem"===e.$options.name})},resetItemPosition:function(e){var t=this;this.items.forEach(function(i,n){i.translateItem(n,t.activeIndex,e)})},playSlides:function(){this.activeIndex<this.items.length-1?this.activeIndex++:this.loop&&(this.activeIndex=0)},pauseTimer:function(){this.timer&&(clearInterval(this.timer),this.timer=null)},startTimer:function(){this.interval<=0||!this.autoplay||this.timer||(this.timer=setInterval(this.playSlides,this.interval))},setActiveItem:function(e){if("string"==typeof e){var t=this.items.filter(function(t){return t.name===e});t.length>0&&(e=this.items.indexOf(t[0]))}if(e=Number(e),isNaN(e)||e!==Math.floor(e))console.warn("[Element Warn][Carousel]index must be an integer.");else{var i=this.items.length,n=this.activeIndex;this.activeIndex=e<0?this.loop?i-1:0:e>=i?this.loop?0:i-1:e,n===this.activeIndex&&this.resetItemPosition(n)}},prev:function(){this.setActiveItem(this.activeIndex-1)},next:function(){this.setActiveItem(this.activeIndex+1)},handleIndicatorClick:function(e){this.activeIndex=e},handleIndicatorHover:function(e){"hover"===this.trigger&&e!==this.activeIndex&&(this.activeIndex=e)}},created:function(){var e=this;this.throttledArrowClick=Eu()(300,!0,function(t){e.setActiveItem(t)}),this.throttledIndicatorHover=Eu()(300,function(t){e.handleIndicatorHover(t)})},mounted:function(){var e=this;this.updateItems(),this.$nextTick(function(){We(e.$el,e.resetItemPosition),e.initialIndex<e.items.length&&e.initialIndex>=0&&(e.activeIndex=e.initialIndex),e.startTimer()})},beforeDestroy:function(){this.$el&&je(this.$el,this.resetItemPosition),this.pauseTimer()}},Du,[],!1,null,null,null);Tu.options.__file="packages/carousel/src/main.vue";var Mu=Tu.exports;Mu.install=function(e){e.component(Mu.name,Mu)};var Pu=Mu,Nu=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"show",rawName:"v-show",value:e.ready,expression:"ready"}],staticClass:"el-carousel__item",class:{"is-active":e.active,"el-carousel__item--card":"card"===e.$parent.type,"is-in-stage":e.inStage,"is-hover":e.hover,"is-animating":e.animating},style:e.itemStyle,on:{click:e.handleItemClick}},["card"===e.$parent.type?i("div",{directives:[{name:"show",rawName:"v-show",value:!e.active,expression:"!active"}],staticClass:"el-carousel__mask"}):e._e(),e._t("default")],2)};Nu._withStripped=!0;var Ou=r({name:"ElCarouselItem",props:{name:String,label:{type:[String,Number],default:""}},data:function(){return{hover:!1,translate:0,scale:1,active:!1,ready:!1,inStage:!1,animating:!1}},methods:{processIndex:function(e,t,i){return 0===t&&e===i-1?-1:t===i-1&&0===e?i:e<t-1&&t-e>=i/2?i+1:e>t+1&&e-t>=i/2?-2:e},calcCardTranslate:function(e,t){var i=this.$parent.$el.offsetWidth;return this.inStage?i*(1.17*(e-t)+1)/4:e<t?-1.83*i/4:3.83*i/4},calcTranslate:function(e,t,i){return this.$parent.$el[i?"offsetHeight":"offsetWidth"]*(e-t)},translateItem:function(e,t,i){var n=this.$parent.type,r=this.parentDirection,s=this.$parent.items.length;if("card"!==n&&void 0!==i&&(this.animating=e===t||e===i),e!==t&&s>2&&this.$parent.loop&&(e=this.processIndex(e,t,s)),"card"===n)"vertical"===r&&console.warn("[Element Warn][Carousel]vertical directionis not supported in card mode"),this.inStage=Math.round(Math.abs(e-t))<=1,this.active=e===t,this.translate=this.calcCardTranslate(e,t),this.scale=this.active?1:.83;else{this.active=e===t;var a="vertical"===r;this.translate=this.calcTranslate(e,t,a)}this.ready=!0},handleItemClick:function(){var e=this.$parent;if(e&&"card"===e.type){var t=e.items.indexOf(this);e.setActiveItem(t)}}},computed:{parentDirection:function(){return this.$parent.direction},itemStyle:function(){return function(e){if("object"!==(void 0===e?"undefined":y(e)))return e;var t=["ms-","webkit-"];return["transform","transition","animation"].forEach(function(i){var n=e[i];i&&n&&t.forEach(function(t){e[t+i]=n})}),e}({transform:("vertical"===this.parentDirection?"translateY":"translateX")+"("+this.translate+"px) scale("+this.scale+")"})}},created:function(){this.$parent&&this.$parent.updateItems()},destroyed:function(){this.$parent&&this.$parent.updateItems()}},Nu,[],!1,null,null,null);Ou.options.__file="packages/carousel/src/item.vue";var Iu=Ou.exports;Iu.install=function(e){e.component(Iu.name,Iu)};var Fu=Iu,Au=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"el-collapse",attrs:{role:"tablist","aria-multiselectable":"true"}},[this._t("default")],2)};Au._withStripped=!0;var Lu=r({name:"ElCollapse",componentName:"ElCollapse",props:{accordion:Boolean,value:{type:[Array,String,Number],default:function(){return[]}}},data:function(){return{activeNames:[].concat(this.value)}},provide:function(){return{collapse:this}},watch:{value:function(e){this.activeNames=[].concat(e)}},methods:{setActiveNames:function(e){e=[].concat(e);var t=this.accordion?e[0]:e;this.activeNames=e,this.$emit("input",t),this.$emit("change",t)},handleItemClick:function(e){if(this.accordion)this.setActiveNames(!this.activeNames[0]&&0!==this.activeNames[0]||this.activeNames[0]!==e.name?e.name:"");else{var t=this.activeNames.slice(0),i=t.indexOf(e.name);i>-1?t.splice(i,1):t.push(e.name),this.setActiveNames(t)}}},created:function(){this.$on("item-click",this.handleItemClick)}},Au,[],!1,null,null,null);Lu.options.__file="packages/collapse/src/collapse.vue";var Vu=Lu.exports;Vu.install=function(e){e.component(Vu.name,Vu)};var Bu=Vu,zu=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-collapse-item",class:{"is-active":e.isActive,"is-disabled":e.disabled}},[i("div",{attrs:{role:"tab","aria-expanded":e.isActive,"aria-controls":"el-collapse-content-"+e.id,"aria-describedby":"el-collapse-content-"+e.id}},[i("div",{staticClass:"el-collapse-item__header",class:{focusing:e.focusing,"is-active":e.isActive},attrs:{role:"button",id:"el-collapse-head-"+e.id,tabindex:e.disabled?void 0:0},on:{click:e.handleHeaderClick,keyup:function(t){return"button"in t||!e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])||!e._k(t.keyCode,"enter",13,t.key,"Enter")?(t.stopPropagation(),e.handleEnterClick(t)):null},focus:e.handleFocus,blur:function(t){e.focusing=!1}}},[e._t("title",[e._v(e._s(e.title))]),i("i",{staticClass:"el-collapse-item__arrow el-icon-arrow-right",class:{"is-active":e.isActive}})],2)]),i("el-collapse-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"el-collapse-item__wrap",attrs:{role:"tabpanel","aria-hidden":!e.isActive,"aria-labelledby":"el-collapse-head-"+e.id,id:"el-collapse-content-"+e.id}},[i("div",{staticClass:"el-collapse-item__content"},[e._t("default")],2)])])],1)};zu._withStripped=!0;var Hu=r({name:"ElCollapseItem",componentName:"ElCollapseItem",mixins:[l],components:{ElCollapseTransition:ei},data:function(){return{contentWrapStyle:{height:"auto",display:"block"},contentHeight:0,focusing:!1,isClick:!1,id:D()}},inject:["collapse"],props:{title:String,name:{type:[String,Number],default:function(){return this._uid}},disabled:Boolean},computed:{isActive:function(){return this.collapse.activeNames.indexOf(this.name)>-1}},methods:{handleFocus:function(){var e=this;setTimeout(function(){e.isClick?e.isClick=!1:e.focusing=!0},50)},handleHeaderClick:function(){this.disabled||(this.dispatch("ElCollapse","item-click",this),this.focusing=!1,this.isClick=!0)},handleEnterClick:function(){this.dispatch("ElCollapse","item-click",this)}}},zu,[],!1,null,null,null);Hu.options.__file="packages/collapse/src/collapse-item.vue";var Ru=Hu.exports;Ru.install=function(e){e.component(Ru.name,Ru)};var Wu=Ru,ju=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:function(){return e.toggleDropDownVisible(!1)},expression:"() => toggleDropDownVisible(false)"}],ref:"reference",class:["el-cascader",e.realSize&&"el-cascader--"+e.realSize,{"is-disabled":e.isDisabled}],on:{mouseenter:function(t){e.inputHover=!0},mouseleave:function(t){e.inputHover=!1},click:function(){return e.toggleDropDownVisible(!e.readonly||void 0)},keydown:e.handleKeyDown}},[i("el-input",{ref:"input",class:{"is-focus":e.dropDownVisible},attrs:{size:e.realSize,placeholder:e.placeholder,readonly:e.readonly,disabled:e.isDisabled,"validate-event":!1},on:{focus:e.handleFocus,blur:e.handleBlur,input:e.handleInput},model:{value:e.multiple?e.presentText:e.inputValue,callback:function(t){e.multiple?e.presentText:e.inputValue=t},expression:"multiple ? presentText : inputValue"}},[i("template",{slot:"suffix"},[e.clearBtnVisible?i("i",{key:"clear",staticClass:"el-input__icon el-icon-circle-close",on:{click:function(t){return t.stopPropagation(),e.handleClear(t)}}}):i("i",{key:"arrow-down",class:["el-input__icon","el-icon-arrow-down",e.dropDownVisible&&"is-reverse"],on:{click:function(t){t.stopPropagation(),e.toggleDropDownVisible()}}})])],2),e.multiple?i("div",{staticClass:"el-cascader__tags"},[e._l(e.presentTags,function(t,n){return i("el-tag",{key:t.key,attrs:{type:"info",size:e.tagSize,hit:t.hitState,closable:t.closable,"disable-transitions":""},on:{close:function(t){e.deleteTag(n)}}},[i("span",[e._v(e._s(t.text))])])}),e.filterable&&!e.isDisabled?i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.inputValue,expression:"inputValue",modifiers:{trim:!0}}],staticClass:"el-cascader__search-input",attrs:{type:"text",placeholder:e.presentTags.length?"":e.placeholder},domProps:{value:e.inputValue},on:{input:[function(t){t.target.composing||(e.inputValue=t.target.value.trim())},function(t){return e.handleInput(e.inputValue,t)}],click:function(t){t.stopPropagation(),e.toggleDropDownVisible(!0)},keydown:function(t){return"button"in t||!e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete","Del"])?e.handleDelete(t):null},blur:function(t){e.$forceUpdate()}}}):e._e()],2):e._e(),i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":e.handleDropdownLeave}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.dropDownVisible,expression:"dropDownVisible"}],ref:"popper",class:["el-popper","el-cascader__dropdown",e.popperClass]},[i("el-cascader-panel",{directives:[{name:"show",rawName:"v-show",value:!e.filtering,expression:"!filtering"}],ref:"panel",attrs:{options:e.options,props:e.config,border:!1,"render-label":e.$scopedSlots.default},on:{"expand-change":e.handleExpandChange,close:function(t){e.toggleDropDownVisible(!1)}},model:{value:e.checkedValue,callback:function(t){e.checkedValue=t},expression:"checkedValue"}}),e.filterable?i("el-scrollbar",{directives:[{name:"show",rawName:"v-show",value:e.filtering,expression:"filtering"}],ref:"suggestionPanel",staticClass:"el-cascader__suggestion-panel",attrs:{tag:"ul","view-class":"el-cascader__suggestion-list"},nativeOn:{keydown:function(t){return e.handleSuggestionKeyDown(t)}}},[e.suggestions.length?e._l(e.suggestions,function(t,n){return i("li",{key:t.uid,class:["el-cascader__suggestion-item",t.checked&&"is-checked"],attrs:{tabindex:-1},on:{click:function(t){e.handleSuggestionClick(n)}}},[i("span",[e._v(e._s(t.text))]),t.checked?i("i",{staticClass:"el-icon-check"}):e._e()])}):e._t("empty",[i("li",{staticClass:"el-cascader__empty-text"},[e._v(e._s(e.t("el.cascader.noMatch")))])])],2):e._e()],1)])],1)};ju._withStripped=!0;var qu=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{class:["el-cascader-panel",this.border&&"is-bordered"],on:{keydown:this.handleKeyDown}},this._l(this.menus,function(e,i){return t("cascader-menu",{key:i,ref:"menu",refInFor:!0,attrs:{index:i,nodes:e}})}),1)};qu._withStripped=!0;var Yu=function(e){return e.stopPropagation()},Ku=r({inject:["panel"],components:{ElCheckbox:Ai,ElRadio:Ci},props:{node:{required:!0},nodeId:String},computed:{config:function(){return this.panel.config},isLeaf:function(){return this.node.isLeaf},isDisabled:function(){return this.node.isDisabled},checkedValue:function(){return this.panel.checkedValue},isChecked:function(){return this.node.isSameNode(this.checkedValue)},inActivePath:function(){return this.isInPath(this.panel.activePath)},inCheckedPath:function(){var e=this;return!!this.config.checkStrictly&&this.panel.checkedNodePaths.some(function(t){return e.isInPath(t)})},value:function(){return this.node.getValueByOption()}},methods:{handleExpand:function(){var e=this,t=this.panel,i=this.node,n=this.isDisabled,r=this.config,s=r.multiple;!r.checkStrictly&&n||i.loading||(r.lazy&&!i.loaded?t.lazyLoad(i,function(){var t=e.isLeaf;if(t||e.handleExpand(),s){var n=!!t&&i.checked;e.handleMultiCheckChange(n)}}):t.handleExpand(i))},handleCheckChange:function(){var e=this.panel,t=this.value;e.handleCheckChange(t)},handleMultiCheckChange:function(e){this.node.doCheck(e),this.panel.calculateMultiCheckedValue()},isInPath:function(e){var t=this.node;return(e[t.level-1]||{}).uid===t.uid},renderPrefix:function(e){var t=this.isLeaf,i=this.isChecked,n=this.config,r=n.checkStrictly;return n.multiple?this.renderCheckbox(e):r?this.renderRadio(e):t&&i?this.renderCheckIcon(e):null},renderPostfix:function(e){var t=this.node,i=this.isLeaf;return t.loading?this.renderLoadingIcon(e):i?null:this.renderExpandIcon(e)},renderCheckbox:function(e){var t=this.node,i=this.config,n=this.isDisabled,r={on:{change:this.handleMultiCheckChange},nativeOn:{}};return i.checkStrictly&&(r.nativeOn.click=Yu),e("el-checkbox",Ll()([{attrs:{value:t.checked,indeterminate:t.indeterminate,disabled:n}},r]))},renderRadio:function(e){var t=this.checkedValue,i=this.value,n=this.isDisabled;return I(i,t)&&(i=t),e("el-radio",{attrs:{value:t,label:i,disabled:n},on:{change:this.handleCheckChange},nativeOn:{click:Yu}},[e("span")])},renderCheckIcon:function(e){return e("i",{class:"el-icon-check el-cascader-node__prefix"})},renderLoadingIcon:function(e){return e("i",{class:"el-icon-loading el-cascader-node__postfix"})},renderExpandIcon:function(e){return e("i",{class:"el-icon-arrow-right el-cascader-node__postfix"})},renderContent:function(e){var t=this.panel,i=this.node,n=t.renderLabelFn;return e("span",{class:"el-cascader-node__label"},[(n?n({node:i,data:i.data}):null)||i.label])}},render:function(e){var t=this,i=this.inActivePath,n=this.inCheckedPath,r=this.isChecked,s=this.isLeaf,a=this.isDisabled,o=this.config,l=this.nodeId,u=o.expandTrigger,c=o.checkStrictly,h=o.multiple,d=!c&&a,p={on:{}};return s?a||c||h||(p.on.click=this.handleCheckChange):"click"===u?p.on.click=this.handleExpand:(p.on.mouseenter=function(e){t.handleExpand(),t.$emit("expand",e)},p.on.focus=function(e){t.handleExpand(),t.$emit("expand",e)}),e("li",Ll()([{attrs:{role:"menuitem",id:l,"aria-expanded":i,tabindex:d?null:-1},class:{"el-cascader-node":!0,"is-selectable":c,"in-active-path":i,"in-checked-path":n,"is-active":r,"is-disabled":d}},p]),[this.renderPrefix(e),this.renderContent(e),this.renderPostfix(e)])}},void 0,void 0,!1,null,null,null);Ku.options.__file="packages/cascader-panel/src/cascader-node.vue";var Gu=r({name:"ElCascaderMenu",mixins:[j],inject:["panel"],components:{ElScrollbar:Ue,CascaderNode:Ku.exports},props:{nodes:{type:Array,required:!0},index:Number},data:function(){return{activeNode:null,hoverTimer:null,id:D()}},computed:{isEmpty:function(){return!this.nodes.length},menuId:function(){return"cascader-menu-"+this.id+"-"+this.index}},methods:{handleExpand:function(e){this.activeNode=e.target},handleMouseMove:function(e){var t=this.activeNode,i=this.hoverTimer,n=this.$refs.hoverZone;if(t&&n)if(t.contains(e.target)){clearTimeout(i);var r=this.$el.getBoundingClientRect().left,s=e.clientX-r,a=this.$el,o=a.offsetWidth,l=a.offsetHeight,u=t.offsetTop,c=u+t.offsetHeight;n.innerHTML='\n          <path style="pointer-events: auto;" fill="transparent" d="M'+s+" "+u+" L"+o+" 0 V"+u+' Z" />\n          <path style="pointer-events: auto;" fill="transparent" d="M'+s+" "+c+" L"+o+" "+l+" V"+c+' Z" />\n        '}else i||(this.hoverTimer=setTimeout(this.clearHoverZone,this.panel.config.hoverThreshold))},clearHoverZone:function(){var e=this.$refs.hoverZone;e&&(e.innerHTML="")},renderEmptyText:function(e){return e("div",{class:"el-cascader-menu__empty-text"},[this.t("el.cascader.noData")])},renderNodeList:function(e){var t=this.menuId,i=this.panel.isHoverMenu,n={on:{}};i&&(n.on.expand=this.handleExpand);var r=this.nodes.map(function(i,r){var s=i.hasChildren;return e("cascader-node",Ll()([{key:i.uid,attrs:{node:i,"node-id":t+"-"+r,"aria-haspopup":s,"aria-owns":s?t:null}},n]))});return[].concat(r,[i?e("svg",{ref:"hoverZone",class:"el-cascader-menu__hover-zone"}):null])}},render:function(e){var t=this.isEmpty,i=this.menuId,n={nativeOn:{}};return this.panel.isHoverMenu&&(n.nativeOn.mousemove=this.handleMouseMove),e("el-scrollbar",Ll()([{attrs:{tag:"ul",role:"menu",id:i,"wrap-class":"el-cascader-menu__wrap","view-class":{"el-cascader-menu__list":!0,"is-empty":t}},class:"el-cascader-menu"},n]),[t?this.renderEmptyText(e):this.renderNodeList(e)])}},void 0,void 0,!1,null,null,null);Gu.options.__file="packages/cascader-panel/src/cascader-menu.vue";var Uu=Gu.exports,Xu=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();var Ju=0,Zu=function(){function e(t,i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.config=i,this.parent=n||null,this.level=this.parent?this.parent.level+1:1,this.uid=Ju++,this.initState(),this.initChildren()}return e.prototype.initState=function(){var e=this.config,t=e.value,i=e.label;this.value=this.data[t],this.label=this.data[i],this.pathNodes=this.calculatePathNodes(),this.path=this.pathNodes.map(function(e){return e.value}),this.pathLabels=this.pathNodes.map(function(e){return e.label}),this.loading=!1,this.loaded=!1},e.prototype.initChildren=function(){var t=this,i=this.config,n=i.children,r=this.data[n];this.hasChildren=Array.isArray(r),this.children=(r||[]).map(function(n){return new e(n,i,t)})},e.prototype.calculatePathNodes=function(){for(var e=[this],t=this.parent;t;)e.unshift(t),t=t.parent;return e},e.prototype.getPath=function(){return this.path},e.prototype.getValue=function(){return this.value},e.prototype.getValueByOption=function(){return this.config.emitPath?this.getPath():this.getValue()},e.prototype.getText=function(e,t){return e?this.pathLabels.join(t):this.label},e.prototype.isSameNode=function(e){var t=this.getValueByOption();return this.config.multiple&&Array.isArray(e)?e.some(function(e){return I(e,t)}):I(e,t)},e.prototype.broadcast=function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];var r="onParent"+N(e);this.children.forEach(function(t){t&&(t.broadcast.apply(t,[e].concat(i)),t[r]&&t[r].apply(t,i))})},e.prototype.emit=function(e){var t=this.parent,i="onChild"+N(e);if(t){for(var n=arguments.length,r=Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];t[i]&&t[i].apply(t,r),t.emit.apply(t,[e].concat(r))}},e.prototype.onParentCheck=function(e){this.isDisabled||this.setCheckState(e)},e.prototype.onChildCheck=function(){var e=this.children.filter(function(e){return!e.isDisabled}),t=!!e.length&&e.every(function(e){return e.checked});this.setCheckState(t)},e.prototype.setCheckState=function(e){var t=this.children.length,i=this.children.reduce(function(e,t){return e+(t.checked?1:t.indeterminate?.5:0)},0);this.checked=e,this.indeterminate=i!==t&&i>0},e.prototype.syncCheckState=function(e){var t=this.getValueByOption(),i=this.isSameNode(e,t);this.doCheck(i)},e.prototype.doCheck=function(e){this.checked!==e&&(this.config.checkStrictly?this.checked=e:(this.broadcast("check",e),this.setCheckState(e),this.emit("check")))},Xu(e,[{key:"isDisabled",get:function(){var e=this.data,t=this.parent,i=this.config,n=i.disabled,r=i.checkStrictly;return e[n]||!r&&t&&t.isDisabled}},{key:"isLeaf",get:function(){var e=this.data,t=this.loaded,i=this.hasChildren,n=this.children,r=this.config,s=r.lazy,a=r.leaf;if(s){var o=st(e[a])?e[a]:!!t&&!n.length;return this.hasChildren=!o,o}return!i}}]),e}();var Qu=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=i,this.initNodes(t)}return e.prototype.initNodes=function(e){var t=this;e=M(e),this.nodes=e.map(function(e){return new Zu(e,t.config)}),this.flattedNodes=this.getFlattedNodes(!1,!1),this.leafNodes=this.getFlattedNodes(!0,!1)},e.prototype.appendNode=function(e,t){var i=new Zu(e,this.config,t);(t?t.children:this.nodes).push(i)},e.prototype.appendNodes=function(e,t){var i=this;(e=M(e)).forEach(function(e){return i.appendNode(e,t)})},e.prototype.getNodes=function(){return this.nodes},e.prototype.getFlattedNodes=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=e?this.leafNodes:this.flattedNodes;return t?i:function e(t,i){return t.reduce(function(t,n){return n.isLeaf?t.push(n):(!i&&t.push(n),t=t.concat(e(n.children,i))),t},[])}(this.nodes,e)},e.prototype.getNodeByValue=function(e){if(e){e=Array.isArray(e)?e[e.length-1]:e;var t=this.getFlattedNodes(!1,!this.config.lazy).filter(function(t){return t.value===e});return t&&t.length?t[0]:null}return null},e}(),ec=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},tc=Wt.keys,ic={expandTrigger:"click",multiple:!1,checkStrictly:!1,emitPath:!0,lazy:!1,lazyLoad:x,value:"value",label:"label",children:"children",leaf:"leaf",disabled:"disabled",hoverThreshold:500},nc=function(e){return!e.getAttribute("aria-owns")},rc=function(e,t){var i=e.parentNode;if(i){var n=i.querySelectorAll('.el-cascader-node[tabindex="-1"]');return n[Array.prototype.indexOf.call(n,e)+t]||null}return null},sc=function(e,t){if(e){var i=e.id.split("-");return Number(i[i.length-2])}},ac=function(e){e&&(e.focus(),!nc(e)&&e.click())},oc=r({name:"ElCascaderPanel",components:{CascaderMenu:Uu},props:{value:{},options:Array,props:Object,border:{type:Boolean,default:!0},renderLabel:Function},provide:function(){return{panel:this}},data:function(){return{checkedValue:null,checkedNodePaths:[],store:[],menus:[],activePath:[]}},computed:{config:function(){return J(ec({},ic),this.props||{})},multiple:function(){return this.config.multiple},checkStrictly:function(){return this.config.checkStrictly},leafOnly:function(){return!this.checkStrictly},isHoverMenu:function(){return"hover"===this.config.expandTrigger},renderLabelFn:function(){return this.renderLabel||this.$scopedSlots.default}},watch:{options:{handler:function(){this.initStore()},immediate:!0,deep:!0},value:function(){this.syncCheckedValue(),this.checkStrictly&&this.calculateCheckedNodePaths()},checkedValue:function(e){I(e,this.value)||(this.checkStrictly&&this.calculateCheckedNodePaths(),this.$emit("input",e),this.$emit("change",e))}},mounted:function(){F(this.value)||this.syncCheckedValue()},methods:{initStore:function(){var e=this.config,t=this.options;e.lazy&&F(t)?this.lazyLoad():(this.store=new Qu(t,e),this.menus=[this.store.getNodes()],this.syncMenuState())},syncCheckedValue:function(){var e=this.value,t=this.checkedValue;I(e,t)||(this.checkedValue=e,this.syncMenuState())},syncMenuState:function(){var e=this.multiple,t=this.checkStrictly;this.syncActivePath(),e&&this.syncMultiCheckState(),t&&this.calculateCheckedNodePaths(),this.$nextTick(this.scrollIntoView)},syncMultiCheckState:function(){var e=this;this.getFlattedNodes(this.leafOnly).forEach(function(t){t.syncCheckState(e.checkedValue)})},syncActivePath:function(){var e=this,t=this.checkedValue,i=this.store,n=this.multiple;if(F(t))this.activePath=[],this.menus=[i.getNodes()];else{t=n?t[0]:t;for(var r=[],s=(this.getNodeByValue(t)||{}).parent;s;)r.unshift(s),s=s.parent;r.forEach(function(t){return e.handleExpand(t,!0)})}},calculateCheckedNodePaths:function(){var e=this,t=this.checkedValue,i=this.multiple?M(t):[t];this.checkedNodePaths=i.map(function(t){var i=e.getNodeByValue(t);return i?i.pathNodes:[]})},handleKeyDown:function(e){var t=e.target;switch(e.keyCode){case tc.up:var i=rc(t,-1);ac(i);break;case tc.down:var n=rc(t,1);ac(n);break;case tc.left:var r=this.$refs.menu[sc(t)-1];if(r){var s=r.$el.querySelector('.el-cascader-node[aria-expanded="true"]');ac(s)}break;case tc.right:var a=this.$refs.menu[sc(t)+1];if(a){var o=a.$el.querySelector('.el-cascader-node[tabindex="-1"]');ac(o)}break;case tc.enter:!function(e){if(e){var t=e.querySelector("input");t?t.click():nc(e)&&e.click()}}(t);break;case tc.esc:case tc.tab:this.$emit("close");break;default:return}},handleExpand:function(e,t){var i=e.level,n=this.activePath.slice(0,i-1),r=this.menus.slice(0,i);if(e.isLeaf||(n.push(e),r.push(e.children)),!$(n,this.activePath)&&(this.activePath=n,this.menus=r,!t)){var s=n.map(function(e){return e.getValue()});this.$emit("active-item-change",s),this.$emit("expand-change",s)}},handleCheckChange:function(e){this.checkedValue=e},lazyLoad:function(e,t){var i=this,n=this.config;e||(e=e||{root:!0,level:0},this.store=new Qu([],n),this.menus=[this.store.getNodes()]),e.loading=!0;n.lazyLoad(e,function(n){var r=e.root?null:e;n&&n.length&&i.store.appendNodes(n,r),e.loading=!1,e.loaded=!0,t&&t(n)})},calculateMultiCheckedValue:function(){this.checkedValue=this.getCheckedNodes(this.leafOnly).map(function(e){return e.getValueByOption()})},scrollIntoView:function(){this.$isServer||(this.$refs.menu||[]).forEach(function(e){var t=e.$el;t&&rt(t.querySelector(".el-scrollbar__wrap"),t.querySelector(".el-cascader-node.is-active")||t.querySelector(".el-cascader-node.in-active-path"))})},getNodeByValue:function(e){return this.store.getNodeByValue(e)},getFlattedNodes:function(e){var t=!this.config.lazy;return this.store.getFlattedNodes(e,t)},getCheckedNodes:function(e){var t=this.checkedValue;return this.multiple?this.getFlattedNodes(e).filter(function(e){return e.checked}):F(t)?[]:[this.getNodeByValue(t)]},clearCheckedNodes:function(){var e=this.config,t=this.leafOnly,i=e.multiple,n=e.emitPath;i?(this.getCheckedNodes(t).filter(function(e){return!e.isDisabled}).forEach(function(e){return e.doCheck(!1)}),this.calculateMultiCheckedValue()):this.checkedValue=n?[]:null}}},qu,[],!1,null,null,null);oc.options.__file="packages/cascader-panel/src/cascader-panel.vue";var lc=oc.exports;lc.install=function(e){e.component(lc.name,lc)};var uc=lc,cc=Wt.keys,hc={expandTrigger:{newProp:"expandTrigger",type:String},changeOnSelect:{newProp:"checkStrictly",type:Boolean},hoverThreshold:{newProp:"hoverThreshold",type:Number}},dc={props:{placement:{type:String,default:"bottom-start"},appendToBody:Me.props.appendToBody,visibleArrow:{type:Boolean,default:!0},arrowOffset:Me.props.arrowOffset,offset:Me.props.offset,boundariesPadding:Me.props.boundariesPadding,popperOptions:Me.props.popperOptions},methods:Me.methods,data:Me.data,beforeDestroy:Me.beforeDestroy},pc={medium:36,small:32,mini:28},fc=r({name:"ElCascader",directives:{Clickoutside:nt},mixins:[dc,l,j,Y],inject:{elForm:{default:""},elFormItem:{default:""}},components:{ElInput:ee,ElTag:Be,ElScrollbar:Ue,ElCascaderPanel:uc},props:{value:{},options:Array,props:Object,size:String,placeholder:{type:String,default:function(){return R("el.cascader.placeholder")}},disabled:Boolean,clearable:Boolean,filterable:Boolean,filterMethod:Function,separator:{type:String,default:" / "},showAllLevels:{type:Boolean,default:!0},collapseTags:Boolean,debounce:{type:Number,default:300},beforeFilter:{type:Function,default:function(){return function(){}}},popperClass:String},data:function(){return{dropDownVisible:!1,checkedValue:this.value||null,inputHover:!1,inputValue:null,presentText:null,presentTags:[],checkedNodes:[],filtering:!1,suggestions:[],inputInitialHeight:0,pressDeleteCount:0}},computed:{realSize:function(){var e=(this.elFormItem||{}).elFormItemSize;return this.size||e||(this.$ELEMENT||{}).size},tagSize:function(){return["small","mini"].indexOf(this.realSize)>-1?"mini":"small"},isDisabled:function(){return this.disabled||(this.elForm||{}).disabled},config:function(){var e=this.props||{},t=this.$attrs;return Object.keys(hc).forEach(function(i){var n=hc[i],r=n.newProp,s=n.type,a=t[i]||t[P(i)];st(i)&&!st(e[r])&&(s===Boolean&&""===a&&(a=!0),e[r]=a)}),e},multiple:function(){return this.config.multiple},leafOnly:function(){return!this.config.checkStrictly},readonly:function(){return!this.filterable||this.multiple},clearBtnVisible:function(){return!(!this.clearable||this.isDisabled||this.filtering||!this.inputHover)&&(this.multiple?!!this.checkedNodes.filter(function(e){return!e.isDisabled}).length:!!this.presentText)},panel:function(){return this.$refs.panel}},watch:{value:function(e){I(e,this.checkedValue)||(this.checkedValue=e,this.computePresentContent())},checkedValue:function(e){var t=this.value;I(e,t)&&!b(t)||(this.$emit("input",e),this.$emit("change",e),this.dispatch("ElFormItem","el.form.change",[e]),this.computePresentContent())},options:{handler:function(){this.$nextTick(this.computePresentContent)},deep:!0},presentText:function(e){this.inputValue=e},presentTags:function(e,t){this.multiple&&(e.length||t.length)&&this.$nextTick(this.updateStyle)},filtering:function(e){this.$nextTick(this.updatePopper)}},mounted:function(){var e=this,t=this.$refs.input;t&&t.$el&&(this.inputInitialHeight=t.$el.offsetHeight||pc[this.realSize]||40),F(this.value)||this.computePresentContent(),this.filterHandler=Je()(this.debounce,function(){var t=e.inputValue;if(t){var i=e.beforeFilter(t);i&&i.then?i.then(e.getSuggestions):!1!==i?e.getSuggestions():e.filtering=!1}else e.filtering=!1}),We(this.$el,this.updateStyle)},beforeDestroy:function(){je(this.$el,this.updateStyle)},methods:{getMigratingConfig:function(){return{props:{"expand-trigger":"expand-trigger is removed, use `props.expandTrigger` instead.","change-on-select":"change-on-select is removed, use `props.checkStrictly` instead.","hover-threshold":"hover-threshold is removed, use `props.hoverThreshold` instead"},events:{"active-item-change":"active-item-change is renamed to expand-change"}}},toggleDropDownVisible:function(e){var t=this;if(!this.isDisabled){var i=this.dropDownVisible,n=this.$refs.input;(e=st(e)?e:!i)!==i&&(this.dropDownVisible=e,e&&this.$nextTick(function(){t.updatePopper(),t.panel.scrollIntoView()}),n.$refs.input.setAttribute("aria-expanded",e),this.$emit("visible-change",e))}},handleDropdownLeave:function(){this.filtering=!1,this.inputValue=this.presentText},handleKeyDown:function(e){switch(e.keyCode){case cc.enter:this.toggleDropDownVisible();break;case cc.down:this.toggleDropDownVisible(!0),this.focusFirstNode(),e.preventDefault();break;case cc.esc:case cc.tab:this.toggleDropDownVisible(!1)}},handleFocus:function(e){this.$emit("focus",e)},handleBlur:function(e){this.$emit("blur",e)},handleInput:function(e,t){!this.dropDownVisible&&this.toggleDropDownVisible(!0),t&&t.isComposing||(e?this.filterHandler():this.filtering=!1)},handleClear:function(){this.presentText="",this.panel.clearCheckedNodes()},handleExpandChange:function(e){this.$nextTick(this.updatePopper.bind(this)),this.$emit("expand-change",e),this.$emit("active-item-change",e)},focusFirstNode:function(){var e=this;this.$nextTick(function(){var t=e.filtering,i=e.$refs,n=i.popper,r=i.suggestionPanel,s=null;t&&r?s=r.$el.querySelector(".el-cascader__suggestion-item"):s=n.querySelector(".el-cascader-menu").querySelector('.el-cascader-node[tabindex="-1"]');s&&(s.focus(),!t&&s.click())})},computePresentContent:function(){var e=this;this.$nextTick(function(){var t=e.config,i=t.multiple,n=t.checkStrictly;i?(e.computePresentTags(),e.presentText=e.presentTags.length?" ":null):(e.computePresentText(),!n&&e.dropDownVisible&&e.toggleDropDownVisible(!1))})},computePresentText:function(){var e=this.checkedValue,t=this.config;if(!F(e)){var i=this.panel.getNodeByValue(e);if(i&&(t.checkStrictly||i.isLeaf))return void(this.presentText=i.getText(this.showAllLevels,this.separator))}this.presentText=null},computePresentTags:function(){var e=this.isDisabled,t=this.leafOnly,i=this.showAllLevels,n=this.separator,r=this.collapseTags,s=this.getCheckedNodes(t),a=[],o=function(t){return{node:t,key:t.uid,text:t.getText(i,n),hitState:!1,closable:!e&&!t.isDisabled}};if(s.length){var l=s[0],u=s.slice(1),c=u.length;a.push(o(l)),c&&(r?a.push({key:-1,text:"+ "+c,closable:!1}):u.forEach(function(e){return a.push(o(e))}))}this.checkedNodes=s,this.presentTags=a},getSuggestions:function(){var e=this,t=this.filterMethod;g(t)||(t=function(e,t){return e.text.includes(t)});var i=this.panel.getFlattedNodes(this.leafOnly).filter(function(i){return!i.isDisabled&&(i.text=i.getText(e.showAllLevels,e.separator)||"",t(i,e.inputValue))});this.multiple?this.presentTags.forEach(function(e){e.hitState=!1}):i.forEach(function(t){t.checked=I(e.checkedValue,t.getValueByOption())}),this.filtering=!0,this.suggestions=i,this.$nextTick(this.updatePopper)},handleSuggestionKeyDown:function(e){var t=e.keyCode,i=e.target;switch(t){case cc.enter:i.click();break;case cc.up:var n=i.previousElementSibling;n&&n.focus();break;case cc.down:var r=i.nextElementSibling;r&&r.focus();break;case cc.esc:case cc.tab:this.toggleDropDownVisible(!1)}},handleDelete:function(){var e=this.inputValue,t=this.pressDeleteCount,i=this.presentTags,n=i.length-1,r=i[n];this.pressDeleteCount=e?0:t+1,r&&this.pressDeleteCount&&(r.hitState?this.deleteTag(n):r.hitState=!0)},handleSuggestionClick:function(e){var t=this.multiple,i=this.suggestions[e];if(t){var n=i.checked;i.doCheck(!n),this.panel.calculateMultiCheckedValue()}else this.checkedValue=i.getValueByOption(),this.toggleDropDownVisible(!1)},deleteTag:function(e){var t=this.checkedValue,i=t[e];this.checkedValue=t.filter(function(t,i){return i!==e}),this.$emit("remove-tag",i)},updateStyle:function(){var e=this.$el,t=this.inputInitialHeight;if(!this.$isServer&&e){var i=this.$refs.suggestionPanel,n=e.querySelector(".el-input__inner");if(n){var r=e.querySelector(".el-cascader__tags"),s=null;if(i&&(s=i.$el))s.querySelector(".el-cascader__suggestion-list").style.minWidth=n.offsetWidth+"px";if(r){var a=r.offsetHeight,o=Math.max(a+6,t)+"px";n.style.height=o,this.updatePopper()}}}},getCheckedNodes:function(e){return this.panel.getCheckedNodes(e)}}},ju,[],!1,null,null,null);fc.options.__file="packages/cascader/src/cascader.vue";var mc=fc.exports;mc.install=function(e){e.component(mc.name,mc)};var vc=mc,gc=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.hide,expression:"hide"}],class:["el-color-picker",e.colorDisabled?"is-disabled":"",e.colorSize?"el-color-picker--"+e.colorSize:""]},[e.colorDisabled?i("div",{staticClass:"el-color-picker__mask"}):e._e(),i("div",{staticClass:"el-color-picker__trigger",on:{click:e.handleTrigger}},[i("span",{staticClass:"el-color-picker__color",class:{"is-alpha":e.showAlpha}},[i("span",{staticClass:"el-color-picker__color-inner",style:{backgroundColor:e.displayedColor}}),e.value||e.showPanelColor?e._e():i("span",{staticClass:"el-color-picker__empty el-icon-close"})]),i("span",{directives:[{name:"show",rawName:"v-show",value:e.value||e.showPanelColor,expression:"value || showPanelColor"}],staticClass:"el-color-picker__icon el-icon-arrow-down"})]),i("picker-dropdown",{ref:"dropdown",class:["el-color-picker__panel",e.popperClass||""],attrs:{color:e.color,"show-alpha":e.showAlpha,predefine:e.predefine},on:{pick:e.confirmValue,clear:e.clearValue},model:{value:e.showPicker,callback:function(t){e.showPicker=t},expression:"showPicker"}})],1)};gc._withStripped=!0;var bc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var yc=function(e,t,i){return[e,t*i/((e=(2-t)*i)<1?e:2-e)||0,e/2]},wc=function(e,t){var i;"string"==typeof(i=e)&&-1!==i.indexOf(".")&&1===parseFloat(i)&&(e="100%");var n=function(e){return"string"==typeof e&&-1!==e.indexOf("%")}(e);return e=Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(e*t,10)/100),Math.abs(e-t)<1e-6?1:e%t/parseFloat(t)},xc={10:"A",11:"B",12:"C",13:"D",14:"E",15:"F"},_c={A:10,B:11,C:12,D:13,E:14,F:15},Cc=function(e){return 2===e.length?16*(_c[e[0].toUpperCase()]||+e[0])+(_c[e[1].toUpperCase()]||+e[1]):_c[e[1].toUpperCase()]||+e[1]},kc=function(e,t,i){e=wc(e,255),t=wc(t,255),i=wc(i,255);var n,r=Math.max(e,t,i),s=Math.min(e,t,i),a=void 0,o=r,l=r-s;if(n=0===r?0:l/r,r===s)a=0;else{switch(r){case e:a=(t-i)/l+(t<i?6:0);break;case t:a=(i-e)/l+2;break;case i:a=(e-t)/l+4}a/=6}return{h:360*a,s:100*n,v:100*o}},Sc=function(e,t,i){e=6*wc(e,360),t=wc(t,100),i=wc(i,100);var n=Math.floor(e),r=e-n,s=i*(1-t),a=i*(1-r*t),o=i*(1-(1-r)*t),l=n%6,u=[i,a,s,s,o,i][l],c=[o,i,i,a,s,s][l],h=[s,s,o,i,i,a][l];return{r:Math.round(255*u),g:Math.round(255*c),b:Math.round(255*h)}},Dc=function(){function e(t){for(var i in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._hue=0,this._saturation=100,this._value=100,this._alpha=100,this.enableAlpha=!1,this.format="hex",this.value="",t=t||{})t.hasOwnProperty(i)&&(this[i]=t[i]);this.doOnChange()}return e.prototype.set=function(e,t){if(1!==arguments.length||"object"!==(void 0===e?"undefined":bc(e)))this["_"+e]=t,this.doOnChange();else for(var i in e)e.hasOwnProperty(i)&&this.set(i,e[i])},e.prototype.get=function(e){return this["_"+e]},e.prototype.toRgb=function(){return Sc(this._hue,this._saturation,this._value)},e.prototype.fromString=function(e){var t=this;if(!e)return this._hue=0,this._saturation=100,this._value=100,void this.doOnChange();var i=function(e,i,n){t._hue=Math.max(0,Math.min(360,e)),t._saturation=Math.max(0,Math.min(100,i)),t._value=Math.max(0,Math.min(100,n)),t.doOnChange()};if(-1!==e.indexOf("hsl")){var n=e.replace(/hsla|hsl|\(|\)/gm,"").split(/\s|,/g).filter(function(e){return""!==e}).map(function(e,t){return t>2?parseFloat(e):parseInt(e,10)});if(4===n.length?this._alpha=Math.floor(100*parseFloat(n[3])):3===n.length&&(this._alpha=100),n.length>=3){var r=function(e,t,i){i/=100;var n=t/=100,r=Math.max(i,.01);return t*=(i*=2)<=1?i:2-i,n*=r<=1?r:2-r,{h:e,s:100*(0===i?2*n/(r+n):2*t/(i+t)),v:(i+t)/2*100}}(n[0],n[1],n[2]);i(r.h,r.s,r.v)}}else if(-1!==e.indexOf("hsv")){var s=e.replace(/hsva|hsv|\(|\)/gm,"").split(/\s|,/g).filter(function(e){return""!==e}).map(function(e,t){return t>2?parseFloat(e):parseInt(e,10)});4===s.length?this._alpha=Math.floor(100*parseFloat(s[3])):3===s.length&&(this._alpha=100),s.length>=3&&i(s[0],s[1],s[2])}else if(-1!==e.indexOf("rgb")){var a=e.replace(/rgba|rgb|\(|\)/gm,"").split(/\s|,/g).filter(function(e){return""!==e}).map(function(e,t){return t>2?parseFloat(e):parseInt(e,10)});if(4===a.length?this._alpha=Math.floor(100*parseFloat(a[3])):3===a.length&&(this._alpha=100),a.length>=3){var o=kc(a[0],a[1],a[2]);i(o.h,o.s,o.v)}}else if(-1!==e.indexOf("#")){var l=e.replace("#","").trim();if(!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(l))return;var u=void 0,c=void 0,h=void 0;3===l.length?(u=Cc(l[0]+l[0]),c=Cc(l[1]+l[1]),h=Cc(l[2]+l[2])):6!==l.length&&8!==l.length||(u=Cc(l.substring(0,2)),c=Cc(l.substring(2,4)),h=Cc(l.substring(4,6))),8===l.length?this._alpha=Math.floor(Cc(l.substring(6))/255*100):3!==l.length&&6!==l.length||(this._alpha=100);var d=kc(u,c,h);i(d.h,d.s,d.v)}},e.prototype.compare=function(e){return Math.abs(e._hue-this._hue)<2&&Math.abs(e._saturation-this._saturation)<1&&Math.abs(e._value-this._value)<1&&Math.abs(e._alpha-this._alpha)<1},e.prototype.doOnChange=function(){var e=this._hue,t=this._saturation,i=this._value,n=this._alpha,r=this.format;if(this.enableAlpha)switch(r){case"hsl":var s=yc(e,t/100,i/100);this.value="hsla("+e+", "+Math.round(100*s[1])+"%, "+Math.round(100*s[2])+"%, "+n/100+")";break;case"hsv":this.value="hsva("+e+", "+Math.round(t)+"%, "+Math.round(i)+"%, "+n/100+")";break;default:var a=Sc(e,t,i),o=a.r,l=a.g,u=a.b;this.value="rgba("+o+", "+l+", "+u+", "+n/100+")"}else switch(r){case"hsl":var c=yc(e,t/100,i/100);this.value="hsl("+e+", "+Math.round(100*c[1])+"%, "+Math.round(100*c[2])+"%)";break;case"hsv":this.value="hsv("+e+", "+Math.round(t)+"%, "+Math.round(i)+"%)";break;case"rgb":var h=Sc(e,t,i),d=h.r,p=h.g,f=h.b;this.value="rgb("+d+", "+p+", "+f+")";break;default:this.value=function(e){var t=e.r,i=e.g,n=e.b,r=function(e){e=Math.min(Math.round(e),255);var t=Math.floor(e/16),i=e%16;return""+(xc[t]||t)+(xc[i]||i)};return isNaN(t)||isNaN(i)||isNaN(n)?"":"#"+r(t)+r(i)+r(n)}(Sc(e,t,i))}},e}(),$c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-zoom-in-top"},on:{"after-leave":e.doDestroy}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.showPopper,expression:"showPopper"}],staticClass:"el-color-dropdown"},[i("div",{staticClass:"el-color-dropdown__main-wrapper"},[i("hue-slider",{ref:"hue",staticStyle:{float:"right"},attrs:{color:e.color,vertical:""}}),i("sv-panel",{ref:"sl",attrs:{color:e.color}})],1),e.showAlpha?i("alpha-slider",{ref:"alpha",attrs:{color:e.color}}):e._e(),e.predefine?i("predefine",{attrs:{color:e.color,colors:e.predefine}}):e._e(),i("div",{staticClass:"el-color-dropdown__btns"},[i("span",{staticClass:"el-color-dropdown__value"},[i("el-input",{attrs:{"validate-event":!1,size:"mini"},on:{blur:e.handleConfirm},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleConfirm(t):null}},model:{value:e.customInput,callback:function(t){e.customInput=t},expression:"customInput"}})],1),i("el-button",{staticClass:"el-color-dropdown__link-btn",attrs:{size:"mini",type:"text"},on:{click:function(t){e.$emit("clear")}}},[e._v("\n        "+e._s(e.t("el.colorpicker.clear"))+"\n      ")]),i("el-button",{staticClass:"el-color-dropdown__btn",attrs:{plain:"",size:"mini"},on:{click:e.confirmValue}},[e._v("\n        "+e._s(e.t("el.colorpicker.confirm"))+"\n      ")])],1)],1)])};$c._withStripped=!0;var Ec=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"el-color-svpanel",style:{backgroundColor:this.background}},[t("div",{staticClass:"el-color-svpanel__white"}),t("div",{staticClass:"el-color-svpanel__black"}),t("div",{staticClass:"el-color-svpanel__cursor",style:{top:this.cursorTop+"px",left:this.cursorLeft+"px"}},[t("div")])])};Ec._withStripped=!0;var Tc=!1,Mc=function(e,t){if(!h.a.prototype.$isServer){var i=function(e){t.drag&&t.drag(e)},n=function e(n){document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",e),document.onselectstart=null,document.ondragstart=null,Tc=!1,t.end&&t.end(n)};e.addEventListener("mousedown",function(e){Tc||(document.onselectstart=function(){return!1},document.ondragstart=function(){return!1},document.addEventListener("mousemove",i),document.addEventListener("mouseup",n),Tc=!0,t.start&&t.start(e))})}},Pc=r({name:"el-sl-panel",props:{color:{required:!0}},computed:{colorValue:function(){return{hue:this.color.get("hue"),value:this.color.get("value")}}},watch:{colorValue:function(){this.update()}},methods:{update:function(){var e=this.color.get("saturation"),t=this.color.get("value"),i=this.$el,n=i.clientWidth,r=i.clientHeight;this.cursorLeft=e*n/100,this.cursorTop=(100-t)*r/100,this.background="hsl("+this.color.get("hue")+", 100%, 50%)"},handleDrag:function(e){var t=this.$el.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;i=Math.max(0,i),i=Math.min(i,t.width),n=Math.max(0,n),n=Math.min(n,t.height),this.cursorLeft=i,this.cursorTop=n,this.color.set({saturation:i/t.width*100,value:100-n/t.height*100})}},mounted:function(){var e=this;Mc(this.$el,{drag:function(t){e.handleDrag(t)},end:function(t){e.handleDrag(t)}}),this.update()},data:function(){return{cursorTop:0,cursorLeft:0,background:"hsl(0, 100%, 50%)"}}},Ec,[],!1,null,null,null);Pc.options.__file="packages/color-picker/src/components/sv-panel.vue";var Nc=Pc.exports,Oc=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"el-color-hue-slider",class:{"is-vertical":this.vertical}},[t("div",{ref:"bar",staticClass:"el-color-hue-slider__bar",on:{click:this.handleClick}}),t("div",{ref:"thumb",staticClass:"el-color-hue-slider__thumb",style:{left:this.thumbLeft+"px",top:this.thumbTop+"px"}})])};Oc._withStripped=!0;var Ic=r({name:"el-color-hue-slider",props:{color:{required:!0},vertical:Boolean},data:function(){return{thumbLeft:0,thumbTop:0}},computed:{hueValue:function(){return this.color.get("hue")}},watch:{hueValue:function(){this.update()}},methods:{handleClick:function(e){var t=this.$refs.thumb;e.target!==t&&this.handleDrag(e)},handleDrag:function(e){var t=this.$el.getBoundingClientRect(),i=this.$refs.thumb,n=void 0;if(this.vertical){var r=e.clientY-t.top;r=Math.min(r,t.height-i.offsetHeight/2),r=Math.max(i.offsetHeight/2,r),n=Math.round((r-i.offsetHeight/2)/(t.height-i.offsetHeight)*360)}else{var s=e.clientX-t.left;s=Math.min(s,t.width-i.offsetWidth/2),s=Math.max(i.offsetWidth/2,s),n=Math.round((s-i.offsetWidth/2)/(t.width-i.offsetWidth)*360)}this.color.set("hue",n)},getThumbLeft:function(){if(this.vertical)return 0;var e=this.$el,t=this.color.get("hue");if(!e)return 0;var i=this.$refs.thumb;return Math.round(t*(e.offsetWidth-i.offsetWidth/2)/360)},getThumbTop:function(){if(!this.vertical)return 0;var e=this.$el,t=this.color.get("hue");if(!e)return 0;var i=this.$refs.thumb;return Math.round(t*(e.offsetHeight-i.offsetHeight/2)/360)},update:function(){this.thumbLeft=this.getThumbLeft(),this.thumbTop=this.getThumbTop()}},mounted:function(){var e=this,t=this.$refs,i=t.bar,n=t.thumb,r={drag:function(t){e.handleDrag(t)},end:function(t){e.handleDrag(t)}};Mc(i,r),Mc(n,r),this.update()}},Oc,[],!1,null,null,null);Ic.options.__file="packages/color-picker/src/components/hue-slider.vue";var Fc=Ic.exports,Ac=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"el-color-alpha-slider",class:{"is-vertical":this.vertical}},[t("div",{ref:"bar",staticClass:"el-color-alpha-slider__bar",style:{background:this.background},on:{click:this.handleClick}}),t("div",{ref:"thumb",staticClass:"el-color-alpha-slider__thumb",style:{left:this.thumbLeft+"px",top:this.thumbTop+"px"}})])};Ac._withStripped=!0;var Lc=r({name:"el-color-alpha-slider",props:{color:{required:!0},vertical:Boolean},watch:{"color._alpha":function(){this.update()},"color.value":function(){this.update()}},methods:{handleClick:function(e){var t=this.$refs.thumb;e.target!==t&&this.handleDrag(e)},handleDrag:function(e){var t=this.$el.getBoundingClientRect(),i=this.$refs.thumb;if(this.vertical){var n=e.clientY-t.top;n=Math.max(i.offsetHeight/2,n),n=Math.min(n,t.height-i.offsetHeight/2),this.color.set("alpha",Math.round((n-i.offsetHeight/2)/(t.height-i.offsetHeight)*100))}else{var r=e.clientX-t.left;r=Math.max(i.offsetWidth/2,r),r=Math.min(r,t.width-i.offsetWidth/2),this.color.set("alpha",Math.round((r-i.offsetWidth/2)/(t.width-i.offsetWidth)*100))}},getThumbLeft:function(){if(this.vertical)return 0;var e=this.$el,t=this.color._alpha;if(!e)return 0;var i=this.$refs.thumb;return Math.round(t*(e.offsetWidth-i.offsetWidth/2)/100)},getThumbTop:function(){if(!this.vertical)return 0;var e=this.$el,t=this.color._alpha;if(!e)return 0;var i=this.$refs.thumb;return Math.round(t*(e.offsetHeight-i.offsetHeight/2)/100)},getBackground:function(){if(this.color&&this.color.value){var e=this.color.toRgb(),t=e.r,i=e.g,n=e.b;return"linear-gradient(to right, rgba("+t+", "+i+", "+n+", 0) 0%, rgba("+t+", "+i+", "+n+", 1) 100%)"}return null},update:function(){this.thumbLeft=this.getThumbLeft(),this.thumbTop=this.getThumbTop(),this.background=this.getBackground()}},data:function(){return{thumbLeft:0,thumbTop:0,background:null}},mounted:function(){var e=this,t=this.$refs,i=t.bar,n=t.thumb,r={drag:function(t){e.handleDrag(t)},end:function(t){e.handleDrag(t)}};Mc(i,r),Mc(n,r),this.update()}},Ac,[],!1,null,null,null);Lc.options.__file="packages/color-picker/src/components/alpha-slider.vue";var Vc=Lc.exports,Bc=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-color-predefine"},[i("div",{staticClass:"el-color-predefine__colors"},e._l(e.rgbaColors,function(t,n){return i("div",{key:e.colors[n],staticClass:"el-color-predefine__color-selector",class:{selected:t.selected,"is-alpha":t._alpha<100},on:{click:function(t){e.handleSelect(n)}}},[i("div",{style:{"background-color":t.value}})])}),0)])};Bc._withStripped=!0;var zc=r({props:{colors:{type:Array,required:!0},color:{required:!0}},data:function(){return{rgbaColors:this.parseColors(this.colors,this.color)}},methods:{handleSelect:function(e){this.color.fromString(this.colors[e])},parseColors:function(e,t){return e.map(function(e){var i=new Dc;return i.enableAlpha=!0,i.format="rgba",i.fromString(e),i.selected=i.value===t.value,i})}},watch:{"$parent.currentColor":function(e){var t=new Dc;t.fromString(e),this.rgbaColors.forEach(function(e){e.selected=t.compare(e)})},colors:function(e){this.rgbaColors=this.parseColors(e,this.color)},color:function(e){this.rgbaColors=this.parseColors(this.colors,e)}}},Bc,[],!1,null,null,null);zc.options.__file="packages/color-picker/src/components/predefine.vue";var Hc=zc.exports,Rc=r({name:"el-color-picker-dropdown",mixins:[Me,j],components:{SvPanel:Nc,HueSlider:Fc,AlphaSlider:Vc,ElInput:ee,ElButton:Dt,Predefine:Hc},props:{color:{required:!0},showAlpha:Boolean,predefine:Array},data:function(){return{customInput:""}},computed:{currentColor:function(){var e=this.$parent;return e.value||e.showPanelColor?e.color.value:""}},methods:{confirmValue:function(){this.$emit("pick")},handleConfirm:function(){this.color.fromString(this.customInput)}},mounted:function(){this.$parent.popperElm=this.popperElm=this.$el,this.referenceElm=this.$parent.$el},watch:{showPopper:function(e){var t=this;!0===e&&this.$nextTick(function(){var e=t.$refs,i=e.sl,n=e.hue,r=e.alpha;i&&i.update(),n&&n.update(),r&&r.update()})},currentColor:{immediate:!0,handler:function(e){this.customInput=e}}}},$c,[],!1,null,null,null);Rc.options.__file="packages/color-picker/src/components/picker-dropdown.vue";var Wc=Rc.exports,jc=r({name:"ElColorPicker",mixins:[l],props:{value:String,showAlpha:Boolean,colorFormat:String,disabled:Boolean,size:String,popperClass:String,predefine:Array},inject:{elForm:{default:""},elFormItem:{default:""}},directives:{Clickoutside:nt},computed:{displayedColor:function(){return this.value||this.showPanelColor?this.displayedRgb(this.color,this.showAlpha):"transparent"},_elFormItemSize:function(){return(this.elFormItem||{}).elFormItemSize},colorSize:function(){return this.size||this._elFormItemSize||(this.$ELEMENT||{}).size},colorDisabled:function(){return this.disabled||(this.elForm||{}).disabled}},watch:{value:function(e){e?e&&e!==this.color.value&&this.color.fromString(e):this.showPanelColor=!1},color:{deep:!0,handler:function(){this.showPanelColor=!0}},displayedColor:function(e){if(this.showPicker){var t=new Dc({enableAlpha:this.showAlpha,format:this.colorFormat});t.fromString(this.value),e!==this.displayedRgb(t,this.showAlpha)&&this.$emit("active-change",e)}}},methods:{handleTrigger:function(){this.colorDisabled||(this.showPicker=!this.showPicker)},confirmValue:function(){var e=this.color.value;this.$emit("input",e),this.$emit("change",e),this.dispatch("ElFormItem","el.form.change",e),this.showPicker=!1},clearValue:function(){this.$emit("input",null),this.$emit("change",null),null!==this.value&&this.dispatch("ElFormItem","el.form.change",null),this.showPanelColor=!1,this.showPicker=!1,this.resetColor()},hide:function(){this.showPicker=!1,this.resetColor()},resetColor:function(){var e=this;this.$nextTick(function(t){e.value?e.color.fromString(e.value):e.showPanelColor=!1})},displayedRgb:function(e,t){if(!(e instanceof Dc))throw Error("color should be instance of Color Class");var i=e.toRgb(),n=i.r,r=i.g,s=i.b;return t?"rgba("+n+", "+r+", "+s+", "+e.get("alpha")/100+")":"rgb("+n+", "+r+", "+s+")"}},mounted:function(){var e=this.value;e&&this.color.fromString(e),this.popperElm=this.$refs.dropdown.$el},data:function(){return{color:new Dc({enableAlpha:this.showAlpha,format:this.colorFormat}),showPicker:!1,showPanelColor:!1}},components:{PickerDropdown:Wc}},gc,[],!1,null,null,null);jc.options.__file="packages/color-picker/src/main.vue";var qc=jc.exports;qc.install=function(e){e.component(qc.name,qc)};var Yc=qc,Kc=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-transfer"},[i("transfer-panel",e._b({ref:"leftPanel",attrs:{data:e.sourceData,title:e.titles[0]||e.t("el.transfer.titles.0"),"default-checked":e.leftDefaultChecked,placeholder:e.filterPlaceholder||e.t("el.transfer.filterPlaceholder")},on:{"checked-change":e.onSourceCheckedChange}},"transfer-panel",e.$props,!1),[e._t("left-footer")],2),i("div",{staticClass:"el-transfer__buttons"},[i("el-button",{class:["el-transfer__button",e.hasButtonTexts?"is-with-texts":""],attrs:{type:"primary",disabled:0===e.rightChecked.length},nativeOn:{click:function(t){return e.addToLeft(t)}}},[i("i",{staticClass:"el-icon-arrow-left"}),void 0!==e.buttonTexts[0]?i("span",[e._v(e._s(e.buttonTexts[0]))]):e._e()]),i("el-button",{class:["el-transfer__button",e.hasButtonTexts?"is-with-texts":""],attrs:{type:"primary",disabled:0===e.leftChecked.length},nativeOn:{click:function(t){return e.addToRight(t)}}},[void 0!==e.buttonTexts[1]?i("span",[e._v(e._s(e.buttonTexts[1]))]):e._e(),i("i",{staticClass:"el-icon-arrow-right"})])],1),i("transfer-panel",e._b({ref:"rightPanel",attrs:{data:e.targetData,title:e.titles[1]||e.t("el.transfer.titles.1"),"default-checked":e.rightDefaultChecked,placeholder:e.filterPlaceholder||e.t("el.transfer.filterPlaceholder")},on:{"checked-change":e.onTargetCheckedChange}},"transfer-panel",e.$props,!1),[e._t("right-footer")],2)],1)};Kc._withStripped=!0;var Gc=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-transfer-panel"},[i("p",{staticClass:"el-transfer-panel__header"},[i("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleAllCheckedChange},model:{value:e.allChecked,callback:function(t){e.allChecked=t},expression:"allChecked"}},[e._v("\n      "+e._s(e.title)+"\n      "),i("span",[e._v(e._s(e.checkedSummary))])])],1),i("div",{class:["el-transfer-panel__body",e.hasFooter?"is-with-footer":""]},[e.filterable?i("el-input",{staticClass:"el-transfer-panel__filter",attrs:{size:"small",placeholder:e.placeholder},nativeOn:{mouseenter:function(t){e.inputHover=!0},mouseleave:function(t){e.inputHover=!1}},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}},[i("i",{class:["el-input__icon","el-icon-"+e.inputIcon],attrs:{slot:"prefix"},on:{click:e.clearQuery},slot:"prefix"})]):e._e(),i("el-checkbox-group",{directives:[{name:"show",rawName:"v-show",value:!e.hasNoMatch&&e.data.length>0,expression:"!hasNoMatch && data.length > 0"}],staticClass:"el-transfer-panel__list",class:{"is-filterable":e.filterable},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},e._l(e.filteredData,function(t){return i("el-checkbox",{key:t[e.keyProp],staticClass:"el-transfer-panel__item",attrs:{label:t[e.keyProp],disabled:t[e.disabledProp]}},[i("option-content",{attrs:{option:t}})],1)}),1),i("p",{directives:[{name:"show",rawName:"v-show",value:e.hasNoMatch,expression:"hasNoMatch"}],staticClass:"el-transfer-panel__empty"},[e._v(e._s(e.t("el.transfer.noMatch")))]),i("p",{directives:[{name:"show",rawName:"v-show",value:0===e.data.length&&!e.hasNoMatch,expression:"data.length === 0 && !hasNoMatch"}],staticClass:"el-transfer-panel__empty"},[e._v(e._s(e.t("el.transfer.noData")))])],1),e.hasFooter?i("p",{staticClass:"el-transfer-panel__footer"},[e._t("default")],2):e._e()])};Gc._withStripped=!0;var Uc=r({mixins:[j],name:"ElTransferPanel",componentName:"ElTransferPanel",components:{ElCheckboxGroup:ji,ElCheckbox:Ai,ElInput:ee,OptionContent:{props:{option:Object},render:function(e){var t=function e(t){return"ElTransferPanel"===t.$options.componentName?t:t.$parent?e(t.$parent):t}(this),i=t.$parent||t;return t.renderContent?t.renderContent(e,this.option):i.$scopedSlots.default?i.$scopedSlots.default({option:this.option}):e("span",[this.option[t.labelProp]||this.option[t.keyProp]])}}},props:{data:{type:Array,default:function(){return[]}},renderContent:Function,placeholder:String,title:String,filterable:Boolean,format:Object,filterMethod:Function,defaultChecked:Array,props:Object},data:function(){return{checked:[],allChecked:!1,query:"",inputHover:!1,checkChangeByUser:!0}},watch:{checked:function(e,t){if(this.updateAllChecked(),this.checkChangeByUser){var i=e.concat(t).filter(function(i){return-1===e.indexOf(i)||-1===t.indexOf(i)});this.$emit("checked-change",e,i)}else this.$emit("checked-change",e),this.checkChangeByUser=!0},data:function(){var e=this,t=[],i=this.filteredData.map(function(t){return t[e.keyProp]});this.checked.forEach(function(e){i.indexOf(e)>-1&&t.push(e)}),this.checkChangeByUser=!1,this.checked=t},checkableData:function(){this.updateAllChecked()},defaultChecked:{immediate:!0,handler:function(e,t){var i=this;if(!t||e.length!==t.length||!e.every(function(e){return t.indexOf(e)>-1})){var n=[],r=this.checkableData.map(function(e){return e[i.keyProp]});e.forEach(function(e){r.indexOf(e)>-1&&n.push(e)}),this.checkChangeByUser=!1,this.checked=n}}}},computed:{filteredData:function(){var e=this;return this.data.filter(function(t){return"function"==typeof e.filterMethod?e.filterMethod(e.query,t):(t[e.labelProp]||t[e.keyProp].toString()).toLowerCase().indexOf(e.query.toLowerCase())>-1})},checkableData:function(){var e=this;return this.filteredData.filter(function(t){return!t[e.disabledProp]})},checkedSummary:function(){var e=this.checked.length,t=this.data.length,i=this.format,n=i.noChecked,r=i.hasChecked;return n&&r?e>0?r.replace(/\${checked}/g,e).replace(/\${total}/g,t):n.replace(/\${total}/g,t):e+"/"+t},isIndeterminate:function(){var e=this.checked.length;return e>0&&e<this.checkableData.length},hasNoMatch:function(){return this.query.length>0&&0===this.filteredData.length},inputIcon:function(){return this.query.length>0&&this.inputHover?"circle-close":"search"},labelProp:function(){return this.props.label||"label"},keyProp:function(){return this.props.key||"key"},disabledProp:function(){return this.props.disabled||"disabled"},hasFooter:function(){return!!this.$slots.default}},methods:{updateAllChecked:function(){var e=this,t=this.checkableData.map(function(t){return t[e.keyProp]});this.allChecked=t.length>0&&t.every(function(t){return e.checked.indexOf(t)>-1})},handleAllCheckedChange:function(e){var t=this;this.checked=e?this.checkableData.map(function(e){return e[t.keyProp]}):[]},clearQuery:function(){"circle-close"===this.inputIcon&&(this.query="")}}},Gc,[],!1,null,null,null);Uc.options.__file="packages/transfer/src/transfer-panel.vue";var Xc=r({name:"ElTransfer",mixins:[l,j,Y],components:{TransferPanel:Uc.exports,ElButton:Dt},props:{data:{type:Array,default:function(){return[]}},titles:{type:Array,default:function(){return[]}},buttonTexts:{type:Array,default:function(){return[]}},filterPlaceholder:{type:String,default:""},filterMethod:Function,leftDefaultChecked:{type:Array,default:function(){return[]}},rightDefaultChecked:{type:Array,default:function(){return[]}},renderContent:Function,value:{type:Array,default:function(){return[]}},format:{type:Object,default:function(){return{}}},filterable:Boolean,props:{type:Object,default:function(){return{label:"label",key:"key",disabled:"disabled"}}},targetOrder:{type:String,default:"original"}},data:function(){return{leftChecked:[],rightChecked:[]}},computed:{dataObj:function(){var e=this.props.key;return this.data.reduce(function(t,i){return(t[i[e]]=i)&&t},{})},sourceData:function(){var e=this;return this.data.filter(function(t){return-1===e.value.indexOf(t[e.props.key])})},targetData:function(){var e=this;return"original"===this.targetOrder?this.data.filter(function(t){return e.value.indexOf(t[e.props.key])>-1}):this.value.reduce(function(t,i){var n=e.dataObj[i];return n&&t.push(n),t},[])},hasButtonTexts:function(){return 2===this.buttonTexts.length}},watch:{value:function(e){this.dispatch("ElFormItem","el.form.change",e)}},methods:{getMigratingConfig:function(){return{props:{"footer-format":"footer-format is renamed to format."}}},onSourceCheckedChange:function(e,t){this.leftChecked=e,void 0!==t&&this.$emit("left-check-change",e,t)},onTargetCheckedChange:function(e,t){this.rightChecked=e,void 0!==t&&this.$emit("right-check-change",e,t)},addToLeft:function(){var e=this.value.slice();this.rightChecked.forEach(function(t){var i=e.indexOf(t);i>-1&&e.splice(i,1)}),this.$emit("input",e),this.$emit("change",e,"left",this.rightChecked)},addToRight:function(){var e=this,t=this.value.slice(),i=[],n=this.props.key;this.data.forEach(function(t){var r=t[n];e.leftChecked.indexOf(r)>-1&&-1===e.value.indexOf(r)&&i.push(r)}),t="unshift"===this.targetOrder?i.concat(t):t.concat(i),this.$emit("input",t),this.$emit("change",t,"right",this.leftChecked)},clearQuery:function(e){"left"===e?this.$refs.leftPanel.query="":"right"===e&&(this.$refs.rightPanel.query="")}}},Kc,[],!1,null,null,null);Xc.options.__file="packages/transfer/src/main.vue";var Jc=Xc.exports;Jc.install=function(e){e.component(Jc.name,Jc)};var Zc=Jc,Qc=function(){var e=this.$createElement;return(this._self._c||e)("section",{staticClass:"el-container",class:{"is-vertical":this.isVertical}},[this._t("default")],2)};Qc._withStripped=!0;var eh=r({name:"ElContainer",componentName:"ElContainer",props:{direction:String},computed:{isVertical:function(){return"vertical"===this.direction||"horizontal"!==this.direction&&(!(!this.$slots||!this.$slots.default)&&this.$slots.default.some(function(e){var t=e.componentOptions&&e.componentOptions.tag;return"el-header"===t||"el-footer"===t}))}}},Qc,[],!1,null,null,null);eh.options.__file="packages/container/src/main.vue";var th=eh.exports;th.install=function(e){e.component(th.name,th)};var ih=th,nh=function(){var e=this.$createElement;return(this._self._c||e)("header",{staticClass:"el-header",style:{height:this.height}},[this._t("default")],2)};nh._withStripped=!0;var rh=r({name:"ElHeader",componentName:"ElHeader",props:{height:{type:String,default:"60px"}}},nh,[],!1,null,null,null);rh.options.__file="packages/header/src/main.vue";var sh=rh.exports;sh.install=function(e){e.component(sh.name,sh)};var ah=sh,oh=function(){var e=this.$createElement;return(this._self._c||e)("aside",{staticClass:"el-aside",style:{width:this.width}},[this._t("default")],2)};oh._withStripped=!0;var lh=r({name:"ElAside",componentName:"ElAside",props:{width:{type:String,default:"300px"}}},oh,[],!1,null,null,null);lh.options.__file="packages/aside/src/main.vue";var uh=lh.exports;uh.install=function(e){e.component(uh.name,uh)};var ch=uh,hh=function(){var e=this.$createElement;return(this._self._c||e)("main",{staticClass:"el-main"},[this._t("default")],2)};hh._withStripped=!0;var dh=r({name:"ElMain",componentName:"ElMain"},hh,[],!1,null,null,null);dh.options.__file="packages/main/src/main.vue";var ph=dh.exports;ph.install=function(e){e.component(ph.name,ph)};var fh=ph,mh=function(){var e=this.$createElement;return(this._self._c||e)("footer",{staticClass:"el-footer",style:{height:this.height}},[this._t("default")],2)};mh._withStripped=!0;var vh=r({name:"ElFooter",componentName:"ElFooter",props:{height:{type:String,default:"60px"}}},mh,[],!1,null,null,null);vh.options.__file="packages/footer/src/main.vue";var gh=vh.exports;gh.install=function(e){e.component(gh.name,gh)};var bh=gh,yh=r({name:"ElTimeline",props:{reverse:{type:Boolean,default:!1}},provide:function(){return{timeline:this}},render:function(){var e=arguments[0],t=this.reverse,i={"el-timeline":!0,"is-reverse":t},n=this.$slots.default||[];return t&&(n=n.reverse()),e("ul",{class:i},[n])}},void 0,void 0,!1,null,null,null);yh.options.__file="packages/timeline/src/main.vue";var wh=yh.exports;wh.install=function(e){e.component(wh.name,wh)};var xh=wh,_h=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"el-timeline-item"},[i("div",{staticClass:"el-timeline-item__tail"}),e.$slots.dot?e._e():i("div",{staticClass:"el-timeline-item__node",class:["el-timeline-item__node--"+(e.size||""),"el-timeline-item__node--"+(e.type||"")],style:{backgroundColor:e.color}},[e.icon?i("i",{staticClass:"el-timeline-item__icon",class:e.icon}):e._e()]),e.$slots.dot?i("div",{staticClass:"el-timeline-item__dot"},[e._t("dot")],2):e._e(),i("div",{staticClass:"el-timeline-item__wrapper"},[e.hideTimestamp||"top"!==e.placement?e._e():i("div",{staticClass:"el-timeline-item__timestamp is-top"},[e._v("\n      "+e._s(e.timestamp)+"\n    ")]),i("div",{staticClass:"el-timeline-item__content"},[e._t("default")],2),e.hideTimestamp||"bottom"!==e.placement?e._e():i("div",{staticClass:"el-timeline-item__timestamp is-bottom"},[e._v("\n      "+e._s(e.timestamp)+"\n    ")])])])};_h._withStripped=!0;var Ch=r({name:"ElTimelineItem",inject:["timeline"],props:{timestamp:String,hideTimestamp:{type:Boolean,default:!1},placement:{type:String,default:"bottom"},type:String,color:String,size:{type:String,default:"normal"},icon:String}},_h,[],!1,null,null,null);Ch.options.__file="packages/timeline/src/item.vue";var kh=Ch.exports;kh.install=function(e){e.component(kh.name,kh)};var Sh=kh,Dh=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("a",e._b({class:["el-link",e.type?"el-link--"+e.type:"",e.disabled&&"is-disabled",e.underline&&!e.disabled&&"is-underline"],attrs:{href:e.disabled?null:e.href},on:{click:e.handleClick}},"a",e.$attrs,!1),[e.icon?i("i",{class:e.icon}):e._e(),e.$slots.default?i("span",{staticClass:"el-link--inner"},[e._t("default")],2):e._e(),e.$slots.icon?[e.$slots.icon?e._t("icon"):e._e()]:e._e()],2)};Dh._withStripped=!0;var $h=r({name:"ElLink",props:{type:{type:String,default:"default"},underline:{type:Boolean,default:!0},disabled:Boolean,href:String,icon:String},methods:{handleClick:function(e){this.disabled||this.href||this.$emit("click",e)}}},Dh,[],!1,null,null,null);$h.options.__file="packages/link/src/main.vue";var Eh=$h.exports;Eh.install=function(e){e.component(Eh.name,Eh)};var Th=Eh,Mh={functional:!0,name:"ElDivider",props:{direction:{type:String,default:"horizontal",validator:function(e){return-1!==["horizontal","vertical"].indexOf(e)}},contentPosition:{type:String,default:"center",validator:function(e){return-1!==["left","center","right"].indexOf(e)}}},render:function(e,t){var i=t.slots(),n=t.props,r=n.direction,s=n.contentPosition;return e("div",{class:["el-divider","el-divider--"+r]},[i.default&&"vertical"!==r?e("div",{class:["el-divider__text","is-"+s]},[i.default]):null])},install:function(e){e.component(Mh.name,Mh)}},Ph=Mh,Nh=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-image"},[e.loading?e._t("placeholder",[i("div",{staticClass:"el-image__placeholder"})]):e.error?e._t("error",[i("div",{staticClass:"el-image__error"},[e._v(e._s(e.t("el.image.error")))])]):i("img",e._g(e._b({staticClass:"el-image__inner",class:{"el-image__inner--center":e.alignCenter},style:e.imageStyle,attrs:{src:e.src}},"img",e.$attrs,!1),e.$listeners))],2)};Nh._withStripped=!0;var Oh=function(){return void 0!==document.documentElement.style.objectFit},Ih="none",Fh="contain",Ah="cover",Lh="fill",Vh="scale-down",Bh=r({name:"ElImage",mixins:[j],inheritAttrs:!1,props:{src:String,fit:String,lazy:Boolean,scrollContainer:{}},data:function(){return{loading:!0,error:!1,show:!this.lazy,imageWidth:0,imageHeight:0}},computed:{imageStyle:function(){var e=this.fit;return!this.$isServer&&e?Oh()?{"object-fit":e}:this.getImageStyle(e):{}},alignCenter:function(){return!this.$isServer&&!Oh()&&this.fit!==Lh}},watch:{src:function(e){this.show&&this.loadImage()},show:function(e){e&&this.loadImage()}},mounted:function(){this.lazy?this.addLazyLoadListener():this.loadImage()},beforeDestroy:function(){this.lazy&&this.removeLazyLoadListener()},methods:{loadImage:function(){var e=this;if(!this.$isServer){this.loading=!0,this.error=!1;var t=new Image;t.onload=function(i){return e.handleLoad(i,t)},t.onerror=this.handleError.bind(this),Object.keys(this.$attrs).forEach(function(i){var n=e.$attrs[i];t.setAttribute(i,n)}),t.src=this.src}},handleLoad:function(e,t){this.imageWidth=t.width,this.imageHeight=t.height,this.loading=!1},handleError:function(e){this.loading=!1,this.error=!0,this.$emit("error",e)},handleLazyLoad:function(){(function(e,t){if(ie||!e||!t)return!1;var i=e.getBoundingClientRect(),n=void 0;return n=[window,document,document.documentElement,null,void 0].includes(t)?{top:0,right:window.innerWidth,bottom:window.innerHeight,left:0}:t.getBoundingClientRect(),i.top<n.bottom&&i.bottom>n.top&&i.right>n.left&&i.left<n.right})(this.$el,this._scrollContainer)&&(this.show=!0,this.removeLazyLoadListener())},addLazyLoadListener:function(){if(!this.$isServer){var e=this.scrollContainer,t=null;(t=v(e)?e:f(e)?document.querySelector(e):me(this.$el))&&(this._scrollContainer=t,this._lazyLoadHandler=Eu()(200,this.handleLazyLoad),le(t,"scroll",this._lazyLoadHandler),this.handleLazyLoad())}},removeLazyLoadListener:function(){var e=this._scrollContainer,t=this._lazyLoadHandler;!this.$isServer&&e&&t&&(ue(e,"scroll",t),this._scrollContainer=null,this._lazyLoadHandler=null)},getImageStyle:function(e){var t=this.imageWidth,i=this.imageHeight,n=this.$el,r=n.clientWidth,s=n.clientHeight;if(!(t&&i&&r&&s))return{};var a=t/i<1;e===Vh&&(e=t<r&&i<s?Ih:Fh);switch(e){case Ih:return{width:"auto",height:"auto"};case Fh:return a?{width:"auto"}:{height:"auto"};case Ah:return a?{height:"auto"}:{width:"auto"};default:return{}}}}},Nh,[],!1,null,null,null);Bh.options.__file="packages/image/src/main.vue";var zh=Bh.exports;zh.install=function(e){e.component(zh.name,zh)};var Hh=zh,Rh=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-calendar"},[i("div",{staticClass:"el-calendar__header"},[i("div",{staticClass:"el-calendar__title"},[e._v("\n      "+e._s(e.i18nDate)+"\n    ")]),0===e.validatedRange.length?i("div",{staticClass:"el-calendar__button-group"},[i("el-button-group",[i("el-button",{attrs:{type:"plain",size:"mini"},on:{click:function(t){e.selectDate("prev-month")}}},[e._v("\n          "+e._s(e.t("el.datepicker.prevMonth"))+"\n        ")]),i("el-button",{attrs:{type:"plain",size:"mini"},on:{click:function(t){e.selectDate("today")}}},[e._v("\n          "+e._s(e.t("el.datepicker.today"))+"\n        ")]),i("el-button",{attrs:{type:"plain",size:"mini"},on:{click:function(t){e.selectDate("next-month")}}},[e._v("\n          "+e._s(e.t("el.datepicker.nextMonth"))+"\n        ")])],1)],1):e._e()]),0===e.validatedRange.length?i("div",{key:"no-range",staticClass:"el-calendar__body"},[i("date-table",{attrs:{date:e.date,"selected-day":e.realSelectedDay,"first-day-of-week":e.realFirstDayOfWeek},on:{pick:e.pickDay}})],1):i("div",{key:"has-range",staticClass:"el-calendar__body"},e._l(e.validatedRange,function(t,n){return i("date-table",{key:n,attrs:{date:t[0],"selected-day":e.realSelectedDay,range:t,"hide-header":0!==n},on:{pick:e.pickDay}})}),1)])};Rh._withStripped=!0;var Wh=ar().dayNames,jh=r({props:{selectedDay:String,range:{type:Array,validator:function(e){if(!e||!e.length)return!0;var t=e[0],i=e[1];return Nr(t,i)}},date:Date,hideHeader:Boolean,firstDayOfWeek:Number},inject:["elCalendar"],methods:{toNestedArr:function(e){return gr(e.length/7).map(function(t,i){var n=7*i;return e.slice(n,n+7)})},getFormateDate:function(e,t){if(!e||-1===["prev","current","next"].indexOf(t))throw new Error("invalid day or type");var i=this.curMonthDatePrefix;return"prev"===t?i=this.prevMonthDatePrefix:"next"===t&&(i=this.nextMonthDatePrefix),i+"-"+(e=("00"+e).slice(-2))},getCellClass:function(e){var t=e.text,i=e.type,n=[i];if("current"===i){var r=this.getFormateDate(t,i);r===this.selectedDay&&n.push("is-selected"),r===this.formatedToday&&n.push("is-today")}return n},pickDay:function(e){var t=e.text,i=e.type,n=this.getFormateDate(t,i);this.$emit("pick",n)},cellRenderProxy:function(e){var t=e.text,i=e.type,n=this.$createElement,r=this.elCalendar.$scopedSlots.dateCell;if(!r)return n("span",[t]);var s=this.getFormateDate(t,i);return r({date:new Date(s),data:{isSelected:this.selectedDay===s,type:i+"-month",day:s}})}},computed:{prevMonthDatePrefix:function(){var e=new Date(this.date.getTime());return e.setDate(0),nr.a.format(e,"yyyy-MM")},curMonthDatePrefix:function(){return nr.a.format(this.date,"yyyy-MM")},nextMonthDatePrefix:function(){var e=new Date(this.date.getFullYear(),this.date.getMonth()+1,1);return nr.a.format(e,"yyyy-MM")},formatedToday:function(){return this.elCalendar.formatedToday},isInRange:function(){return this.range&&this.range.length},rows:function(){var e=[];if(this.isInRange){var t=this.range,i=t[0],n=t[1],r=gr(n.getDate()-i.getDate()+1).map(function(e,t){return{text:i.getDate()+t,type:"current"}}),s=r.length%7,a=gr(s=0===s?0:7-s).map(function(e,t){return{text:t+1,type:"next"}});e=r.concat(a)}else{var o=this.date,l=dr(o),u=function(e,t){if(t<=0)return[];var i=new Date(e.getTime());i.setDate(0);var n=i.getDate();return gr(t).map(function(e,i){return n-(t-i-1)})}(o,(l=0===l?7:l)-("number"==typeof this.firstDayOfWeek?this.firstDayOfWeek:1)).map(function(e){return{text:e,type:"prev"}}),c=function(e){var t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate();return gr(t).map(function(e,t){return t+1})}(o).map(function(e){return{text:e,type:"current"}});e=[].concat(u,c);var h=gr(42-e.length).map(function(e,t){return{text:t+1,type:"next"}});e=e.concat(h)}return this.toNestedArr(e)},weekDays:function(){var e=this.firstDayOfWeek;return"number"!=typeof e||0===e?Wh.slice():Wh.slice(e).concat(Wh.slice(0,e))}},render:function(){var e=this,t=arguments[0],i=this.hideHeader?null:t("thead",[this.weekDays.map(function(e){return t("th",{key:e},[e])})]);return t("table",{class:{"el-calendar-table":!0,"is-range":this.isInRange},attrs:{cellspacing:"0",cellpadding:"0"}},[i,t("tbody",[this.rows.map(function(i,n){return t("tr",{class:{"el-calendar-table__row":!0,"el-calendar-table__row--hide-border":0===n&&e.hideHeader},key:n},[i.map(function(i,n){return t("td",{key:n,class:e.getCellClass(i),on:{click:e.pickDay.bind(e,i)}},[t("div",{class:"el-calendar-day"},[e.cellRenderProxy(i)])])})])})])])}},void 0,void 0,!1,null,null,null);jh.options.__file="packages/calendar/src/date-table.vue";var qh=jh.exports,Yh=["prev-month","today","next-month"],Kh=r({name:"ElCalendar",mixins:[j],components:{DateTable:qh},props:{value:[Date,String,Number],range:{type:Array,validator:function(e){return!Array.isArray(e)||2===e.length&&e.every(function(e){return"string"==typeof e||"number"==typeof e||e instanceof Date})}},firstDayOfWeek:{type:Number,default:1}},provide:function(){return{elCalendar:this}},methods:{pickDay:function(e){this.realSelectedDay=e},selectDate:function(e){if(-1===Yh.indexOf(e))throw new Error("invalid type "+e);var t="";(t="prev-month"===e?this.prevMonthDatePrefix+"-01":"next-month"===e?this.nextMonthDatePrefix+"-01":this.formatedToday)!==this.formatedDate&&this.pickDay(t)},toDate:function(e){if(!e)throw new Error("invalid val");return e instanceof Date?e:new Date(e)}},computed:{prevMonthDatePrefix:function(){var e=new Date(this.date.getTime());return e.setDate(0),nr.a.format(e,"yyyy-MM")},curMonthDatePrefix:function(){return nr.a.format(this.date,"yyyy-MM")},nextMonthDatePrefix:function(){var e=new Date(this.date.getFullYear(),this.date.getMonth()+1,1);return nr.a.format(e,"yyyy-MM")},formatedDate:function(){return nr.a.format(this.date,"yyyy-MM-dd")},i18nDate:function(){var e=this.date.getFullYear(),t=this.date.getMonth()+1;return e+" "+this.t("el.datepicker.year")+" "+this.t("el.datepicker.month"+t)},formatedToday:function(){return nr.a.format(this.now,"yyyy-MM-dd")},realSelectedDay:{get:function(){return this.value?this.formatedDate:this.selectedDay},set:function(e){this.selectedDay=e;var t=new Date(e);this.$emit("input",t)}},date:function(){return this.value?this.toDate(this.value):this.realSelectedDay?new Date(this.selectedDay):this.validatedRange.length?this.validatedRange[0][0]:this.now},validatedRange:function(){var e=this,t=this.range;if(!t)return[];var i={0:{value:1,message:"start of range should be Monday."},1:{value:0,message:"end of range should be Sunday."}};if(2===(t=t.reduce(function(t,n,r){var s=e.toDate(n);return s.getDay()!==i[r].value?console.warn("[ElementCalendar]",i[r].message," invalid range will be ignored"):t=t.concat(s),t},[])).length){var n=t,r=n[0],s=n[1];if(r>s)return console.warn("[ElementCalendar]end time should be greater than start time"),[];if(Nr(r,s))return[[r,s]];var a=[],o=new Date(r.getFullYear(),r.getMonth()+1,1),l=this.toDate(o.getTime()-864e5);if(!Nr(o,s))return console.warn("[ElementCalendar]start time and end time interval must not exceed two months"),[];a.push([r,l]);var u=o.getDay();return u=u<=1?Math.abs(u-1):8-u,(o=this.toDate(o.getTime()+864e5*u)).getDate()<s.getDate()&&a.push([o,s]),a}return[]},realFirstDayOfWeek:function(){return this.firstDayOfWeek<1||this.firstDayOfWeek>6?0:Math.floor(this.firstDayOfWeek)}},data:function(){return{selectedDay:"",now:new Date}}},Rh,[],!1,null,null,null);Kh.options.__file="packages/calendar/src/main.vue";var Gh=Kh.exports;Gh.install=function(e){e.component(Gh.name,Gh)};var Uh=Gh,Xh=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"el-fade-in"}},[e.visible?i("div",{staticClass:"el-backtop",style:{right:e.styleRight,bottom:e.styleBottom},on:{click:function(t){return t.stopPropagation(),e.handleClick(t)}}},[e._t("default",[i("el-icon",{attrs:{name:"caret-top"}})])],2):e._e()])};Xh._withStripped=!0;var Jh=r({name:"ElBacktop",props:{visibilityHeight:{type:Number,default:200},target:[String],right:{type:Number,default:40},bottom:{type:Number,default:40}},data:function(){return{el:null,container:null,visible:!1}},computed:{styleBottom:function(){return this.bottom+"px"},styleRight:function(){return this.right+"px"}},mounted:function(){this.init(),this.throttledScrollHandler=Eu()(300,this.onScroll),this.container.addEventListener("scroll",this.throttledScrollHandler)},methods:{init:function(){if(this.container=document,this.el=document.documentElement,this.target){if(this.el=document.querySelector(this.target),!this.el)throw new Error("target is not existed: "+this.target);this.container=this.el}},onScroll:function(){var e=this.el.scrollTop;this.visible=e>=this.visibilityHeight},handleClick:function(e){this.scrollToTop(),this.$emit("click",e)},scrollToTop:function(){var e=this.el,t=0,i=setInterval(function(){e.scrollTop<=0?clearInterval(i):(t+=10,e.scrollTop-=t)},20)}},beforeDestroy:function(){this.container.removeEventListener("scroll",this.throttledScrollHandler)}},Xh,[],!1,null,null,null);Jh.options.__file="packages/backtop/src/main.vue";var Zh=Jh.exports;Zh.install=function(e){e.component(Zh.name,Zh)};var Qh=Zh,ed=function(e,t){return e===window||e===document?document.documentElement[t]:e[t]},td=function(e){return ed(e,"offsetHeight")},id="ElInfiniteScroll",nd={delay:{type:Number,default:200},distance:{type:Number,default:0},disabled:{type:Boolean,default:!1},immediate:{type:Boolean,default:!0}},rd=function(e,t){return v(e)?(i=nd,Object.keys(i||{}).map(function(e){return[e,i[e]]})).reduce(function(i,n){var r=n[0],s=n[1],a=s.type,o=s.default,l=e.getAttribute("infinite-scroll-"+r);switch(l=b(t[l])?l:t[l],a){case Number:l=Number(l),l=Number.isNaN(l)?o:l;break;case Boolean:l=null!=l?"false"!==l&&Boolean(l):o;break;default:l=a(l)}return i[r]=l,i},{}):{};var i},sd=function(e){return e.getBoundingClientRect().top},ad=function(e){var t=this[id],i=t.el,n=t.vm,r=t.container,s=t.observer,a=rd(i,n),o=a.distance;if(!a.disabled){var l=!1;if(r===i){var u=r.scrollTop+function(e){return ed(e,"clientHeight")}(r);l=r.scrollHeight-u<=o}else{l=td(i)+sd(i)-sd(r)-td(r)+Number.parseFloat(function(e,t){if(e===window&&(e=document.documentElement),1!==e.nodeType)return[];var i=window.getComputedStyle(e,null);return t?i[t]:i}(r,"borderBottomWidth"))<=o}l&&g(e)?e.call(n):s&&(s.disconnect(),this[id].observer=null)}},od={name:"InfiniteScroll",inserted:function(e,t,i){var n=t.value,r=i.context,s=me(e,!0),a=rd(e,r),o=a.delay,l=a.immediate,u=Je()(o,ad.bind(e,n));(e[id]={el:e,vm:r,container:s,onScroll:u},s)&&(s.addEventListener("scroll",u),l&&((e[id].observer=new MutationObserver(u)).observe(s,{childList:!0,subtree:!0}),u()))},unbind:function(e){var t=e[id],i=t.container,n=t.onScroll;i&&i.removeEventListener("scroll",n)},install:function(e){e.directive(od.name,od)}},ld=od,ud=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"el-page-header"},[i("div",{staticClass:"el-page-header__left",on:{click:function(t){e.$emit("back")}}},[i("i",{staticClass:"el-icon-back"}),i("div",{staticClass:"el-page-header__title"},[e._t("title",[e._v(e._s(e.title))])],2)]),i("div",{staticClass:"el-page-header__content"},[e._t("content",[e._v(e._s(e.content))])],2)])};ud._withStripped=!0;var cd=r({name:"ElPageHeader",props:{title:{type:String,default:function(){return R("el.pageHeader.title")}},content:String}},ud,[],!1,null,null,null);cd.options.__file="packages/page-header/src/main.vue";var hd=cd.exports;hd.install=function(e){e.component(hd.name,hd)};var dd=hd,pd=r({name:"ElAvatar",props:{size:{type:[Number,String],validator:function(e){return"string"==typeof e?["large","medium","small"].includes(e):"number"==typeof e}},shape:{type:String,default:"circle",validator:function(e){return["circle","square"].includes(e)}},icon:String,src:String,alt:String,srcSet:String,error:Function,fit:{type:String,default:"cover"}},data:function(){return{isImageExist:!0}},computed:{avatarClass:function(){var e=this.size,t=this.icon,i=this.shape,n=["el-avatar"];return e&&"string"==typeof e&&n.push("el-avatar--"+e),t&&n.push("el-avatar--icon"),i&&n.push("el-avatar--"+i),n.join(" ")}},methods:{handleError:function(){var e=this.error;!1!==(e?e():void 0)&&(this.isImageExist=!1)},renderAvatar:function(){var e=this.$createElement,t=this.icon,i=this.src,n=this.alt,r=this.isImageExist,s=this.srcSet,a=this.fit;return r&&i?e("img",{attrs:{src:i,alt:n,srcSet:s},on:{error:this.handleError},style:{"object-fit":a}}):t?e("i",{class:t}):this.$slots.default}},render:function(){var e=arguments[0],t=this.avatarClass,i=this.size;return e("span",{class:t,style:"number"==typeof i?{height:i+"px",width:i+"px",lineHeight:i+"px"}:{}},[this.renderAvatar()])}},void 0,void 0,!1,null,null,null);pd.options.__file="packages/avatar/src/main.vue";var fd=pd.exports;fd.install=function(e){e.component(fd.name,fd)};var md=fd,vd=[ht,mt,_t,Ot,Lt,Ht,Zt,ri,ci,fi,ee,yi,Ci,Ei,Ni,Ai,zi,ji,Gi,lt,ut,Zi,Dt,Mt,Kn,er,$s,Fs,js,Xs,oi,xa,Sa,Ta,oo,go,xo,Be,Vo,Wo,ol,Cl,Sl,El,ql,Ol,Ul,uu,pu,gu,xu,Su,Pu,Ue,Fu,Bu,Wu,vc,Yc,Zc,ih,ah,ch,fh,bh,xh,Sh,Th,Ph,Hh,Uh,Qh,dd,uc,md,ei],gd=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};W.use(t.locale),W.i18n(t.i18n),vd.forEach(function(t){e.component(t.name,t)}),e.use(ld),e.use(yl.directive),e.prototype.$ELEMENT={size:t.size||"",zIndex:t.zIndex||2e3},e.prototype.$loading=yl.service,e.prototype.$msgbox=ga,e.prototype.$alert=ga.alert,e.prototype.$confirm=ga.confirm,e.prototype.$prompt=ga.prompt,e.prototype.$notify=Qo,e.prototype.$message=su};"undefined"!=typeof window&&window.Vue&&gd(window.Vue);t.default={version:"2.10.1",locale:W.use,i18n:W.i18n,install:gd,CollapseTransition:ei,Loading:yl,Pagination:ht,Dialog:mt,Autocomplete:_t,Dropdown:Ot,DropdownMenu:Lt,DropdownItem:Ht,Menu:Zt,Submenu:ri,MenuItem:ci,MenuItemGroup:fi,Input:ee,InputNumber:yi,Radio:Ci,RadioGroup:Ei,RadioButton:Ni,Checkbox:Ai,CheckboxButton:zi,CheckboxGroup:ji,Switch:Gi,Select:lt,Option:ut,OptionGroup:Zi,Button:Dt,ButtonGroup:Mt,Table:Kn,TableColumn:er,DatePicker:$s,TimeSelect:Fs,TimePicker:js,Popover:Xs,Tooltip:oi,MessageBox:ga,Breadcrumb:xa,BreadcrumbItem:Sa,Form:Ta,FormItem:oo,Tabs:go,TabPane:xo,Tag:Be,Tree:Vo,Alert:Wo,Notification:Qo,Slider:ol,Icon:Cl,Row:Sl,Col:El,Upload:ql,Progress:Ol,Spinner:Ul,Message:su,Badge:uu,Card:pu,Rate:gu,Steps:xu,Step:Su,Carousel:Pu,Scrollbar:Ue,CarouselItem:Fu,Collapse:Bu,CollapseItem:Wu,Cascader:vc,ColorPicker:Yc,Transfer:Zc,Container:ih,Header:ah,Aside:ch,Main:fh,Footer:bh,Timeline:xh,TimelineItem:Sh,Link:Th,Divider:Ph,Image:Hh,Calendar:Uh,Backtop:Qh,InfiniteScroll:ld,PageHeader:dd,CascaderPanel:uc,Avatar:md}}]).default});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





$(document).ready(f => {
  Vue.component('star-rating', VueStarRating.default);

  new Vue({
    el: '#app',
    data: {
      links: [],
      state1: '',
      state2: ''
    },
    methods: {
      querySearch(queryString, cb) {
        $.get("/photos", {photos: {query: queryString, options: "nc"}}).done(respose => {
          cb(respose.map(f => {
            f.loading = false;
            f.comment_content = "";
            return f
          }))
        }).error(er => {

        })
      },
      loadAll() {
        []
      },
      handleSelect(item) {
        window.location.replace('/photo/'+ item.id)
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  })
})
;
