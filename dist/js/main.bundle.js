/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f5c27159295094704e97";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-env browser */\n\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\n\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === 'undefined';\nvar forEach = Array.prototype.forEach;\n\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    var self = this; // eslint-disable-next-line prefer-rest-params\n\n    var args = arguments;\n\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n\n    clearTimeout(timeout);\n    timeout = setTimeout(functionCall, time);\n  };\n}\n\nfunction noop() {}\n\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src = document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName('script');\n      var lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n\n    srcByModuleId[moduleId] = src;\n  }\n\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n\n    if (!filename) {\n      return [src.replace('.js', '.css')];\n    }\n\n    if (!fileMap) {\n      return [src.replace('.js', '.css')];\n    }\n\n    return fileMap.split(',').map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), 'g');\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    } // eslint-disable-next-line\n\n\n    url = el.href.split('?')[0];\n  }\n\n  if (!isUrlRequest(url)) {\n    return;\n  }\n\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n\n  if (!url || !(url.indexOf('.css') > -1)) {\n    return;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener('load', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener('error', function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\nfunction getReloadUrl(href, src) {\n  var ret; // eslint-disable-next-line no-param-reassign\n\n  href = normalizeUrl(href, {\n    stripWWW: false\n  }); // eslint-disable-next-line array-callback-return\n\n  src.some(function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n\n  var elements = document.querySelectorAll('link');\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n\n    var url = getReloadUrl(el.href, src);\n\n    if (!isUrlRequest(url)) {\n      return;\n    }\n\n    if (el.visited === true) {\n      return;\n    }\n\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\n\nfunction reloadAll() {\n  var elements = document.querySelectorAll('link');\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n\n    updateCss(el);\n  });\n}\n\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n  // It is not http or https\n  if (!/^https?:/i.test(url)) {\n    return false;\n  }\n\n  return true;\n}\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log('no window.document found, will not HMR CSS');\n    return noop;\n  }\n\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n\n    if (options.locals) {\n      console.log('[HMR] Detected local css modules. Reload all css');\n      reloadAll();\n      return;\n    }\n\n    if (reloaded) {\n      console.log('[HMR] css reload %s', src.join(' '));\n    } else {\n      console.log('[HMR] Reload all css');\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack:///./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-disable */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case '..':\n        accumulator.pop();\n        break;\n\n      case '.':\n        break;\n\n      default:\n        accumulator.push(item);\n    }\n\n    return accumulator;\n  }, []).join('/');\n}\n\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n\n  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';\n  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');\n  var host = components[0].toLowerCase().replace(/\\.$/, '');\n  components[0] = '';\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack:///./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Slider.js */ \"./src/js/modules/Slider.js\");\n/* harmony import */ var _modules_Info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Info.js */ \"./src/js/modules/Info.js\");\n/* harmony import */ var _modules_Notes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Notes.js */ \"./src/js/modules/Notes.js\");\n/* harmony import */ var _modules_Suppliers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Suppliers.js */ \"./src/js/modules/Suppliers.js\");\n/* harmony import */ var _modules_calculation_Calculator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculation/Calculator.js */ \"./src/js/modules/calculation/Calculator.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n\n\n\n\n\n\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n    const slider = new _modules_Slider_js__WEBPACK_IMPORTED_MODULE_0__[\"Slider\"]();\n    const info = new _modules_Info_js__WEBPACK_IMPORTED_MODULE_1__[\"Info\"]();\n    const suppliers = new _modules_Suppliers_js__WEBPACK_IMPORTED_MODULE_3__[\"Suppliers\"]();\n    const notes = new _modules_Notes_js__WEBPACK_IMPORTED_MODULE_2__[\"Notes\"]();\n    const calculator = new _modules_calculation_Calculator_js__WEBPACK_IMPORTED_MODULE_4__[\"Calculator\"]();\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/modules/Info.js":
/*!********************************!*\
  !*** ./src/js/modules/Info.js ***!
  \********************************/
/*! exports provided: Info */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Info\", function() { return Info; });\nclass Info {\n    constructor() {\n        this.infoBtnClose = document.querySelector('.info-close');\n        this.infoBtnOpen = document.querySelector('.info-btn');\n        this.infoContainer = document.querySelector('.info-container');\n\n        this.infoBtnOpen.addEventListener('click', this.openInfo.bind(this));\n        this.infoBtnClose.addEventListener('click', this.closeInfo.bind(this));\n    }\n    openInfo() {\n        this.infoContainer.classList.toggle('info-container--active');\n        this.infoBtnOpen.classList.add('info-btn--active');\n    }\n    closeInfo() {\n        this.infoContainer.classList.remove('info-container--active');\n        this.infoBtnOpen.classList.remove('info-btn--active');\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Info.js?");

/***/ }),

/***/ "./src/js/modules/Notes.js":
/*!*********************************!*\
  !*** ./src/js/modules/Notes.js ***!
  \*********************************/
