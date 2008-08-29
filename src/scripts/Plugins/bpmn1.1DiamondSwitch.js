/** * Copyright (c) 2008 * Sven Wagner-Boysen * * Permission is hereby granted, free of charge, to any person obtaining a * copy of this software and associated documentation files (the "Software"), * to deal in the Software without restriction, including without limitation * the rights to use, copy, modify, merge, publish, distribute, sublicense, * and/or sell copies of the Software, and to permit persons to whom the * Software is furnished to do so, subject to the following conditions: * * The above copyright notice and this permission notice shall be included in * all copies or substantial portions of the Software. * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER * DEALINGS IN THE SOFTWARE. **/if(!ORYX.Plugins)	ORYX.Plugins = new Object();ORYX.Plugins.BPMN11DiamondSwitch = Clazz.extend({	/**	 *	Constructor	 *	@param {Object} Facade: The Facade of the Editor	 */	construct: function(facade) {		this.facade = facade;				this.facade.registerOnEvent('dragDocker.docked', this.handleDockerDocked.bind(this));				this.facade.registerOnEvent('propertyWindow.propertyChanged', this.handlePropertyChanged.bind(this));	},			/**	 * DragDocker.Docked Handler	 *	 */		handleDockerDocked: function(options) {				var edge = options.parent;		var edgeSource = options.target;				if(edge.getStencil().id() === "http://b3mn.org/stencilset/bpmn1.1#SequenceFlow") {			var isGateway = edgeSource.getStencil().groups().find(function(group) {					if(group == "Gateways") 						return group;				});			if(!isGateway && (edge.properties["oryx-conditiontype"] == "Expression"))				// show diamond on edge source				edge.setProperty("oryx-showdiamondmarker", true);			else 				// do not show diamond on edge source				edge.setProperty("oryx-showdiamondmarker", false);						// update edge rendering			edge.update();		}	},		/**	 * PropertyWindow.PropertyChanged Handler	 */	handlePropertyChanged: function(option) {				var shape = option.element;		var propertyKey = option.name;		var propertyValue = option.value;				if((shape.getStencil().id() === "http://b3mn.org/stencilset/bpmn1.1#SequenceFlow") &&			(propertyKey === "oryx-conditiontype")) {						if(propertyValue != "Expression")				// Do not show the Diamond				shape.setProperty("oryx-showdiamondmarker", false);			else {				var incomingShapes = shape.getIncomingShapes();								if(!incomingShapes) {					shape.setProperty("oryx-showdiamondmarker", true);				}								var incomingGateway = incomingShapes.find(function(aShape) {					var foundGateway = aShape.getStencil().groups().find(function(group) {						if(group == "Gateways") 							return group;					});					if(foundGateway)						return foundGateway;				});								if(!incomingGateway) 					// show diamond on edge source					shape.setProperty("oryx-showdiamondmarker", true);				else					// do not show diamond					shape.setProperty("oryx-showdiamondmarker", false);			}			shape.update();		}	}});