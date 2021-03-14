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
/******/ 	var hotCurrentHash = "1030aa8ec414e6d942be";
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/style.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/style.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap);\", \"\"]);\n\n// Module\nexports.push([module.i, \"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box; }\\n\\nion-icon {\\n  pointer-events: none; }\\n\\ninput:-webkit-autofill,\\ninput:-webkit-autofill:hover,\\ninput:-webkit-autofill:focus,\\ntextarea:-webkit-autofill,\\ntextarea:-webkit-autofill:hover,\\ntextarea:-webkit-autofill:focus,\\nselect:-webkit-autofill,\\nselect:-webkit-autofill:hover,\\nselect:-webkit-autofill:focus {\\n  -webkit-text-fill-color: #d3d3d3;\\n  transition: background-color 5000s ease-in-out 0s; }\\n\\nbutton {\\n  background-color: transparent;\\n  border: none;\\n  cursor: pointer;\\n  transition: .2s;\\n  line-height: 1.2rem;\\n  letter-spacing: 1px;\\n  transition: .2s; }\\n\\na {\\n  text-decoration: none; }\\n\\ninput:focus {\\n  outline: none; }\\n\\ntextarea:focus {\\n  outline: none;\\n  border: none; }\\n\\nbutton:focus {\\n  outline: none; }\\n\\nbutton:active {\\n  outline: none; }\\n\\nbutton::selection {\\n  outline: none; }\\n\\nselect {\\n  cursor: pointer;\\n  outline: none; }\\n\\nlabel {\\n  font-weight: lighter; }\\n\\nbody {\\n  font-family: 'Roboto', sans-serif;\\n  letter-spacing: 1px;\\n  line-height: 1.3rem; }\\n\\n#app {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background-color: #222222;\\n  width: 100%;\\n  height: 100vh;\\n  padding: 20px; }\\n\\nbutton {\\n  background-color: #3d3d3d; }\\n\\n.calculator {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%;\\n  height: auto;\\n  max-width: 1400px;\\n  overflow: hidden;\\n  padding: 30px;\\n  border-radius: 50px;\\n  border: solid 10px #3f7486;\\n  background-color: #222222; }\\n\\n.calculator-container {\\n  display: flex;\\n  justify-content: space-between;\\n  width: 100%;\\n  height: 100%;\\n  background-color: #222222; }\\n\\n.navigation-panel {\\n  position: relative; }\\n\\n.nav-container {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #2f2f2f;\\n  padding: 30px 20px;\\n  border-radius: 20px;\\n  width: 300px;\\n  min-width: 300px;\\n  height: auto;\\n  display: flex;\\n  flex-direction: column;\\n  margin-bottom: 20px; }\\n  .nav-container:last-child {\\n    margin-bottom: 0; }\\n\\n#logo {\\n  width: auto;\\n  height: 35px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  color: #f0f0f0;\\n  opacity: .7;\\n  user-select: none; }\\n  #logo .logo-h1 {\\n    font-size: 27px; }\\n  #logo img {\\n    width: 35px;\\n    height: 35px;\\n    margin-right: 10px; }\\n  #logo:hover {\\n    opacity: .9; }\\n\\n.select-print-container {\\n  display: flex;\\n  flex-direction: column;\\n  position: relative; }\\n\\n.select-print-btn {\\n  -webkit-box-shadow: 0px 1px 6px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 6px -1px rgba(0, 0, 0, 0.6);\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  justify-content: flex-start;\\n  width: auto;\\n  max-width: 300px;\\n  padding: 15px 20px;\\n  border-radius: 12px;\\n  margin-bottom: 30px;\\n  color: #d3d3d3;\\n  font-size: 17px;\\n  text-align: left; }\\n  .select-print-btn:last-child {\\n    margin-bottom: 0; }\\n  .select-print-btn:hover {\\n    background-color: #3f7486; }\\n  .select-print-btn img {\\n    width: 60px;\\n    height: 60px;\\n    object-fit: cover;\\n    margin-right: 20px; }\\n\\n.select-print-btn--active {\\n  background-color: #3f7486; }\\n\\n.nav-container-small-btn {\\n  height: auto; }\\n\\n.small-btn-wraper {\\n  display: flex;\\n  justify-content: center;\\n  width: 100%;\\n  margin-bottom: 20px; }\\n  .small-btn-wraper:last-child {\\n    margin-bottom: 0; }\\n\\n.small-btn {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  -webkit-box-shadow: 0px 1px 6px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 6px -1px rgba(0, 0, 0, 0.6);\\n  width: 80px;\\n  height: 60px;\\n  border-radius: 9px;\\n  padding: 10px;\\n  margin-right: 20px;\\n  font-size: 35px; }\\n  .small-btn:last-child {\\n    margin-right: 0; }\\n  .small-btn:hover {\\n    background-color: #3f7486; }\\n  .small-btn .small-btn-icon {\\n    color: #d3d3d3; }\\n\\n.bottom-panel {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #2f2f2f;\\n  padding: 30px 20px;\\n  border-radius: 20px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  margin-top: 30px;\\n  border-radius: 20px;\\n  width: 100%;\\n  height: 100px;\\n  min-height: 70px;\\n  padding: 10px 40px; }\\n\\n.description-app-h1 {\\n  color: #3f7486;\\n  font-size: 20px;\\n  letter-spacing: 2px; }\\n\\n.info-btn {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  width: 45px;\\n  height: 45px;\\n  border-radius: 50%; }\\n  .info-btn:hover {\\n    background-color: #3f7486; }\\n  .info-btn:active {\\n    transform: scale(1.1); }\\n  .info-btn .icon-info {\\n    font-size: 32px;\\n    color: #d3d3d3; }\\n\\n.info-btn--active {\\n  background-color: #3f7486; }\\n\\n.info-container {\\n  -webkit-box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.4);\\n  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.4);\\n  position: absolute;\\n  right: 115px;\\n  bottom: 10px;\\n  width: 600px;\\n  height: auto;\\n  z-index: 998;\\n  border-radius: 10px;\\n  color: #2f2f2f;\\n  background-color: #f0f0f0;\\n  display: none; }\\n  .info-container:before {\\n    content: '';\\n    position: absolute;\\n    right: -12px;\\n    bottom: 32px;\\n    width: 24px;\\n    height: 24px;\\n    background-color: #f0f0f0;\\n    transform: rotate(45deg);\\n    z-index: -1; }\\n\\n.info-content {\\n  border-radius: 10px;\\n  width: 100%;\\n  height: auto;\\n  background-color: #f0f0f0;\\n  z-index: 999;\\n  padding: 15px; }\\n  .info-content .info-topbar {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-bottom: 15px;\\n    color: #2f2f2f; }\\n    .info-content .info-topbar .info-close {\\n      display: flex;\\n      justify-content: center;\\n      align-items: center;\\n      color: #2f2f2f;\\n      background-color: transparent; }\\n      .info-content .info-topbar .info-close:active {\\n        transform: scale(1.1); }\\n      .info-content .info-topbar .info-close .close-icon {\\n        font-size: 30px; }\\n\\n.info-text-container {\\n  max-height: 400px;\\n  overflow-y: scroll;\\n  padding-right: 10px; }\\n  .info-text-container::-webkit-scrollbar {\\n    width: 8px;\\n    background-color: #dedede;\\n    border-radius: 10px;\\n    cursor: pointer; }\\n  .info-text-container::-webkit-scrollbar-thumb {\\n    background-color: #cccccc;\\n    border-radius: 10px; }\\n  .info-text-container ul {\\n    margin-top: 7px; }\\n  .info-text-container ul, .info-text-container li {\\n    font-size: 14px;\\n    letter-spacing: 0px; }\\n\\n.info-container--active {\\n  display: block; }\\n\\n.add-indormation-txt {\\n  color: #2f2f2f; }\\n\\n.notes-container {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #2f2f2f;\\n  padding: 30px 20px;\\n  border-radius: 20px;\\n  background-color: #2f2f2f;\\n  display: flex;\\n  flex-direction: column;\\n  position: absolute;\\n  overflow: hidden;\\n  color: gray;\\n  transition: .7s ease-in-out;\\n  padding: 20px;\\n  left: -100%;\\n  transform: translateX(-100%);\\n  top: 30px;\\n  width: 800px;\\n  min-width: 300px;\\n  max-height: 700px; }\\n\\n.notes-container--active {\\n  transform: translateX(0);\\n  left: 30px; }\\n\\n.notes-topbar {\\n  width: 100%;\\n  height: 60px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  margin-bottom: 20px; }\\n  .notes-topbar .notes-topbar-left-panel {\\n    display: flex;\\n    align-items: center; }\\n  .notes-topbar .save-notes {\\n    -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    font-size: 30px;\\n    color: #d3d3d3;\\n    padding: 7px;\\n    border-radius: 7px;\\n    background-color: #3d3d3d;\\n    margin: 0 20px; }\\n    .notes-topbar .save-notes:hover {\\n      background-color: #3f7486; }\\n    .notes-topbar .save-notes:active {\\n      transform: scale(1.1); }\\n  .notes-topbar .delete-notes {\\n    -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    font-size: 30px;\\n    color: #d3d3d3;\\n    padding: 7px;\\n    border-radius: 7px;\\n    background-color: #3d3d3d; }\\n    .notes-topbar .delete-notes:hover {\\n      background-color: #3f7486; }\\n    .notes-topbar .delete-notes:active {\\n      transform: scale(1.1); }\\n  .notes-topbar .close {\\n    -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    font-size: 30px;\\n    color: #d3d3d3;\\n    padding: 7px;\\n    border-radius: 7px;\\n    background-color: #3d3d3d; }\\n    .notes-topbar .close:hover {\\n      background-color: #3f7486; }\\n    .notes-topbar .close:active {\\n      transform: scale(1.1); }\\n\\n.notes-textarea {\\n  resize: none;\\n  border: none;\\n  background-color: #f0f0f0;\\n  width: 100%;\\n  height: 100%;\\n  border-radius: 5px;\\n  padding: 6px 10px;\\n  overflow-x: hidden;\\n  min-height: 400px; }\\n  .notes-textarea::-webkit-scrollbar {\\n    width: 10px;\\n    background-color: #dedede;\\n    border-radius: 0 0 10px 10px;\\n    cursor: pointer; }\\n  .notes-textarea::-webkit-scrollbar-thumb {\\n    background-color: #cccccc;\\n    border-radius: 0 0 10px 10px; }\\n  .notes-textarea:focus {\\n    border-color: rgba(0, 225, 255, 0.698); }\\n\\n.notes-btn--active {\\n  background-color: #3f7486; }\\n\\n.suppliers-container {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #2f2f2f;\\n  padding: 30px 20px;\\n  border-radius: 20px;\\n  background-color: #2f2f2f;\\n  display: flex;\\n  flex-direction: column;\\n  position: absolute;\\n  overflow: hidden;\\n  color: gray;\\n  transition: .7s ease-in-out;\\n  padding: 20px;\\n  width: 1000px;\\n  height: auto;\\n  left: -100%;\\n  transform: translateX(-100%);\\n  top: 30px;\\n  overflow-y: hidden; }\\n\\n.suppliers-container--active {\\n  transform: translateX(0);\\n  left: 30px; }\\n\\n.suppliers-btn--active {\\n  background-color: #3f7486; }\\n\\n.suppliers-topbar {\\n  position: relative;\\n  width: 100%;\\n  height: 60px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between; }\\n  .suppliers-topbar .close {\\n    -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    font-size: 30px;\\n    color: #d3d3d3;\\n    padding: 7px;\\n    border-radius: 7px;\\n    background-color: #3d3d3d; }\\n    .suppliers-topbar .close:hover {\\n      background-color: #3f7486; }\\n    .suppliers-topbar .close:active {\\n      transform: scale(1.1); }\\n\\n.suppliers-add {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #2f2f2f;\\n  padding: 30px 20px;\\n  border-radius: 20px;\\n  display: flex;\\n  align-items: center;\\n  width: 100%;\\n  height: auto;\\n  margin-top: 20px;\\n  padding: 10px;\\n  border-radius: 12px; }\\n\\n.suppliers-form {\\n  width: 100%;\\n  height: auto;\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  padding: 3px; }\\n  .suppliers-form label {\\n    font-size: 14px;\\n    font-weight: lighter;\\n    color: gray;\\n    margin-top: 5px; }\\n  .suppliers-form .form-group {\\n    margin-top: 5px;\\n    margin-right: 10px; }\\n  .suppliers-form input {\\n    -webkit-box-shadow: inset 0px 0px 7px -4px #000000;\\n    box-shadow: inset 0px 0px 7px -4px #000000;\\n    border-radius: 5px;\\n    padding: 10px;\\n    margin-top: 3px;\\n    background-color: #393939;\\n    border: 1px solid #2f5663;\\n    color: #d3d3d3; }\\n    .suppliers-form input:focus {\\n      background-color: #393939;\\n      border-color: rgba(0, 225, 255, 0.698); }\\n\\n.btn-add-to-list {\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  font-size: 30px;\\n  color: #d3d3d3;\\n  padding: 7px;\\n  border-radius: 7px;\\n  background-color: #3d3d3d;\\n  align-self: flex-end;\\n  height: 40px;\\n  width: 100px;\\n  margin-left: 10px;\\n  font-size: 16px; }\\n  .btn-add-to-list:hover {\\n    background-color: #3f7486; }\\n  .btn-add-to-list:active {\\n    transform: scale(1.1); }\\n\\n.suppliers-list-container {\\n  -webkit-box-shadow: inset 0px 0px 7px -4px #000000;\\n  box-shadow: inset 0px 0px 7px -4px #000000;\\n  width: 100%;\\n  height: 100%;\\n  min-height: 400px;\\n  max-height: 600px;\\n  margin-top: 20px;\\n  border-radius: 10px;\\n  padding: 15px;\\n  background-color: #f0f0f0;\\n  overflow-y: scroll;\\n  color: #989898; }\\n  .suppliers-list-container::-webkit-scrollbar {\\n    width: 10px;\\n    background-color: #cbcbcb;\\n    border-radius: 10px; }\\n  .suppliers-list-container::-webkit-scrollbar-thumb {\\n    background-color: #878787;\\n    border-radius: 10px; }\\n\\n.suppliers-items {\\n  -webkit-box-shadow: 0px 2px 5px -3px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 5px -3px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  width: 100%;\\n  height: auto;\\n  padding: 10px;\\n  border-radius: 10px;\\n  margin-bottom: 15px;\\n  background-color: gainsboro;\\n  color: #2f2f2f;\\n  pointer-events: none; }\\n  .suppliers-items:hover {\\n    background-color: #3f74864b; }\\n  .suppliers-items:last-child {\\n    margin-bottom: 0; }\\n\\n.suppliers-item {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  -webkit-box-shadow: 0px 1px 5px -3px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 5px -3px rgba(0, 0, 0, 0.6);\\n  border-radius: 5px;\\n  margin: 5px;\\n  padding: 8px 10px;\\n  min-width: 150px;\\n  background-color: #ebebeb;\\n  overflow-x: scroll;\\n  font-size: 14px; }\\n  .suppliers-item:last-child {\\n    margin-right: 0; }\\n  .suppliers-item::-webkit-scrollbar {\\n    display: none; }\\n  .suppliers-item::-webkit-scrollbar-thumb {\\n    display: none; }\\n\\n.suppliers-item-link {\\n  pointer-events: auto;\\n  cursor: pointer;\\n  transition: .2s; }\\n  .suppliers-item-link a {\\n    color: #2f2f2f; }\\n    .suppliers-item-link a:hover {\\n      color: #f0f0f0; }\\n  .suppliers-item-link:hover a {\\n    color: #f0f0f0; }\\n  .suppliers-item-link:hover {\\n    background-color: #3f7486; }\\n\\n.delete-item {\\n  -webkit-box-shadow: 0px 1px 5px -3px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 5px -3px rgba(0, 0, 0, 0.6);\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  pointer-events: auto;\\n  border-radius: 4px;\\n  background-color: #ebebeb;\\n  margin: 5px 5px 5px auto;\\n  position: relative;\\n  transform: translateY(0);\\n  transition: .2s; }\\n  .delete-item .delete {\\n    font-size: 22px;\\n    padding: 5px;\\n    z-index: -1; }\\n  .delete-item:before {\\n    content: '';\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    left: 0;\\n    top: 0;\\n    background-color: transparent; }\\n  .delete-item:hover {\\n    color: #f0f0f0;\\n    background-color: #3f7486; }\\n\\n.alert {\\n  color: #2f2f2f;\\n  background-color: #fae8e6;\\n  padding: 5px 10px;\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n  max-width: 100%;\\n  min-width: 320px;\\n  height: auto;\\n  display: none;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  z-index: 999;\\n  font-size: 13px;\\n  border-radius: 5px; }\\n  .alert .alert-icon {\\n    color: red;\\n    font-size: 22px;\\n    margin-right: 7px; }\\n  .alert .alert-txt {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center; }\\n  .alert .acept-alert {\\n    border: 1px solid #3f7486a9;\\n    background-color: white;\\n    padding: 2px 15px;\\n    margin: 5px;\\n    box-shadow: none;\\n    border-radius: 5px;\\n    margin-left: 10px; }\\n    .alert .acept-alert:hover {\\n      background-color: #3f7486;\\n      color: white; }\\n\\n.alert--active {\\n  display: flex; }\\n\\n.price-list {\\n  background-color: #f0f0f0;\\n  border-radius: 20px;\\n  -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n  flex-grow: 1;\\n  height: 100%;\\n  margin-left: 30px;\\n  overflow: hidden; }\\n\\n.price-list-container {\\n  position: relative;\\n  display: flex;\\n  transition: 0.6s;\\n  width: 1000px;\\n  height: 100%; }\\n\\n.product {\\n  width: 100%;\\n  height: 100%;\\n  min-width: 100%;\\n  padding: 20px 30px;\\n  background-color: #f0f0f0;\\n  transition: .6s ease-in-out; }\\n\\n.form-container {\\n  width: 100%;\\n  height: 100%;\\n  display: flex;\\n  justify-content: flex-start;\\n  flex-direction: column;\\n  overflow: hidden; }\\n\\n.form-inner {\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: flex-start;\\n  align-items: flex-start; }\\n\\n.form-item {\\n  margin: 10px 15px; }\\n\\n.title-product {\\n  color: #3f7486;\\n  font-size: 22px;\\n  margin-bottom: 20px; }\\n\\n.select-price {\\n  width: 230px;\\n  height: 35px;\\n  margin-top: 3px;\\n  padding: 0 6px;\\n  border-radius: 3px;\\n  font-family: 'Roboto', sans-serif;\\n  font-size: 14px;\\n  border: 1px solid #89bad3ce;\\n  background-color: #ebebeb;\\n  color: #2f2f2f; }\\n\\n.checkbox {\\n  padding: 10px;\\n  min-width: 210px;\\n  height: 64px;\\n  margin-left: 10px;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  align-self: flex-end; }\\n\\n.select-checkbox {\\n  width: 20px;\\n  height: 20px;\\n  justify-self: flex-end;\\n  cursor: pointer; }\\n\\n.inner-pages-container {\\n  max-width: 650px; }\\n\\n.inner-pages-count {\\n  max-width: 150px; }\\n\\n.inner-pages {\\n  max-width: 115px; }\\n\\n.inner-pages-black {\\n  background-color: #e3e3e3; }\\n\\n.price-sum {\\n  display: flex;\\n  flex-direction: column;\\n  position: relative;\\n  max-width: 750px;\\n  padding: 20px;\\n  margin: 30px 12px 0;\\n  color: #3f7486;\\n  letter-spacing: 2px;\\n  border-top: 1px solid #d1d1d1; }\\n  .price-sum .price-sum-result {\\n    display: flex;\\n    align-items: center;\\n    margin-bottom: 20px; }\\n    .price-sum .price-sum-result .price-sum-h3 {\\n      font-size: 1.7rem;\\n      font-weight: 400;\\n      margin-right: 40px; }\\n      .price-sum .price-sum-result .price-sum-h3 span {\\n        font-size: 2rem; }\\n    .price-sum .price-sum-result .reset {\\n      height: 30px;\\n      padding: 5px 20px;\\n      border-radius: 4px;\\n      color: #f0f0f0;\\n      background-color: #3f7486;\\n      border: none;\\n      cursor: pointer; }\\n      .price-sum .price-sum-result .reset:hover {\\n        background-color: #478397; }\\n      .price-sum .price-sum-result .reset:active {\\n        transform: scale(1.03); }\\n  .price-sum .price-sum-desc {\\n    font-size: 15px;\\n    color: #2f2f2f;\\n    letter-spacing: 1px;\\n    font-weight: lighter; }\\n\\n.disable-element {\\n  background-color: #dfdfdf; }\\n\\n@media screen and (max-width: 1370px) {\\n  #app {\\n    padding: 15px; }\\n  .calculator {\\n    padding: 15px;\\n    border: solid 7px #3f7486;\\n    border-radius: 35px; }\\n  .nav-container {\\n    padding: 25px 20px;\\n    margin-bottom: 20px; }\\n  .logo-container {\\n    padding: 30px 20px; }\\n  .bottom-panel {\\n    margin-top: 15px;\\n    height: 80px; }\\n  .select-print-btn {\\n    padding: 20px;\\n    margin-bottom: 20px; }\\n  .price-list {\\n    margin-left: 25px; }\\n  .product {\\n    padding: 20px; }\\n  .price-sum {\\n    margin: 20px 12px 0; }\\n  .suppliers-container {\\n    top: 15px;\\n    max-width: 900px;\\n    padding: 15px; }\\n  .suppliers-container--active {\\n    left: 15px; }\\n  .suppliers-form {\\n    flex-wrap: wrap; }\\n    .suppliers-form input {\\n      width: 170px; }\\n  .suppliers-list-container {\\n    min-height: 380px; }\\n  .notes-container {\\n    top: 15px;\\n    width: 700px; }\\n  .notes-container--active {\\n    left: 15px; } }\\n\\n@media screen and (max-width: 1280px) {\\n  .logo-container {\\n    padding: 35px 20px; }\\n  .nav-container {\\n    width: 270px;\\n    min-width: 270px; }\\n  .select-print-btn {\\n    padding: 15px;\\n    border-radius: 12px;\\n    font-size: 15px; }\\n    .select-print-btn img {\\n      width: 50px;\\n      height: 50px;\\n      margin-right: 15px; }\\n  .form-container {\\n    width: 800px; }\\n  .form-item {\\n    margin: 10px 7px; }\\n  .select-price {\\n    width: 210px; }\\n  .checkbox {\\n    min-width: 210px;\\n    margin-left: 10px; }\\n  .price-sum {\\n    max-width: 650px;\\n    margin: 20px 12px 0;\\n    padding: 20px 20px 10px; } }\\n\\n@media screen and (max-width: 1124px) {\\n  .calculator {\\n    padding: 20px; }\\n  .nav-container {\\n    width: 250px;\\n    min-width: 250px; }\\n  .bottom-panel {\\n    margin-top: 20px; }\\n  .product {\\n    padding: 20px 10px; }\\n  .price-list {\\n    margin-left: 20px; }\\n  .form-container {\\n    width: 700px; }\\n  .form-item label {\\n    font-size: 14px; }\\n  .select-price {\\n    width: 190px;\\n    font-size: 14px; }\\n  .checkbox {\\n    min-width: 190px;\\n    margin-left: 0;\\n    font-size: 14px; }\\n  .price-sum {\\n    max-width: 600px; } }\\n\\n@media screen and (max-width: 1025px) {\\n  #app {\\n    width: 100%;\\n    height: auto;\\n    min-height: 100vh; }\\n  .calculator-container {\\n    flex-direction: column;\\n    justify-content: center; }\\n  .navigation-panel {\\n    display: flex;\\n    flex-direction: column;\\n    width: 100%; }\\n  .navigation-buttons-container {\\n    -webkit-box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.6);\\n    position: relative;\\n    background-color: #2f2f2f;\\n    padding: 30px 20px;\\n    border-radius: 20px;\\n    position: relative;\\n    padding: 0;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    width: 100%;\\n    height: 120px;\\n    margin-bottom: 20px; }\\n  .nav-container {\\n    width: auto;\\n    min-width: 50px;\\n    max-width: 100%;\\n    padding: 20px;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-bottom: 0;\\n    box-shadow: none; }\\n  .nav-container-small-btn {\\n    height: 100%;\\n    box-shadow: none;\\n    background-color: transparent;\\n    padding-right: 20px; }\\n  .logo-container {\\n    width: auto;\\n    height: 50px;\\n    padding: 0;\\n    margin-bottom: 20px;\\n    background-color: transparent; }\\n  #logo {\\n    margin-bottom: 0; }\\n  .select-print-container {\\n    flex-direction: row;\\n    justify-content: flex-end;\\n    align-items: center; }\\n  .select-print-btn {\\n    width: 200px;\\n    max-width: 200px;\\n    margin-right: 20px;\\n    margin-bottom: 0;\\n    padding: 12px; }\\n    .select-print-btn:last-child {\\n      margin-right: 0; }\\n  .small-btn-wraper {\\n    display: flex;\\n    justify-content: center;\\n    width: auto;\\n    margin-bottom: 0;\\n    margin-right: 10px; }\\n    .small-btn-wraper:last-child {\\n      margin-right: 0; }\\n  .small-btn {\\n    width: 50px;\\n    height: 50px;\\n    margin-right: 10px;\\n    font-size: 26px; }\\n  .price-list {\\n    margin-left: 0; }\\n  .form-container {\\n    width: 800px; }\\n  .form-item {\\n    margin: 8px 12px; }\\n  .select-price {\\n    width: 210px; }\\n  .checkbox {\\n    min-width: 210px; }\\n  .price-sum {\\n    max-width: 650px; }\\n  .suppliers-container {\\n    max-width: 800px; }\\n  .suppliers-item {\\n    min-width: 100px; }\\n  .btn-add-to-list {\\n    width: 100px;\\n    margin-left: 0px;\\n    margin-top: 15px;\\n    font-size: 15px; }\\n  .suppliers-form input {\\n    width: 140px; }\\n  .suppliers-list-container {\\n    padding: 12px;\\n    min-height: 500px; }\\n  .suppliers-items {\\n    padding: 10px; }\\n  .suppliers-item {\\n    min-width: 100px; }\\n  .notes-container {\\n    padding: 15px; } }\\n\\n@media screen and (max-width: 900px) {\\n  .suppliers-container {\\n    max-width: 700px; } }\\n\\n@media screen and (max-width: 848px) {\\n  #app {\\n    padding: 15px; }\\n  .calculator {\\n    border: solid 5px #3f7486;\\n    padding: 20px; }\\n  .navigation-buttons-container {\\n    align-items: center; }\\n  .select-print-btn {\\n    padding: 10px;\\n    font-size: 14px; }\\n  .small-btn {\\n    width: 50px;\\n    height: 50px; }\\n  .form-item {\\n    margin: 8px; }\\n  .select-price {\\n    width: 190px; }\\n  .checkbox {\\n    min-width: 190px; }\\n  .price-sum {\\n    max-width: 600px; }\\n  .description-app-h1 {\\n    font-size: 16px; }\\n  .suppliers-items {\\n    flex-wrap: wrap; } }\\n\\n@media screen and (max-width: 820px) {\\n  .navigation-buttons-container {\\n    flex-direction: column-reverse;\\n    height: auto; }\\n  .select-print-btn {\\n    width: 220px;\\n    max-width: 220px;\\n    margin-right: 20px;\\n    padding: 15px; }\\n  .logo-container {\\n    width: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center; }\\n  .suppliers-container {\\n    max-width: 520px; }\\n  .suppliers-item {\\n    margin: 5px; }\\n  .delete-item {\\n    margin: 5px 10px; }\\n  .notes-container {\\n    max-width: 520px;\\n    height: 700px; }\\n  .info-container {\\n    right: 110px;\\n    bottom: 0;\\n    width: 500px; } }\\n\\n@media screen and (max-width: 748px) {\\n  .select-print-btn:first-child {\\n    margin-left: 0; }\\n  .form-container {\\n    width: 500px; }\\n  .select-price {\\n    width: 230px; }\\n  .checkbox {\\n    max-width: 220px; }\\n  .price-sum {\\n    padding: 20px;\\n    margin-left: 0;\\n    align-items: flex-start;\\n    max-width: 450px; }\\n    .price-sum .price-sum-desc {\\n      font-size: 13px; }\\n  .price-sum-result {\\n    flex-direction: column; }\\n    .price-sum-result .reset {\\n      margin-top: 20px;\\n      align-self: flex-start; }\\n  .info-container {\\n    width: 400px; } }\\n\\n@media screen and (max-width: 648px) {\\n  .select-price {\\n    width: 190px; }\\n  .checkbox {\\n    min-width: 190px; }\\n  .price-sum {\\n    max-width: 420px; }\\n  .suppliers-container {\\n    max-width: 500px; }\\n  .suppliers-list-container {\\n    min-height: 400px; }\\n  .notes-container {\\n    max-width: 500px; }\\n  .info-container {\\n    width: 400px;\\n    bottom: 80px;\\n    left: 50%;\\n    transform: translateX(-50%); }\\n    .info-container:before {\\n      display: none; } }\\n\\n@media screen and (max-width: 600px) {\\n  .select-print-btn {\\n    width: 200px;\\n    max-width: 200px;\\n    padding: 12px; }\\n  .suppliers-container {\\n    max-width: 400px; }\\n  .notes-container {\\n    max-width: 400px; } }\\n\\n@media screen and (max-width: 548px) {\\n  #logo {\\n    justify-content: flex-start; }\\n  .navigation-buttons-container {\\n    align-items: flex-start;\\n    flex-direction: row;\\n    align-items: center; }\\n  .select-print-container {\\n    flex-direction: column; }\\n  .select-print-btn {\\n    width: 220px;\\n    max-width: 220px;\\n    padding: 15px;\\n    margin-bottom: 30px;\\n    margin-right: 0; }\\n    .select-print-btn img {\\n      margin-right: 15px; }\\n  .nav-container-small-btn {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center; }\\n  .small-btn-wraper {\\n    flex-direction: column;\\n    justify-content: center;\\n    margin-bottom: 10px;\\n    margin-right: 0; }\\n  .small-btn-wraper:last-child {\\n    margin-bottom: 0; }\\n  .small-btn {\\n    margin-right: 0;\\n    width: 45px;\\n    height: 45px;\\n    margin-bottom: 10px;\\n    font-size: 26px;\\n    padding: 5px; }\\n    .small-btn:last-child {\\n      margin-bottom: 0; }\\n  .form-item {\\n    margin: 5px; }\\n  .form-container {\\n    width: 380px; }\\n  .form-inner {\\n    align-items: flex-start; }\\n  .checkbox {\\n    align-self: flex-start;\\n    min-width: 180px;\\n    max-width: 180px;\\n    font-size: 12px; }\\n  .select-price {\\n    width: 170px; }\\n  .price-sum {\\n    max-width: 400px;\\n    padding: 20px 10px; }\\n  .suppliers-container {\\n    max-width: 330px;\\n    width: 330px; }\\n  .btn-add-to-list {\\n    margin-left: 5px 10px; }\\n  .suppliers-item {\\n    font-size: 12px; }\\n  .notes-container {\\n    max-width: 330px; }\\n  .bottom-panel {\\n    flex-wrap: wrap-reverse;\\n    justify-content: center;\\n    height: auto; }\\n  .info-btn {\\n    margin-bottom: 15px; }\\n  .info-container {\\n    width: 350px;\\n    bottom: 120px; }\\n  .info-text-container ul, .info-text-container li {\\n    font-size: 13px; }\\n  .description-app-h1 {\\n    text-align: center; } }\\n\\n@media screen and (max-width: 470px) {\\n  #app {\\n    padding: 20px; }\\n  .nav-container-small-btn {\\n    padding: 0; }\\n  .select-print-btn {\\n    width: 200px;\\n    max-width: 200px;\\n    padding: 12px; }\\n  .nav-container {\\n    padding: 20px; }\\n  .logo-container {\\n    padding: 0; }\\n  .product {\\n    padding: 20px; }\\n  .form-container {\\n    width: 300px; }\\n  .select-price {\\n    width: 250px; }\\n  .checkbox {\\n    font-size: 14px; }\\n  .inner-pages-container {\\n    max-width: 600px; }\\n  .inner-pages-count {\\n    max-width: 145px; }\\n  .inner-pages {\\n    max-width: 90px; }\\n  .price-sum {\\n    padding: 20px 0;\\n    max-width: 270px; }\\n    .price-sum .price-sum-result .price-sum-h3 {\\n      font-size: 1.4rem;\\n      margin: 0; }\\n      .price-sum .price-sum-result .price-sum-h3 span {\\n        font-size: 1.6rem; }\\n  .suppliers-container {\\n    max-width: 320px;\\n    width: 320px;\\n    top: 0px; }\\n  .suppliers-container--active {\\n    left: 0; }\\n  .notes-container {\\n    max-width: 320px;\\n    top: 0; }\\n  .notes-container--active {\\n    left: 0; }\\n  .info-container {\\n    width: 310px; } }\\n\\n@media screen and (max-width: 440px) {\\n  .calculator {\\n    border: none;\\n    padding: 0;\\n    border-radius: 5px;\\n    background-color: transparent;\\n    box-shadow: none; } }\\n\\n@media screen and (max-width: 360px) {\\n  .product {\\n    padding: 20px 15px; } }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/scss/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(selector) {\n\t\tif (typeof memo[selector] === \"undefined\") {\n\t\t\tmemo[selector] = fn.call(this, selector);\n\t\t}\n\n\t\treturn memo[selector]\n\t};\n})(function (target) {\n\treturn document.querySelector(target)\n});\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton) options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n\tif (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else {\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\toptions.attrs.type = \"text/css\";\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\toptions.attrs.type = \"text/css\";\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Slider.js */ \"./src/js/modules/Slider.js\");\n/* harmony import */ var _modules_Info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Info.js */ \"./src/js/modules/Info.js\");\n/* harmony import */ var _modules_Notes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Notes.js */ \"./src/js/modules/Notes.js\");\n/* harmony import */ var _modules_Suppliers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Suppliers.js */ \"./src/js/modules/Suppliers.js\");\n/* harmony import */ var _modules_calculation_Calculator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculation/Calculator.js */ \"./src/js/modules/calculation/Calculator.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n    const slider = new _modules_Slider_js__WEBPACK_IMPORTED_MODULE_0__[\"Slider\"]();\n    const info = new _modules_Info_js__WEBPACK_IMPORTED_MODULE_1__[\"Info\"]();\n    const suppliers = new _modules_Suppliers_js__WEBPACK_IMPORTED_MODULE_3__[\"Suppliers\"]();\n    const notes = new _modules_Notes_js__WEBPACK_IMPORTED_MODULE_2__[\"Notes\"]();\n    const calculator = new _modules_calculation_Calculator_js__WEBPACK_IMPORTED_MODULE_4__[\"Calculator\"]();\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Calculator\", function() { return Calculator; });\n/* harmony import */ var _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prices/productPriceList.js */ \"./src/js/modules/calculation/prices/productPriceList.js\");\n/* harmony import */ var _Foil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Foil.js */ \"./src/js/modules/calculation/Foil.js\");\n/* harmony import */ var _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrintStandard.js */ \"./src/js/modules/calculation/PrintStandard.js\");\n/* harmony import */ var _PrintInner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrintInner.js */ \"./src/js/modules/calculation/PrintInner.js\");\n\n\n\n\n\nclass Product1 {\n    constructor() {\n        this.theFormProduct = document.forms['product-1'];\n        this.printStandard = new _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__[\"PrintStandard\"](this.theFormProduct, 'product-1-print', 'product-1-c1', 'product-1-c2', 'product-1-c3', 'product-1-c4', 'product-1-c5', 'product-1-c6', 'product-1-c7', 'product-1-c8');\n        this.foil = new _Foil_js__WEBPACK_IMPORTED_MODULE_1__[\"Foil\"](this.theFormProduct, 'product-1-foil', 'product-1-d1', 'product-1-d2', 'product-1-d3', 'product-1-d4', 'product-1-d5', 'product-1-d6', 'product-1-d7', _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].foilPrice);\n        this.count = document.getElementById('product-1-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.size = document.getElementById('product-1-size').addEventListener('change', this.getProductPrice.bind(this));\n        this.material = document.getElementById('product-1-material').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheets = document.getElementById('product-1-sheets').addEventListener('change', this.getProductPrice.bind(this));\n        this.crease = document.getElementById('product-1-crease').addEventListener('change', this.getProductPrice.bind(this));\n        this.corners = document.getElementById('card-corners').addEventListener('click', this.getProductPrice.bind(this));\n        this.printPrice = document.getElementById('product-1-print').addEventListener('change', this.getProductPrice.bind(this));\n        this.foilPrice = document.getElementById('product-1-foil').addEventListener('change', this.getProductPrice.bind(this));\n\n        this.result = document.querySelector('.product-1-price-result span');\n        this.refreshPage();\n        this.getProductPrice();\n    }\n    getProductCount() {\n        const count = parseInt(document.getElementById('product-1-count').value);\n        return count;\n    }\n    getProductSize() {\n        const selected = this.theFormProduct.elements['product-1-size'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize[selected.value];\n        const sheets = [...document.querySelectorAll('.sheet-1')];\n        //access conditions\n        if (selected) {\n            sheets.forEach(sheet => {\n                if (selected.value === 'product-1-a1' || selected.value === 'product-1-a2' || selected.value === 'product-1-a3' || selected.value === 'product-1-a3') {\n                    if (sheet.classList.contains('sheet-1-B1')) {\n                        sheet.classList.add('disable-element');\n                        sheet.disabled = true;\n                    } else {\n                        sheet.classList.remove('disable-element');\n                        sheet.disabled = false;\n                    }\n                }\n                if (selected.value === 'product-1-a4' || selected.value === 'product-1-a5' || selected.value === 'product-1-a6') {\n                    if (sheet.classList.contains('sheet-1-A1')) {\n                        sheet.classList.add('disable-element');\n                        sheet.disabled = true;\n                    } else {\n                        sheet.classList.remove('disable-element');\n                        sheet.disabled = false;\n                    }\n                }\n            });\n        }\n        return price;\n    }\n    getProductMaterial() {\n        const selected = this.theFormProduct.elements['product-1-material'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const B1A1 = [...document.querySelectorAll('.B1-A1-condition-1')];\n        //access conditions\n        B1A1.forEach(el => {\n            if (selectedIndex > 8) {\n                el.disabled = true;\n                el.classList.add('disable-element');\n            } else {\n                el.disabled = false;\n                el.classList.remove('disable-element');\n            }\n        });\n        return price;\n    }\n    getProductCrease() {\n        const selected = this.theFormProduct.elements['product-1-crease'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productCrease[selected.value];\n        return price;\n    }\n    getProductSheets() {\n        const selected = this.theFormProduct.elements['product-1-sheets'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterial = [...document.querySelectorAll('.condition-satin')];\n        //access conditions\n        if (selected) {\n            enabeleMaterial.forEach(el => {\n                if (selected.value === 'product-1-f2' || selected.value === 'product-1-f3') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n    getCardCorners() {\n        let cornersPrice = 0;\n        const selectedCorners = this.theFormProduct.elements[\"card-corners\"];\n        if (selectedCorners.checked == true) {\n            cornersPrice = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].corners;\n        } else {\n            cornersPrice = 0;\n        }\n        return cornersPrice;\n    }\n\n    getProductPrice() {\n        const count = this.getProductCount();\n        const sizeProd = this.getProductSize();\n        const materialProd = this.getProductMaterial();\n        const creaseProd = this.getProductCrease();\n        const sheetsProd = this.getProductSheets();\n        const cornersProd = this.getCardCorners();\n        const printProd = this.printStandard.getPricePrint(count, sizeProd);\n        const foilProd = this.foil.getPriceFoil(count, sizeProd);\n\n        const productPrice = (sizeProd * materialProd * sheetsProd + creaseProd + cornersProd) * count + printProd + foilProd;\n        this.result.textContent = productPrice.toFixed(2);\n    }\n    refreshPage() {\n        const priceSize = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize['product-1-a1'];\n        const priceMaterial = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial['product-1-b1'];\n        let result = priceSize * priceMaterial;\n        const reset = document.querySelectorAll('.reset');\n        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)));\n    }\n}\n\nclass Product2 {\n    constructor() {\n        this.theFormProduct = document.forms['product-2'];\n        this.printInner = new _PrintInner_js__WEBPACK_IMPORTED_MODULE_3__[\"PrintInner\"]('product-2-pages-count', 'product-2-pages-black', 'product-2-pages-color', 'product-2-pages-empty');\n        this.printStandard = new _PrintStandard_js__WEBPACK_IMPORTED_MODULE_2__[\"PrintStandard\"](this.theFormProduct, 'product-2-print', 'product-2-c1', 'product-2-c2', 'product-2-c3', 'product-2-c4', 'product-2-c5', 'product-2-c6', 'product-2-c7', 'product-2-c8');\n        this.foil = new _Foil_js__WEBPACK_IMPORTED_MODULE_1__[\"Foil\"](this.theFormProduct, 'product-2-foil', 'product-2-d1', 'product-2-d2', 'product-2-d3', 'product-2-d4', 'product-2-d5', 'product-2-d6', 'product-2-d7', _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].foilPrice);\n\n        this.pages = document.getElementById('product-2-pages-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesBlack = document.getElementById('product-2-pages-black').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesColor = document.getElementById('product-2-pages-color').addEventListener('change', this.getProductPrice.bind(this));\n        this.pagesEmpty = document.getElementById('product-2-pages-empty').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheetsForInner = document.getElementById('product-2-sheets-inner').addEventListener('change', this.getProductPrice.bind(this));\n\n        this.count = document.getElementById('product-2-count').addEventListener('change', this.getProductPrice.bind(this));\n        this.size = document.getElementById('product-2-size').addEventListener('change', this.getProductPrice.bind(this));\n        this.material = document.getElementById('product-2-material').addEventListener('change', this.getProductPrice.bind(this));\n        this.cover = document.getElementById('product-2-cover').addEventListener('change', this.getProductPrice.bind(this));\n        this.printStandardPrice = document.getElementById('product-2-print').addEventListener('change', this.getProductPrice.bind(this));\n        this.sheetsForCover = document.getElementById('product-2-sheets-cover').addEventListener('change', this.getProductPrice.bind(this));\n        this.foilPrice = document.getElementById('product-2-foil').addEventListener('change', this.getProductPrice.bind(this));\n        this.binding = document.getElementById('product-2-binding').addEventListener('change', this.getProductPrice.bind(this));\n        this.wings = document.getElementById('product-2-wings').addEventListener('click', this.getProductPrice.bind(this));\n\n        this.result = document.querySelector('.product-2-price-result span');\n        this.resetPage();\n        this.getProductPrice();\n    }\n\n    getProductCount() {\n        const count = parseInt(document.getElementById('product-2-count').value);\n        return count;\n    }\n    getProductSize() {\n        const selected = this.theFormProduct.elements['product-2-size'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSize[selected.value];\n        const sheets = [...document.querySelectorAll('.sheet-2')];\n        //access conditions\n        if (selected) {\n            sheets.forEach(sheet => {\n                if (selected.value === 'product-2-a1' || selected.value === 'product-2-a2' || selected.value === 'product-2-a3') {\n                    if (sheet.classList.contains('sheet-2-B1')) {\n                        sheet.classList.add('disable-element');\n                        sheet.disabled = true;\n                    } else {\n                        sheet.classList.remove('disable-element');\n                        sheet.disabled = false;\n                    }\n                }\n                if (selected.value === 'product-2-a4' || selected.value === 'product-2-a5' || selected.value === 'product-2-a6') {\n                    if (sheet.classList.contains('sheet-2-A1')) {\n                        sheet.classList.add('disable-element');\n                        sheet.disabled = true;\n                    } else {\n                        sheet.classList.remove('disable-element');\n                        sheet.disabled = false;\n                    }\n                }\n            });\n        }\n        return price;\n    }\n    getProductMaterial() {\n        const selected = this.theFormProduct.elements['product-2-material'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productMaterial[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const sra3 = document.querySelector('.sra3-condition-inner-2');\n        const B1A1 = [...document.querySelectorAll('.B1-A1-condition-inner-2')];\n        //access conditions\n        if (selectedIndex < 10) {\n            sra3.disabled = true;\n            sra3.classList.add('disable-element');\n        } else {\n            sra3.disabled = false;\n            sra3.classList.remove('disable-element');\n        }\n        B1A1.forEach(el => {\n            if (selectedIndex > 15) {\n                el.disabled = true;\n                el.classList.add('disable-element');\n            } else {\n                el.disabled = false;\n                el.classList.remove('disable-element');\n            }\n        });\n        return price;\n    }\n    getProductCover() {\n        const selected = this.theFormProduct.elements['product-2-cover'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productCover[selected.value];\n        //index of the select element\n        const selectedIndex = selected.options.selectedIndex;\n        const sra3 = document.querySelector('.sra3-condition-cover-2');\n        const B1A1 = [...document.querySelectorAll('.B1-A1-condition-cover-2')];\n        //access conditions\n        B1A1.forEach(el => {\n            if (selectedIndex > 8) {\n                el.disabled = true;\n                el.classList.add('disable-element');\n            } else {\n                el.disabled = false;\n                el.classList.remove('disable-element');\n            }\n        });\n        if (selectedIndex > 0 && selectedIndex < 5) {\n            sra3.disabled = true;\n            sra3.classList.add('disable-element');\n        } else {\n            sra3.disabled = false;\n            sra3.classList.remove('disable-element');\n        }\n        return price;\n    }\n    getProductBinding() {\n        const selected = this.theFormProduct.elements['product-2-binding'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productBinding[selected.value];\n        return price;\n    }\n    getProductSheetsForCover() {\n        const selected = this.theFormProduct.elements['product-2-sheets-cover'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterialForInner = [...document.querySelectorAll('.condition-cover')];\n        //access conditions\n        if (selected) {\n            enabeleMaterialForInner.forEach(el => {\n                if (selected.value === 'product-2-g1') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n    getProductSheetsForInner() {\n        const selected = this.theFormProduct.elements['product-2-sheets-inner'];\n        const price = _prices_productPriceList_js__WEBPACK_IMPORTED_MODULE_0__[\"priceList\"].productSheets[selected.value];\n        const enabeleMaterialForInner = [...document.querySelectorAll('.condition-inner')];\n        const enabeleMaterialForInnerSatin = [...document.querySelectorAll('.condition-inner-satin')];\n        //access conditions\n        if (selected) {\n            enabeleMaterialForInner.forEach(el => {\n                if (selected.value === 'product-2-f1') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n            enabeleMaterialForInnerSatin.forEach(el => {\n                if (selected.value === 'product-2-f2' || selected.value === 'product-2-f3') {\n                    el.classList.add('disable-element');\n                    el.disabled = true;\n                } else {\n                    el.classList.remove('disable-element');\n                    el.disabled = false;\n                }\n            });\n        }\n        return price;\n    }\n\n    getProductWings(count, size, material, print, sheetsForCover, foil) {\n        let price = 0;\n        const selected = this.theFormProduct.elements['product-2-wings'];\n        if (selected.checked == true && this.getProductCover() > 0) {\n            price = size * material * sheetsForCover * count + print + foil;\n        } else {\n            price = 0;\n        }\n        return price;\n    }\n\n    getProductPrice() {\n        const count = this.getProductCount();\n        const sizeProd = this.getProductSize();\n        const materialProd = this.getProductMaterial();\n        const coverMaterial = this.getProductCover();\n        const sheetsForCover = this.getProductSheetsForCover();\n        const sheetsForInner = this.getProductSheetsForInner();\n        const binding = this.getProductBinding();\n        const printForCover = this.printStandard.getPricePrint(count, sizeProd * 2);\n        const foilForCover = this.foil.getPriceFoil(count, sizeProd * 2);\n        const wings = this.getProductWings(count, sizeProd, coverMaterial, printForCover / 2, sheetsForCover, foilForCover / 2);\n        const printInner = this.printInner.getPriceInnerPrint(count, sizeProd, materialProd, sheetsForInner);\n        let productPrice = (sizeProd * 2 * coverMaterial * sheetsForCover + printInner + binding) * count + foilForCover + printForCover + wings;\n        this.result.textContent = productPrice.toFixed(2);\n    }\n\n    resetPage() {\n        let result = 0;\n        const reset = document.querySelectorAll('.reset');\n        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)));\n    }\n}\n\nclass Calculator {\n    constructor() {\n        this.product1 = new Product1();\n        this.product2 = new Product2();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/calculation/Calculator.js?");

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/style.scss\");\nif(typeof content === 'string') content = [[module.i, content, '']];\n// Prepare cssTransformation\nvar transform;\n\nvar options = {}\noptions.transform = transform\n// add the styles to the DOM\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/style.scss\", function() {\n\t\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/style.scss\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ })

/******/ });