/*! exports provided: Notes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Notes\", function() { return Notes; });\nclass Notes {\n    constructor() {\n        this.container = document.querySelector('.calculator');\n        this.closeBtn = document.querySelector('.close-notes');\n        this.container = document.querySelector('.notes-container');\n        this.openBtn = document.querySelector('.notes-btn');\n        this.textarea = document.querySelector('.notes-textarea');\n        this.saveBtn = document.querySelector('.save-notes');\n        this.deleteBtn = document.querySelector('.delete-notes');\n        this.storedTxt = localStorage.getItem('notesTxt');\n\n        this.openBtn.addEventListener(\"click\", this.openNotes.bind(this));\n        this.closeBtn.addEventListener(\"click\", this.closeNotes.bind(this));\n        this.saveBtn.addEventListener(\"click\", this.saveNotes.bind(this));\n        this.deleteBtn.addEventListener(\"click\", this.deleteNotes.bind(this));\n        this.displayNotes();\n    }\n    //open notes\n    openNotes() {\n        this.container.classList.add('notes-container--active');\n        this.openBtn.classList.add('notes-btn--active');\n    }\n    //close notes\n    closeNotes() {\n        this.container.classList.remove('notes-container--active');\n        this.openBtn.classList.remove('notes-btn--active');\n    }\n\n    //display notes\n    displayNotes() {\n        if (this.storedTxt) {\n            this.textarea.textContent = this.storedTxt;\n        }\n    }\n\n    //save notes to localStorage\n    saveNotes() {\n        localStorage.setItem('notesTxt', this.textarea.value);\n    }\n\n    //remove item from list\n    deleteNotes() {\n        this.textarea.textContent = '';\n        localStorage.removeItem('notesTxt');\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Notes.js?");

/***/ }),

/***/ "./src/js/modules/Slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/Slider.js ***!
  \**********************************/
/*! exports provided: Slider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slider\", function() { return Slider; });\nclass Slider {\n    constructor() {\n        this.selectPrint = [...document.querySelectorAll('.select-print-btn')];\n        this.productContainer = [...document.querySelectorAll('.product')];\n\n        this.selectPrint.forEach(select => select.addEventListener('click', () => this.activeSlide(select)));\n    }\n\n    productPosition() {\n        const activeItem = this.selectPrint.findIndex(item => item.classList.contains('select-print-btn--active'));\n        const size = this.productContainer[0].clientWidth;\n        this.productContainer.forEach(product => {\n            product.style.transform = 'translateX(' + -activeItem * size + 'px)';\n        });\n    }\n\n    activeSlide(select) {\n        this.selectPrint.forEach(select => select.classList.remove('select-print-btn--active'));\n        select.classList.add('select-print-btn--active');\n        this.productPosition();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Slider.js?");

/***/ }),

/***/ "./src/js/modules/Suppliers.js":
/*!*************************************!*\
  !*** ./src/js/modules/Suppliers.js ***!
  \*************************************/
/*! exports provided: Suppliers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Suppliers\", function() { return Suppliers; });\nclass Item {\n    constructor(nameCompany, nrPhone, email, www) {\n        this.nameCompany = nameCompany;\n        this.nrPhone = nrPhone;\n        this.email = email;\n        this.www = www;\n    }\n}\nclass Suppliers {\n    constructor() {\n        this.suppliersBtnClose = document.querySelector('.suppliers-close');\n        this.suppliersBtnOpen = document.querySelector('.suppliers-btn');\n        this.suppliersContainer = document.querySelector('.suppliers-container');\n        this.suppliersBtnOpen.addEventListener('click', this.openSuppliers.bind(this));\n        this.suppliersBtnClose.addEventListener('click', this.closeSuppliers.bind(this));\n        this.nameCompany = document.getElementById('name-company');\n        this.nrPhone = document.getElementById('nr-phone');\n        this.email = document.getElementById('email');\n        this.www = document.getElementById('www-address');\n        this.alert = document.querySelector('.alert');\n        this.alertTxt = document.querySelector('.alert-txt');\n        this.containerList = document.querySelector('.suppliers-list-container');\n        this.itemsList = [];\n        this.storeItems = this.storeGetItem();\n\n        //display items from local storage\n        this.displayItems();\n\n        // Add item to list\n        document.querySelector('#suppliers-form-to-do').addEventListener('submit', e => {\n            e.preventDefault();\n            const nameCompany = this.nameCompany.value;\n            const nrPhone = this.nrPhone.value;\n            const email = this.email.value;\n            const www = this.www.value;\n            const item = new Item(nameCompany, nrPhone, email, www);\n\n            //this.acces = retun z wunkcji checking\n            for (const i in this.storeItems) {\n                if (item.nrPhone === this.storeItems[i].nrPhone) {\n                    this.alertTxt.textContent = `Numer telefonu ${item.nrPhone} już istnieje`;\n                    this.alert.classList.add('alert--active');\n                    return;\n                } else if (item.email === this.storeItems[i].email) {\n                    this.alertTxt.textContent = `Adre email ${item.email} już istnieje`;\n                    this.alert.classList.add('alert--active');\n                    return;\n                } else {\n                    this.alertTxt.textContent = \" \";\n                    this.alert.classList.remove('alert--active');\n                }\n            }\n\n            this.addItemToList(item);\n            this.storeAddItem(item);\n        });\n\n        //remove from list\n        this.containerList.addEventListener('click', e => this.deleteItem(e.target));\n\n        //acept alert\n        document.querySelector('.acept-alert').addEventListener('click', e => e.target.parentElement.classList.remove('alert--active'));\n    }\n    //open containers suppliers\n    openSuppliers() {\n        this.suppliersContainer.classList.add('suppliers-container--active');\n        this.suppliersBtnOpen.classList.add('suppliers-btn--active');\n    }\n\n    //close containers suppliers\n    closeSuppliers() {\n        this.suppliersContainer.classList.remove('suppliers-container--active');\n        this.suppliersBtnOpen.classList.remove('suppliers-btn--active');\n    }\n\n    //display items from localStorage\n    displayItems() {\n        this.storeItems.forEach(item => this.addItemToList(item));\n    }\n\n    //set key data for player item\n    renderList() {\n        this.itemsList.forEach((item, key) => {\n            item.dataset.key = key;\n            this.containerList.appendChild(item);\n        });\n    }\n\n    //clear inputs\n    clearFields() {\n        this.nameCompany.value = '';\n        this.nrPhone.value = '';\n        this.email.value = '';\n        this.www.value = '';\n    }\n\n    //add item to list\n    addItemToList(item) {\n        if (item) {\n            const row = document.createElement('div');\n            row.className = 'suppliers-items';\n            row.innerHTML = `\n                        <div class=\"suppliers-item\"><p>${item.nameCompany}</p></div>\n                        <div class=\"suppliers-item\"><p>${item.nrPhone}</p></div>\n                        <div class=\"suppliers-item suppliers-item-link\"><a href=\"mailto:${item.email}\">${item.email}</a></div>\n                        <div class=\"suppliers-item suppliers-item-link\"><a href=\"${item.www}\" target=\"_blank\">${item.www}</a></div>\n                        <button class=\"delete-item\" title=\"Usuń\"><ion-icon name=\"trash-outline\" class=\"delete\"></ion-icon></button>\n                       `;\n\n            this.itemsList.push(row);\n            this.renderList();\n            this.containerList.appendChild(row);\n            this.clearFields();\n        }\n    }\n\n    //localStorage array\n    storeGetItem() {\n        let storeItems;\n        if (localStorage.getItem('storeItems') === null) {\n            storeItems = [];\n        } else {\n            storeItems = JSON.parse(localStorage.getItem('storeItems'));\n        }\n        return storeItems;\n    }\n\n    //add item to localStorage\n    storeAddItem(item) {\n        if (item) {\n            this.storeItems.push(item);\n            localStorage.setItem('storeItems', JSON.stringify(this.storeItems));\n        }\n    }\n\n    //remove item from list\n    deleteItem(el) {\n        const index = el.parentElement.dataset.key;\n        if (el.classList.contains('delete-item')) {\n            this.renderList();\n            el.parentElement.remove();\n            this.itemsList.splice(index, 1);\n            this.storeItems.splice(index, 1);\n            localStorage.removeItem(index);\n        }\n        localStorage.setItem('storeItems', JSON.stringify(this.storeItems));\n    }\n\n}\n\n//# sourceURL=webpack:///./src/js/modules/Suppliers.js?");

/***/ }),

/***/ "./src/js/modules/calculation/Calculator.js":
/*!**************************************************!*\
  !*** ./src/js/modules/calculation/Calculator.js ***!
  \**************************************************/
/*! exports provided: Calculator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Calculator\", function() { return Calculator; });\n/* harmony import */ var _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prices/productPriceList.js */ \"./src/js/modules/calculation/prices/productPriceList.js\");\n/* harmony import */ var _Foil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Foil.js */ \"./src/js/modules/calculation/Foil.js\");\n/* harmony import */ var _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrintStandard.js */ \"./src/js/modules/calculation/PrintStandard.js\");\n/* harmony import */ var _PrintInner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrintInner.js */ \"./src/js/modules/calculation/PrintInner.js\");\n\n\n\n\n\nclass Product1 {\n    constructor() {\n        this.theFormProduct = document.forms['product-1'];\n        this.printStandard = new _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__[\"PrintStandard\"](this.theFormProduct, 'product-1-print', 'product-1-c1', 'product-1-c2', 'product-1-c3', 'product-1-c4', 'product-1-c5', 'product-1-c6', 'product-1-c7', 'product-1-c8');\n        this.foil = new _Foil_js__WEBPACK_IMPORTED_MODULE_1__[\"Foil\"](this.theFormProduct, 'product-1-foil', 'product-1-d1', 'product-1-d2', 'product-1-d3', 'product-1-d4', 'product-1-d5', 'product-1-d6', 'product-1-d7', _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].foilPrice);\n        this.count = document.getElementById('product-1-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.size = document.getElementById('product-1-size').addEventListener('change', this.getProductPrice.bind(this));\n        this.material = document.getElementById('product-1-material').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheets = document.getElementById('product-1-sheets').addEventListener('change', this.getProductPrice.bind(this));\n        this.crease = document.getElementById('product-1-crease').addEventListener('change', this.getProductPrice.bind(this));\n        this.corners = document.getElementById('card-corners').addEventListener('click', this.getProductPrice.bind(this));\n        this.printPrice = document.getElementById('product-1-print').addEventListener('change', this.getProductPrice.bind(this));\n        this.foilPrice = document.getElementById('product-1-foil').addEventListener('change', this.getProductPrice.bind(this));\n\n        this.result = document.querySelector('.product-1-price-result span');\n        this.refreshPage();\n        this.getProductPrice();\n    }\n    getProductCount() {\n        const count = parseInt(document.getElementById('product-1-count').value);\n        return count;\n    }\n    getProductSize() {\n        const selected = this.theFormProduct.elements['product-1-size'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize[selected.value];\n        const sheetB1 = document.querySelector('.sheet-1-B1');\n        const sheetA1 = document.querySelector('.sheet-1-A1');\n\n        //access conditions\n        if (selected) {\n            if (selected.value === 'product-1-a6' || selected.value === 'product-1-a6') {\n                sheetA1.classList.add('disable-sheets');\n                sheetA1.disabled = true;\n            } else {\n                sheetA1.classList.remove('disable-sheets');\n                sheetA1.disabled = false;\n            }\n            if (selected.value === 'product-1-a1' || selected.value === 'product-1-a2' || selected.value === 'product-1-a3' || selected.value === 'product-1-a4') {\n                sheetB1.classList.add('disable-sheets');\n                sheetB1.disabled = true;\n            } else {\n                sheetB1.classList.remove('disable-sheets');\n                sheetB1.disabled = false;\n            }\n        }\n        return price;\n    }\n    getProductMaterial() {\n        const selected = this.theFormProduct.elements['product-1-material'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const B1A1 = [...document.querySelectorAll('.B1-A1-condition-1')];\n        //access conditions\n        B1A1.forEach(el => {\n            if (selectedIndex > 8) {\n                el.disabled = true;\n                el.classList.add('disable-element');\n            } else {\n                el.disabled = false;\n                el.classList.remove('disable-element');\n            }\n        });\n        return price;\n    }\n    getProductCrease() {\n        const selected = this.theFormProduct.elements['product-1-crease'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productCrease[selected.value];\n        return price;\n    }\n    getProductSheets() {\n        const selected = this.theFormProduct.elements['product-1-sheets'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterial = [...document.querySelectorAll('.condition-satin')];\n        //access conditions\n        if (selected) {\n            enabeleMaterial.forEach(el => {\n                if (selected.value === 'product-1-f2' || selected.value === 'product-1-f3') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n    getCardCorners() {\n        let cornersPrice = 0;\n        const selectedCorners = this.theFormProduct.elements[\"card-corners\"];\n        if (selectedCorners.checked == true) {\n            cornersPrice = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].corners;\n        } else {\n            cornersPrice = 0;\n        }\n        return cornersPrice;\n    }\n\n    getProductPrice() {\n        const count = this.getProductCount();\n        const sizeProd = this.getProductSize();\n        const materialProd = this.getProductMaterial();\n        const creaseProd = this.getProductCrease();\n        const sheetsProd = this.getProductSheets();\n        const cornersProd = this.getCardCorners();\n        const printProd = this.printStandard.getPricePrint(count, sizeProd);\n        const foilProd = this.foil.getPriceFoil(count, sizeProd);\n\n        const productPrice = (sizeProd * materialProd * sheetsProd + creaseProd + cornersProd) * count + printProd + foilProd;\n        this.result.textContent = productPrice.toFixed(2);\n    }\n    refreshPage() {\n        const priceSize = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize['product-1-a1'];\n        const priceMaterial = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial['product-1-b1'];\n        let result = priceSize * priceMaterial;\n        const reset = document.querySelectorAll('.reset');\n        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)));\n    }\n}\n\nclass Product2 {\n    constructor() {\n        this.theFormProduct = document.forms['product-2'];\n        this.printInner = new _PrintInner_js__WEBPACK_IMPORTED_MODULE_3__[\"PrintInner\"]('product-2-pages-count', 'product-2-pages-black', 'product-2-pages-color', 'product-2-pages-empty');\n        this.printStandard = new _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__[\"PrintStandard\"](this.theFormProduct, 'product-2-print', 'product-2-c1', 'product-2-c2', 'product-2-c3', 'product-2-c4', 'product-2-c5', 'product-2-c6', 'product-2-c7', 'product-2-c8');\n        this.foil = new _Foil_js__WEBPACK_IMPORTED_MODULE_1__[\"Foil\"](this.theFormProduct, 'product-2-foil', 'product-2-d1', 'product-2-d2', 'product-2-d3', 'product-2-d4', 'product-2-d5', 'product-2-d6', 'product-2-d7', _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].foilPrice);\n\n        this.pages = document.getElementById('product-2-pages-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesBlack = document.getElementById('product-2-pages-black').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesColor = document.getElementById('product-2-pages-color').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesEmpty = document.getElementById('product-2-pages-empty').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheetsForInner = document.getElementById('product-2-sheets-inner').addEventListener('change', this.getProductPrice.bind(this));\n\n        this.count = document.getElementById('product-2-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.size = document.getElementById('product-2-size').addEventListener('change', this.getProductPrice.bind(this));\n        this.material = document.getElementById('product-2-material').addEventListener('change', this.getProductPrice.bind(this));\n        this.cover = document.getElementById('product-2-cover').addEventListener('change', this.getProductPrice.bind(this));\n        this.printStandardPrice = document.getElementById('product-2-print').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheetsForCover = document.getElementById('product-2-sheets-cover').addEventListener('change', this.getProductPrice.bind(this));\n        this.foilPrice = document.getElementById('product-2-foil').addEventListener('change', this.getProductPrice.bind(this));\n        this.binding = document.getElementById('product-2-binding').addEventListener('change', this.getProductPrice.bind(this));\n        this.wings = document.getElementById('product-2-wings').addEventListener('click', this.getProductPrice.bind(this));\n\n        this.result = document.querySelector('.product-2-price-result span');\n        this.resetPage();\n        this.getProductPrice();\n    }\n\n    getProductCount() {\n        const count = parseInt(document.getElementById('product-2-count').value);\n        return count;\n    }\n    getProductSize() {\n        const selected = this.theFormProduct.elements['product-2-size'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize[selected.value];\n        const innerB1 = document.querySelector('.sheet-2-inner-B1');\n        const innerA1 = document.querySelector('.sheet-2-inner-A1');\n        const coverB1 = document.querySelector('.sheet-2-cover-B1');\n        const coverA1 = document.querySelector('.sheet-2-cover-A1');\n        //access conditions\n        if (selected) {\n            if (selected.value === 'product-2-a1' || selected.value === 'product-2-a2' || selected.value === 'product-2-a3') {\n                innerB1.classList.add('disable-element');\n                innerB1.disabled = true;\n                coverB1.classList.add('disable-element');\n                coverB1.disabled = true;\n            } else {\n                innerB1.classList.remove('disable-element');\n                innerB1.disabled = false;\n                coverB1.classList.remove('disable-element');\n                coverB1.disabled = false;\n            }\n            if (selected.value === 'product-2-a4' || selected.value === 'product-2-a5' || selected.value === 'product-2-a6') {\n                innerA1.classList.add('disable-element');\n                innerA1.disabled = true;\n                coverA1.classList.add('disable-element');\n                coverA1.disabled = true;\n            } else {\n                innerA1.classList.remove('disable-element');\n                innerA1.disabled = false;\n                coverA1.classList.remove('disable-element');\n                coverA1.disabled = false;\n            }\n        }\n        return price;\n    }\n    getProductMaterial() {\n        const selected = this.theFormProduct.elements['product-2-material'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const sra3 = document.querySelector('.sheet-2-inner-sra3');\n        const B1A1 = [...document.querySelectorAll('.B1-A1-condition-inner-2')];\n        //access conditions\n        if (selectedIndex < 10) {\n            sra3.disabled = true;\n            sra3.classList.add('disable-sheets');\n        } else {\n            sra3.disabled = false;\n            sra3.classList.remove('disable-sheets');\n        }\n\n        B1A1.forEach(sheet => {\n            if (selectedIndex > 14) {\n                sheet.classList.add('disable-sheets');\n                sheet.disabled = true;\n            } else {\n                sheet.classList.remove('disable-sheets');\n                sheet.disabled = false;\n            }\n        });\n\n        return price;\n    }\n    getProductCover() {\n        const selected = this.theFormProduct.elements['product-2-cover'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productCover[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const sra3 = document.querySelector('.sra3-condition-cover-2');\n        //access conditions\n        if (selectedIndex > 0 && selectedIndex < 4) {\n            sra3.disabled = true;\n            sra3.classList.add('disable-sheets');\n        } else {\n            sra3.disabled = false;\n            sra3.classList.remove('disable-sheets');\n        }\n        return price;\n    }\n    getProductBinding() {\n        const selected = this.theFormProduct.elements['product-2-binding'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productBinding[selected.value];\n        return price;\n    }\n    getProductSheetsForCover() {\n        const selected = this.theFormProduct.elements['product-2-sheets-cover'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterialForInner = [...document.querySelectorAll('.condition-cover')];\n        //access conditions\n        if (selected) {\n            enabeleMaterialForInner.forEach(el => {\n                if (selected.value === 'product-2-g1') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n    getProductSheetsForInner() {\n        const selected = this.theFormProduct.elements['product-2-sheets-inner'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterialForInner = [...document.querySelectorAll('.condition-inner')];\n        const enabeleMaterialForInnerSatin = [...document.querySelectorAll('.condition-inner-satin')];\n        //access conditions\n        if (selected) {\n            enabeleMaterialForInner.forEach(el => {\n                if (selected.value === 'product-2-f1') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n            enabeleMaterialForInnerSatin.forEach(el => {\n                if (selected.value === 'product-2-f2' || selected.value === 'product-2-f3') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n\n    getProductWings(count, size, material, print, sheetsForCover, foil) {\n        let price = 0;\n        const selected = this.theFormProduct.elements['product-2-wings'];\n        if (selected.checked == true && this.getProductCover() > 0) {\n            price = size * material * sheetsForCover * count + print + foil;\n        } else {\n            price = 0;\n        }\n        return price;\n    }\n\n    getProductPrice() {\n        const count = this.getProductCount();\n        const sizeProd = this.getProductSize();\n        const materialProd = this.getProductMaterial();\n        const coverMaterial = this.getProductCover();\n        const sheetsForCover = this.getProductSheetsForCover();\n        const sheetsForInner = this.getProductSheetsForInner();\n        const binding = this.getProductBinding();\n        const printForCover = this.printStandard.getPricePrint(count, sizeProd * 2);\n        const foilForCover = this.foil.getPriceFoil(count, sizeProd * 2);\n        const wings = this.getProductWings(count, sizeProd, coverMaterial, printForCover / 2, sheetsForCover, foilForCover / 2);\n        const printInner = this.printInner.getPriceInnerPrint(count, sizeProd, materialProd, sheetsForInner);\n        let productPrice = (sizeProd * 2 * coverMaterial * sheetsForCover + printInner + binding) * count + foilForCover + printForCover + wings;\n        this.result.textContent = productPrice.toFixed(2);\n    }\n\n    resetPage() {\n        let result = 0;\n        const reset = document.querySelectorAll('.reset');\n        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)));\n    }\n}\n\nclass Calculator {\n    constructor() {\n        this.product1 = new Product1();\n        this.product2 = new Product2();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/calculation/Calculator.js?");

/***/ }),

/***/ "./src/js/modules/calculation/Foil.js":
/*!********************************************!*\
  !*** ./src/js/modules/calculation/Foil.js ***!
  \********************************************/
/*! exports provided: Foil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Foil\", function() { return Foil; });\nclass Foil {\n  constructor(theProductForm, selectForm, sel1, sel2, sel3, sel4, sel5, sel6, sel7, foilPrice) {\n    this.sel1 = sel1;\n    this.sel2 = sel2;\n    this.sel3 = sel3;\n    this.sel4 = sel4;\n    this.sel5 = sel5;\n    this.sel6 = sel6;\n    this.sel7 = sel7;\n    this.theProductForm = theProductForm;\n    this.selected = this.theProductForm.elements[selectForm];\n    this.price = foilPrice;\n  }\n  getPriceFoil(countEl, sizeEl) {\n    const sizeSRA3 = 0.12474;\n    let numberEl = sizeEl / sizeSRA3;\n    if (numberEl > 0.5 && numberEl < 1) numberEl = 1; //if the b4 format has been selected, its value is equal to A3\n    if (numberEl > 0.25 && numberEl < 0.5) numberEl = 0.5;\n    let modifier = Math.ceil(numberEl * countEl);\n    let price = 0;\n\n    if (this.selected.value === this.sel2 || this.selected.value === this.sel3 || this.selected.value === this.sel4) {\n      price = this.price * modifier;\n    } else if (this.selected.value === this.sel5 || this.selected.value === this.sel6 || this.selected.value === this.sel7) {\n      price = this.price * 2 * modifier;\n    } else {\n      price = 0;\n    }\n    return price;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/modules/calculation/Foil.js?");

/***/ }),

/***/ "./src/js/modules/calculation/PrintInner.js":
/*!**************************************************!*\
  !*** ./src/js/modules/calculation/PrintInner.js ***!
  \**************************************************/
/*! exports provided: PrintInner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PrintInner\", function() { return PrintInner; });\n/* harmony import */ var _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prices/printPrice.js */ \"./src/js/modules/calculation/prices/printPrice.js\");\n\n\nclass PrintInner {\n  constructor(pages, black, color, empty) {\n    this.pages = document.getElementById(pages);\n    this.pagesBlack = document.getElementById(black);\n    this.pagesColor = document.getElementById(color);\n    this.pagesEmpty = document.getElementById(empty);\n    // this.pricePrint = pricePrint\n  }\n\n  getPriceInnerPrint(countEl, sizeEl, materialEl, sheetsEL) {\n    let price = 0;\n    let count = parseInt(this.pages.value);\n    let countColor = parseInt(this.pagesColor.value);\n    let countEmpty = parseInt(this.pagesEmpty.value);\n    let countBlack = count - countColor - countEmpty;\n    this.pagesBlack.value = countBlack;\n    let priceBlack = 0;\n    let priceColor = 0;\n    const sizeA4 = 0.06237;\n    let numberEl = sizeEl / sizeA4;\n\n    if (numberEl > 0.5 && numberEl < 1) numberEl = 0.5;\n    if (numberEl > 0 && numberEl < 0.5) numberEl = 0.25;\n\n    let modifierBlack = countBlack * numberEl;\n    let modifierColor = countColor * numberEl;\n\n    if (countEl > 0) {\n      //printing conditions\n      this.pagesEmpty.max = count;\n      this.pagesColor.max = count;\n\n      if (numberEl >= 1) {\n        priceBlack = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].A4_blackOneSide * countBlack;\n        priceColor = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorOneSided / 2 * countColor;\n      } else if (numberEl < 1) {\n        priceBlack = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].A4_blackOneSide * modifierBlack;\n        priceColor = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorOneSided / 2 * modifierColor;\n      }\n\n      //quantity conditions\n      if (count > 0) {\n        this.pagesColor.disabled = false;\n        this.pagesEmpty.disabled = false;\n        if (countColor >= count) {\n          this.pagesColor.value = count - countEmpty;\n          countColor = this.pagesColor.value;\n          this.pagesEmpty.disabled = true;\n          this.pagesBlack.value = 0;\n          countBlack = 0;\n        } else if (countEmpty >= count) {\n          this.pagesEmpty.value = count - countColor;\n          countEmpty = this.pagesEmpty.value;\n          this.pagesColor.disabled = true;\n          this.pagesBlack.value = 0;\n          countBlack = 0;\n        } else if (countColor > count || countEmpty > count || countColor + countEmpty > count) return;\n      } else {\n        this.pagesColor.disabled = true;\n        this.pagesEmpty.disabled = true;\n        this.pagesBlack.value = 0;\n        this.pagesColor.value = 0;\n        this.pagesEmpty.value = 0;\n        priceBlack = 0;\n        priceColor = 0;\n      }\n    }\n    //one sheet side is double-sided printing  -> / 2\n    price = materialEl * sizeEl / 2 * sheetsEL * count + priceBlack + priceColor;\n    return price;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/modules/calculation/PrintInner.js?");

/***/ }),

/***/ "./src/js/modules/calculation/PrintStandard.js":
/*!*****************************************************!*\
  !*** ./src/js/modules/calculation/PrintStandard.js ***!
  \*****************************************************/
/*! exports provided: PrintStandard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PrintStandard\", function() { return PrintStandard; });\n/* harmony import */ var _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prices/printPrice.js */ \"./src/js/modules/calculation/prices/printPrice.js\");\n\n\nclass PrintStandard {\n  constructor(theProductForm, selectForm, prodC1, prodC2, prodC3, prodC4, prodC5, prodC6, prodC7, prodC8) {\n    this.prodC1 = prodC1; //none print\n    this.prodC2 = prodC2; //4 + 0 color\n    this.prodC3 = prodC3; //4 + 1 color\n    this.prodC4 = prodC4; //4 + 4 color\n    this.prodC5 = prodC5; //1 + 0 color\n    this.prodC6 = prodC6; //1 + 1 color\n    this.prodC7 = prodC7; //1 + 1 black and white\n    this.prodC8 = prodC8; //1 + 1 black and white\n    this.theProductForm = theProductForm;\n    this.selected = this.theProductForm.elements[selectForm];\n    // this.pricePrint = pricePrint\n  }\n  getPricePrint(countEl, sizeEl) {\n    let price = 0;\n    const sizeSRA3 = 0.12474;\n    let numberEl = sizeEl / sizeSRA3;\n    let modifier = numberEl * countEl;\n\n    //0.5 equals 1 click to A4 size\n    if (numberEl > 0.5 && numberEl < 1) numberEl = 0.5; //if the format is larger than A4 and smaller than A3\n\n    modifier = numberEl * countEl;\n    if (this.selected.value === this.prodC1) {\n      price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nonePrint;\n    }\n    //color 4 + 0\n    else if (this.selected.value === this.prodC2) {\n        if (numberEl <= 0.5) {\n          price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorOneSided * modifier;\n        } else if (numberEl > 0.5) {\n          price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorOneSided * countEl;\n        }\n      }\n      //color 4 + 1\n      else if (this.selected.value === this.prodC3) {\n          if (numberEl <= 0.5) {\n            price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorAndBlack * modifier;\n          } else if (numberEl > 0.5) {\n            price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorAndBlack * countEl;\n          }\n        }\n        //color 4 + 4\n        else if (this.selected.value === this.prodC4) {\n            if (numberEl <= 0.5) {\n              price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorAndColor * modifier;\n            } else if (numberEl > 0.5) {\n              price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_colorAndColor * countEl;\n            }\n          }\n          //color 1 + 0\n          else if (this.selected.value === this.prodC5) {\n              if (numberEl <= 0.5) {\n                price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackOneSided * modifier;\n              } else if (numberEl > 0.5) {\n                price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackOneSided * countEl;\n              }\n            }\n            //color 1 + 1\n            else if (this.selected.value === this.prodC6) {\n                if (numberEl <= 0.5) {\n                  price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackAndBlack * modifier;\n                } else if (numberEl > 0.5) {\n                  price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackAndBlack * countEl;\n                }\n              }\n              //black 1 + 0 \n              else if (this.selected.value === this.prodC7) {\n                  if (numberEl <= 0.5) {\n                    price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackOneSidedBlack * modifier;\n                  } else if (numberEl > 0.5) {\n                    price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackOneSidedBlack * countEl;\n                  }\n                }\n                //black 1 + 1\n                else if (this.selected.value === this.prodC8) {\n                    if (numberEl < 0.5) {\n                      price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackDubleSideBlack * modifier;\n                    } else if (numberEl > 0.5) {\n                      price = _prices_printPrice_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SRA3_blackDubleSideBlack * countEl;\n                    }\n                  } else {\n                    price = 0;\n                  }\n    return price;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/modules/calculation/PrintStandard.js?");

/***/ }),

/***/ "./src/js/modules/calculation/prices/printPrice.js":
/*!*********************************************************!*\
  !*** ./src/js/modules/calculation/prices/printPrice.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst printPrice = {\n   nonePrint: 0,\n   SRA3_colorOneSided: 0.12,\n   SRA3_colorAndBlack: 0.192,\n   SRA3_colorAndColor: 0.24,\n   SRA3_blackOneSided: 0.072,\n   SRA3_blackAndBlack: 0.144,\n   SRA3_blackOneSidedBlack: 0.02,\n   SRA3_blackDubleSideBlack: 0.04,\n   A4_blackOneSide: 0.01,\n   A4_blackDubleSide: 0.02\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (printPrice);\n\n//# sourceURL=webpack:///./src/js/modules/calculation/prices/printPrice.js?");

/***/ }),

/***/ "./src/js/modules/calculation/prices/productPriceList.js":
/*!***************************************************************!*\
  !*** ./src/js/modules/calculation/prices/productPriceList.js ***!
  \***************************************************************/
/*! exports provided: priceList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"priceList\", function() { return priceList; });\n\n//SIZE conversion to square meter\nconst productSize = new Array();\nproductSize['product-1-a1'] = 0.12474; //a3\nproductSize['product-1-a2'] = 0.06237; //a4\nproductSize['product-1-a3'] = 0.031185; //a5\nproductSize['product-1-a4'] = 0.0155925; //a6\nproductSize['product-1-a5'] = 0.02079; //dl\nproductSize['product-1-a6'] = 0.088; //b4\nproductSize['product-1-a7'] = 0.044; //b5\nproductSize['product-1-a8'] = 0.005; //wizytówki\nproductSize['product-2-a1'] = 0.06237; //a4\nproductSize['product-2-a2'] = 0.031185; //a5\nproductSize['product-2-a3'] = 0.0155925; //a6\nproductSize['product-2-a4'] = 0.088; //b4\nproductSize['product-2-a5'] = 0.044; //b5\nproductSize['product-2-a6'] = 0.022; //b6\n\n//MATERIAL\n// SIZE(A3) * productMaterial(modifier) = MATERIAL PRICE --- for example -> 115g kreda SRA3 0,118 - the price of chalk in sra3 format is 0,118 --->\n// size(0.12474) * productMaterial(0.946) = 0,118 )\nconst productMaterial = new Array();\nproductMaterial['product-1-b1'] = 0.830; //100g kreda SRA3 0,103 0,25gr/ark B1\nproductMaterial['product-1-b2'] = 0.946; //115g kreda SRA3 0,118 0,28gr/ark B1\nproductMaterial['product-1-b3'] = 1.066; //130g kreda SRA3 0,133 0,32gr/ark B1\nproductMaterial['product-1-b4'] = 1.235; //150g kreda SRA3 0,154 0,37gr/ark B1\nproductMaterial['product-1-b5'] = 1.395; //170g kreda SRA3 0,174 0,42gr/ark B1\nproductMaterial['product-1-b6'] = 1.643; //200g kreda SRA3 0,205 0,49gr/ark B1\nproductMaterial['product-1-b7'] = 2.116; //250g kreda SRA3 0,264 0,63gr/ark B1\nproductMaterial['product-1-b8'] = 2.613; //300g kreda SRA3 0,326 0,78gr/ark B1\nproductMaterial['product-1-b9'] = 3.094; //350g kreda SRA3 0,386 0,92gr/ark B1\nproductMaterial['product-1-b10'] = 0.986; //90g satyna SRA3 0,123\nproductMaterial['product-1-b11'] = 1.090; //100g satyna SRA3 0,136\nproductMaterial['product-1-b12'] = 1.315; //120g satyna SRA3 0,164\nproductMaterial['product-1-b13'] = 1.756; //160g satyna SRA3 0,219\nproductMaterial['product-1-b14'] = 2.405; //200g satyna SRA3 0,300\nproductMaterial['product-1-b15'] = 3.159; //250g satyna SRA3 0,394\nproductMaterial['product-1-b16'] = 3.792; //300g satyna SRA3 0,473\nproductMaterial['product-1-b17'] = 4.746; //350g satyna SRA3 0,592\nproductMaterial['product-1-b18'] = 4.746; //300g DNS SRA3 0,592 -------------------------------\nproductMaterial['product-2-b1'] = 0.5700; //60g creamy A1-0,0302(0.126) B1-0,0302(0.169)\nproductMaterial['product-2-b2'] = 0.6612; //70g creamy A1-0,035(0.147) B1-0,0352(0.197)\nproductMaterial['product-2-b3'] = 0.7555; //80g creamy A1-0,0401(0.168) B1-0,0402(0.225)\nproductMaterial['product-2-b4'] = 0.7360; //70g lux cream A1-0,0391(0.164) B1-0,0392(0.219)\nproductMaterial['product-2-b5'] = 0.8535; //80g lux cream A1-0,0449(0.188) B1-0,045(0.252)\nproductMaterial['product-2-b6'] = 0.9501; //90g lux cream A1-0,0506(0.212) B1-0,0506(0.283)\nproductMaterial['product-2-b7'] = 0.5380; //70g offset A1-0,0297(0.124) B1-0,0286(0.16)\nproductMaterial['product-2-b8'] = 0.6355; //80g offset A1-0,0329(0.138) B1-0,0339(0.19)\nproductMaterial['product-2-b9'] = 0.6820; //90g offset A1-0,0370(0.155) B1-0,0357(0.20)\nproductMaterial['product-2-b10'] = 0.7698; //100g offset A1-0,0412(0.173) B1-0,0411(0.23)\nproductMaterial['product-2-b11'] = 0.780; //90g kreda SRA3-0,09? A1-0,0404(0.169) B1-0,0410(0.23)------------------------\nproductMaterial['product-2-b12'] = 0.830; //100g kreda SRA3-0,103 A1-0,0435 B1-0,0446(0.25)\nproductMaterial['product-2-b13'] = 0.946; //115g kreda SRA3-0,118 A1-0,0488(0.205) B1-0,0499(0.28)\nproductMaterial['product-2-b14'] = 1.066; //130g kreda SRA3-0,133 A1-0,0552(0.231) B1-0,0571(0.32)\nproductMaterial['product-2-b15'] = 1.235; //150g kreda SRA3-0,154 A1-0,0637(0.267) B1-0,0660(0.37)\nproductMaterial['product-2-b16'] = 0.986; //90g satyna SRA3-0,123\nproductMaterial['product-2-b17'] = 1.090; //100g satyna SRA3-0,136\nproductMaterial['product-2-b18'] = 1.315; //120g satyna SRA3-0,164\nproductMaterial['product-2-b19'] = 1.756; //160g satyna SRA3-0,219\n\n//SHEETS\n// modificator(productSheets) * ( y * size) = price\n// price / modificator(productSheets) = result => result / size(format(B1 or A1) / A3) = result => result / A3 = modificator(productCover)\nconst productSheets = new Array();\nproductSheets['product-1-f1'] = 1; //SRA3\nproductSheets['product-1-f2'] = 0.4237; //B1 0.389\nproductSheets['product-1-f3'] = 0.4346; //A1\nproductSheets['product-2-f1'] = 1; //SRA3 srodek\nproductSheets['product-2-f2'] = 0.4237; //B1 srodek 0.4237\nproductSheets['product-2-f3'] = 0.4346; //A1 srodek a1 / 4 (a3)\nproductSheets['product-2-g1'] = 1; //SRA3 okładka\nproductSheets['product-2-g2'] = 0.4237; //B1 okładka \nproductSheets['product-2-g3'] = 0.4410; //A1 okładka 0.4346  0.4480;\n\n//MATERIAL COVER\nconst productCover = new Array();\nproductCover['product-2-h1'] = 0; //brak\nproductCover['product-2-h2'] = 2.5813; //SRA3 karton gc1 230g\nproductCover['product-2-h3'] = 2.7142; //SRA3 karton gc1 250g\nproductCover['product-2-h4'] = 3.2570; //SRA3 karton gc1 300g\nproductCover['product-2-h5'] = 1.643; //200g kreda SRA3 0,264\nproductCover['product-2-h6'] = 2.116; //250g kreda SRA3 0,264\nproductCover['product-2-h7'] = 2.613; //300g kreda SRA3 0,326\nproductCover['product-2-h8'] = 3.094; //350g kreda SRA3 0,386\nproductCover['product-2-h9'] = 2.405; //200g satyna SRA3 0,394\nproductCover['product-2-h10'] = 3.159; //250g satyna SRA3 0,394\nproductCover['product-2-h11'] = 3.792; //300g satyna SRA3 0,473\nproductCover['product-2-h12'] = 4.746; //350g satyna SRA3 0,592\n\n//CREASE\nconst productCrease = new Array();\nproductCrease['product-1-e1'] = 0;\nproductCrease['product-1-e2'] = 0.1;\nproductCrease['product-1-e3'] = 0.2;\nproductCrease['product-1-e4'] = 0.3;\nproductCrease['product-1-e5'] = 0.4;\nproductCrease['product-1-e6'] = 0.5;\n\n//BINDING\nconst productBinding = new Array();\nproductBinding['product-2-e1'] = 0;\nproductBinding['product-2-e2'] = 0.3;\nproductBinding['product-2-e3'] = 0.5;\nproductBinding['product-2-e4'] = 0.6;\n\n//FOIL\nconst foilPrice = 0.3;\n\n//CORNERS\nconst corners = 0.1;\n\nconst priceList = {\n    productSize,\n    productMaterial,\n    productSheets,\n    productCover,\n    productCrease,\n    productBinding,\n    foilPrice,\n    corners\n};\n\n//# sourceURL=webpack:///./src/js/modules/calculation/prices/productPriceList.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1615817588091\n      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.i, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ })

/******/ });