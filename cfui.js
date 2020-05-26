// CFUI v1.0 \\
// CF-JS Accordion 2.1 \\
var CFAccordion = function(elem, mode) {
	"use strict";
	this.el = document.getElementById(elem);
	this.elems = [];
	this.cons = [];
	this.heightArray = [];
	this.openArray = [];
    this.mode = mode;
	this.init();
};
CFAccordion.prototype.init = function() {
	"use strict";
	this.elems = this.getLevelElements(this.el, 'h3');
	for (var i = 0; i < this.elems.length; i++) {
		this.setListener(i);
	}
	this.cons = this.getLevelElements(this.el, 'div');
	for (var j = 0; j < this.cons.length; j++) {
		this.heightArray.push(this.cons[j].offsetHeight);
        try {
            this.cons[j].style.height = "0px";
        } catch (e) {
            this.cons[j].style.setProperty('height', '0px');
        }
	}
};
CFAccordion.prototype.setListener = function(elid) {
	"use strict";
	var that = this;
	var m = this.elems[elid];
	m.addEventListener("click", function() {
		that.openTab(elid);
	}, false);
};
CFAccordion.prototype.openTab = function(elid) {
	"use strict";
	if (this.openArray.indexOf(elid) === -1) {
        if (this.mode === 'dynamic') {
            for (var i = 0; i < this.cons.length; i++) {
                try {
                    this.cons[i].style.height = "0px";
                } catch (e) {
                    this.cons[i].style.setProperty('height', '0px');
                }
                this.elems[i].className = "";
                this.openArray.splice(this.openArray.indexOf(elid), 1);
            }
        }
        try {
          this.cons[elid].style.height = this.heightArray[elid] + "px";
        } catch (e) {
            this.cons[elid].style.setProperty('height', this.heightArray[elid] + 'px');
        }
		this.elems[elid].className = "opentab";
		this.openArray.push(elid);
	} else {
        try {
            this.cons[elid].style.height = "0px";
        } catch (e) {
            this.cons[elid].style.setProperty('height', '0px');
        }
		this.elems[elid].className = "";
		this.openArray.splice(this.openArray.indexOf(elid), 1);
	}
};
CFAccordion.prototype.initialOpen = function(elid) {
	"use strict";
	var that = this;
	that.openTab(elid);
};
CFAccordion.prototype.collapseAll = function(elid) {
    "use strict";
    for (var i = 0; i < this.cons.length; i++) {
        try {
            this.cons[i].style.height = '0px';
        } catch (e) {
            this.cons[i].style.setProperty('height', '0px');
        }
        this.elems[i].className = '';
        this.openArray.splice(this.heightArray[elid] + 'px');
    }
};
CFAccordion.prototype.expandAll = function() {
    "use strict";
    for (var i = 0; i < this.cons.length; i++) {
        try {
            this.cons[i].style.height = this.heightArray[i] + 'px';
        } catch (e) {
            this.cons[i].style.setProperty('height', this.heightArray[i] + 'px');
        }
        this.elems[i].className = "opentab";
        this.openArray.push(i);
    }
};
CFAccordion.prototype.getLevelElements = function(el, tag) {
    "use strict";
    var arr = el.getElementsByTagName(tag);
    var items = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parentNode === el) {
            items.push(arr[i]);
        }
    }
    return items;
};
// CF-Modal-JS v2.3 www.multisites.co.za \\
var CFModal = function() {
	"use strict";
    this.width = "";
    this.height = "";
    this.useFrame = false;
    this.windowElem = null;
    this.frameSource = null;
    this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.docHeight = document.body.offsetHeight || document.offsetHeight;
    this.xPos = 0;
    this.yPos = 0;
    this.widthPercent = false;
    this.heightPercent = false;
    this.modalScreen = null;
    this.opacityEnabled = true;
    this.currentScroll = 0;
    this.debugMode = false;
    this.bugString = "CFModal v2.3 <br />";
	this.frame = null;
	this.modalScreen = null;
    this.animation = 'fade';
	this.init();
};
CFModal.prototype.init = function() {
	"use strict";
    if ('opacity' in document.body.style) {
        this.opacityEnabled = true;
    } else {
        this.opacityEnabled = false;
    }
    try {
        var neelems = document.getElementsByClassName("cf-modal");
        for (var i = 0; i < neelems.length; i++) {
             neelems[i].style.display = "none";
             if (this.opacityEnabled) {
                 neelems[i].style.opacity = "0";
             } else {
                 neelems[i].style.setAttribute("filter", "alpha(opacity=0)");
             }
         }
     } catch (e) {	 
         var eelems = [];
         var allElems = document.getElementsByTagName("*");
         for (var z = 0; z < allElems.length; z++) {
             var elemNames = allElems[z].className.split(' ');
             for (var j = 0; j < elemNames.length; j++) {
                 if (elemNames[j] === "cf-modal") {
                     eelems.push(allElems[z]);
                 }
             }
         }
         for (var k = 0; k < eelems.length; k++) {
             eelems[k].style.display = "none";
             if (this.opacityEnabled) {
                 eelems[k].style.opacity = "0";
             } else {
                 try {
                     eelems[k].style.setAttribute("filter", "alpha(opacity=0)");
                 } catch (e) {
                     this.bugString += "Error (" + k + "): " + e + ".<br />";
                 }
             }
         }
         this.bugString += "<b>Error!</b> " + e + "<br />";
    }
    this.modalScreen = document.createElement("div");
    this.modalScreen.id = "cf-modal-screen-overlay";
    document.body.appendChild(this.modalScreen);
    if (this.debugMode) {
        var debugWindow = document.createElement("div");
        debugWindow.id = "dwin";
        document.body.appendChild(debugWindow);
		var debugRefresh = setInterval(function() {
			debugWindow.innerHTML = this.bugString;
		}, 100);
	}
};
CFModal.prototype.openWindow = function(winelem, winwidth, winheight, animation, framesource) {
	"use strict";
	var that = this;
    this.windowElem = document.getElementById(winelem);
	if (this.windowElem === null || this.windowElem === undefined) {
		this.windowElem = document.createElement("div");
		this.windowElem.id = winelem;
		this.windowElem.className = "cf-modal";
		document.body.appendChild(this.windowElem);
		this.windowElem.innerHTML = "<p style='text-align:center;'>No content specified</p>";
		this.bugString += "Warning: you must include an existing element when opening a new window. <br />";
	}
    this.windowElem.style.display = "block";
    this.modalScreen.style.display = "block";
    this.currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (winwidth === "") {
       this.width = "500px";
        this.debugstring += "Warning: you should specify a width when opening a new window. <br />";
    } else if (winwidth.search("auto") === 0) {
        this.width = "auto";
        this.widthPercent = true;
    } else if (winwidth.search("%") === 1 || winwidth.search("%") === 2 || winwidth.search("%") === 3) {
        this.width = winwidth;
        this.widthPercent = true;
    } else {
        this.width = winwidth;
    }
    if (winheight === "") {
        this.height = "400px";
    } else if (winheight.search("auto") === 0) {
        this.height = "auto";
        this.heightPercent = true;
    } else if (winheight.search("%") === 1 || winheight.search("%") === 2 || winheight.search("%") === 3) {
        this.height = winheight;
        this.heightPercent = true;
    } else {
        this.height = winheight;
    }
    if (!framesource) {
        this.useFrame = false;
    } else {
        this.useFrame = true;
        this.frameSource = framesource;
    }
    try {
        this.windowElem.style.setProperty("width", this.width);
        this.windowElem.style.setProperty("height", this.height);
    } catch (e) {
        this.windowElem.style.width = this.width;
        this.windowElem.style.height = this.height;
        this.bugString += "<b>Error!</b> " + e + "<br />";
    }
    if (!this.widthPercent) {
        var cutWidth = parseInt(this.width.replace("px", ""), 10);
        this.xPos = (this.screenWidth / 2) - (cutWidth / 2);
        this.windowElem.style.left = this.xPos + "px";
    } else {
        var cutPercent = this.windowElem.offsetWidth;
        this.xPos = (this.screenWidth / 2) - (cutPercent / 2);
        this.windowElem.style.left = this.xPos + "px";
    }
    if (!this.heightPercent) {
        var cutHeight = parseInt(this.height.replace("px", ""), 10);
        this.yPos = (this.screenHeight / 2) - (cutHeight / 2) + this.currentScroll;
        this.windowElem.style.top = this.yPos + "px";
    } else {
        var hPercent = this.windowElem.offsetHeight;
        this.yPos = (this.screenHeight / 2) - (hPercent / 2) + this.currentScroll;
        this.windowElem.style.top = this.yPos + "px";
    }
	this.modalScreen.style.height = this.screenHeight + "px";
	this.modalScreen.style.width =  this.screenWidth + "px";
	document.body.style.overflow = "hidden";
	var ctimer = 0;
    var xtimer = 0;
    var ztimer = 0;
	var e = this.windowElem;
    if (animation === '') {
        animation = 'fade';
    }
    this.animation = animation;
    switch (animation) {
        case 'fade':
            var openTimer = setInterval(function() {
                ctimer++;
                xtimer = ctimer / 100;
                ztimer = ctimer * 100;
                if (that.opacityEnabled) {
                    e.style.opacity = xtimer.toString();
                } else {
                    e.style.setAttribute("filter", "alpha(opacity=" + ztimer + ")");
                }
                if (ctimer >= 100) {
                    clearInterval(openTimer);
                }
            }, 5);
            break;
        case 'grow':
            try {
                e.style.opacity = '1';
            } catch(e) {
                e.style.setAttribute("filter", "alpha(opacity=100)");
            }
            var endWidth = e.offsetWidth;
            var endHeight = e.offsetHeight;
            var widthIncrement = Math.floor(endWidth / 100);
            var heightIncrement = Math.floor(endHeight / 100);
            var step = 0;
            try {
                e.style.width = '10px';
                e.style.height = '10px';
            } catch(err) {
                e.style.setProperty("width", "10px");
                e.style.setProperty("height", "10px");
            }
            var growTimer = setInterval(function() {
                step++;
                try {
                    e.style.width = widthIncrement * step + 'px';
                    e.style.height = heightIncrement * step + 'px';
                } catch(err) {
                    e.style.setProperty("width", widthIncrement * step + 'px');
                    e.style.setProperty("height", heightIncrement * step + 'px');
                }
                var cleft = (that.screenWidth / 2) - (e.offsetWidth / 2);
                var ctop = (that.screenHeight / 2) - (e.offsetHeight / 2);
                try {
                    e.style.left = cleft + 'px';
                    e.style.top = ctop + 'px';
                } catch(err) {
                    e.style.setProperty("left", cleft + 'px');
                    e.style.setProperty("top", ctop + 'px');
                }
                if (step >= 100) {
                    clearInterval(growTimer);
                }
            }, 5);
            break;
        case 'slideleft':
            try {
                e.style.opacity = '1';
            } catch(e) {
                e.style.setAttribute("filter", "alpha(opacity=100)");
            }
            var centerPoint = (this.screenWidth / 2) - (e.offsetWidth / 2);
            var startPoint = -e.offsetWidth;
            var animStep = Math.round(centerPoint / 100);
            var step = 0;
            try {
                e.style.left = startPoint + 'px';
            } catch (e) {
                e.style.setProperty('left', startPoint + 'px');
            }
            var animTimer = setInterval(function() {
                step++;
                try {
                    e.style.left = animStep * step + 'px';
                } catch (e) {
                    e.style.setProperty('left', animStep * step + 'px');
                }
                if (step === 100) {
                    clearInterval(animTimer);
                }
            }, 5);
            break;
        case 'slideright':
           try {
                e.style.opacity = '1';
            } catch(e) {
                e.style.setAttribute("filter", "alpha(opacity=100)");
            }
            var cenPoint = (this.screenWidth / 2) - (e.offsetWidth / 2);
            var stPoint = e.offsetWidth;
            var anStep = Math.round(cenPoint / 100);
            var ste = 0;
            try {
                e.style.right = stPoint + 'px';
            } catch (e) {
                e.style.setProperty('right', stPoint + 'px');
            }
            var aniTimer = setInterval(function() {
                step++;
                try {
                    e.style.right = anStep * ste + 'px';
                } catch (e) {
                    e.style.setProperty('right', anStep * ste + 'px');
                }
                if (ste === 100) {
                    clearInterval(aniTimer);
                }
            }, 5);
            break;
        case 'slidetop':
            try {
                e.style.opacity = '1';
            } catch(e) {
                e.style.setAttribute("filter", "alpha(opacity=100)");
            }
            var topPoint = (this.screenHeight / 2) - (e.offsetHeight / 2);
            var inPoint = -e.offsetHeight;
            var fraction = Math.round(topPoint / 100);
            var s = 0;
            e.style.top = inPoint + 'px';
            var slideTimer = setInterval(function() {
                s++;
                e.style.top = fraction * s + 'px';
                if (s === 100) {
                    clearInterval(slideTimer);
                }
            }, 5);
            break;
        case 'slidebottom':
            try {
                e.style.opacity = '1';
            } catch(e) {
                e.style.setAttribute("filter", "alpha(opacity=100)");
            }
            var tPoint = (this.screenHeight / 2) - (e.offsetHeight / 2);
            var iPoint = e.offsetHeight;
            var frac = Math.round(tPoint / 100);
            var st = 0;
            e.style.bottom = iPoint + 'px';
            var sliderTimer = setInterval(function() {
                st++;
                e.style.bottom = frac * st + 'px';
                if (s === 100) {
                    clearInterval(sliderTimer);
                }
            }, 5);
            break;
    }
    if (this.useFrame) {
        var iframe = document.createElement("iframe");
        iframe.id = "modalInnerFrame";
        this.windowElem.appendChild(iframe);
        iframe.src = this.frameSource;
		this.frame = iframe;
		try {
			iframe.style.setProperty("width", "100%");
			iframe.style.setProperty("height", "94%");
			iframe.style.setProperty("border", "none");
			iframe.style.setProperty("margin", "20px 0 0 0");
		} catch (error) {
			iframe.style.width = "100%";
			iframe.style.height = "94%";
			iframe.style.border = "none";
			iframe.style.position = "relative";
			iframe.style.top = "20px";
			this.bugString += "<b>Error!</b> " + e + "<br />";
		}
	}
	var closeBtn = document.createElement("div");
	closeBtn.id = "cf-modal-close-btn";
	this.windowElem.appendChild(closeBtn);
	this.addListener(closeBtn, "click", function() {
		that.closeWindow(this.windowElem);
		});
	this.addListener(this.modalScreen, "click", function() {
		that.closeWindow(this.windowElem);
	});
};
CFModal.prototype.closeWindow = function() {
	"use strict";
	var that = this;
	var m = this.modalScreen;
	var e = this.windowElem;
	var ctimer = 10;
    var xtimer = 0;
    var ztimer = 0;
	document.body.style.overflow = "auto";
	//console.log(this.windowElem);
    var closeTimer = setInterval(function() {
        m.style.display = "none";
        ctimer--;
        xtimer = ctimer / 10;
        ztimer = ctimer * 10;
		
        if (that.opacityEnabled) {
            e.style.opacity = ctimer.toString();
        } else {
            e.style.filter = "alpha(opacity=" + ztimer + ")";
        }
        if (ctimer <= 0) {
            clearInterval(closeTimer);
            e.style.display = "none";
            if (that.useFrame) {
                that.windowElem.removeChild(that.frame);
            }
       }
   }, 10);
};
CFModal.prototype.addListener = function(eventTarget, eventType, eventHandler) {
	"use strict";
	if (eventTarget.addEventListener) {
		eventTarget.addEventListener(eventType, eventHandler, false);
	} else if (eventTarget.attachEvent) {
		eventType = "on" + eventType;
		eventTarget.attachEvent(eventType, eventHandler);
	} else {
		eventTarget["on" + eventType] = eventHandler;
	}
};
var cfModal = new CFModal();
// CF TABS v1.0 \\
var CFTabs = function(id, options) {
    "use strict";
    this.presetValues = {
        heightMode: 'dynamic',
        transition: 'fade',
        tabWidth: 'auto',
        auto: false,
        autoDelay: 20,
        cancelAuto: true
    }
    this.options = {
        heightMode: options.heightMode,
        transition: options.transition,
        tabWidth: options.tabWidth,
        auto: options.auto,
        autoDelay: options.autoDelay,
        cancelAuto: options.cancelAuto
    }
    for (var opt in this.options) {
        if (this.options[opt] === undefined) {
            this.options[opt] = this.presetValues[opt];
        }
    }
    this.id = id;
    this.elem = null;
    this.currentTab = 0;
    this.totalTabs = 0;
    this.contentValues = [];
    this.init();
};
CFTabs.prototype.init = function() {
    "use strict";
    var that = this;
    this.elem = document.getElementById(this.id);
    var header = this.elem.getElementsByClassName('cf-tab-header')[0];
    var headers = this.getLevelElements(header, 'div');
    this.totalTabs = headers.length;
    var elemWidth = this.elem.offsetWidth;
    var elemFrac = Math.floor(elemWidth / this.totalTabs) - (6 * this.totalTabs);
    var content = this.elem.getElementsByClassName('cf-tab-content')[0];
    var tabContents = this.getLevelElements(content, 'div');
    for (var i = 0; i < headers.length; i++) {
        headers[i].id = i;
        if (headers[i].className.indexOf('active') > -1) {
            this.currentTab = i;
        }
        headers[i].addEventListener('click', function(event) {
            var tid = parseFloat(event.target.id);
            that.changeTab(that.elem, tid);
            if (that.options.cancelAuto) {
                if (changeTimer) {
                    clearInterval(changeTimer);
                }
            }
        }, true);
        if (this.options.tabWidth === 'fill') {
            headers[i].style.width = elemFrac + 'px';
        }
    }
    if (this.options.heightMode === 'dynamic') {
        content.style.transition = 'height 0.5s ease-out';
        for (var k = 0; k < tabContents.length; k++) {
            if (tabContents[k].className.indexOf('active') > -1) {
                var elHeight = tabContents[k].offsetHeight;
                content.style.height = elHeight + 'px';
            }
        }
    } else if (this.options.heightMode === 'static') {
        var maxHeight = 0;
        for (var l = 0; l < tabContents.length; l++) {
            var elemHeight = tabContents[l].offsetHeight;
            if (elemHeight > maxHeight) {
                maxHeight = elemHeight;
            }
        }
        content.style.height = maxHeight + 'px';
    }
    switch (this.options.transition) {
        case 'fade':
            for (var m = 0; m < tabContents.length; m++) {
                tabContents[m].style.opacity = 0;
                if (tabContents[m].className.indexOf('active') > -1) {
                    tabContents[m].style.opacity = 1;
                }
            }
            break;
        case 'collapse':
            for (var n = 0; n < tabContents.length; n++) {
                var contentHeight = tabContents[n].offsetHeight;
                this.contentValues.push(contentHeight);
                tabContents[n].style.height = '0px';
                tabContents[n].style.position = 'relative';
                
            }
            for (var o = 0; o < tabContents.length; o++) {
                if (tabContents[o].className.indexOf('active') > -1) {
                    tabContents[o].style.height = this.contentValues[o] + 'px';
                }
            }
            break;
        case 'none':
            for (var p = 0; p < tabContents.length; p++) {
                var cHeight = tabContents[p].offsetHeight;
                this.contentValues.push(cHeight);
                tabContents[p].style.display = 'none';
                if (tabContents[p].className.indexOf('active') > -1) {
                    tabContents[p].style.display = 'block';
                }
            }
            break;
    }
    if (this.options.auto === true) {
        var currentTab = 0;
        var totalTabs = tabContents.length;
        for (var r = 0; r < totalTabs; r++) {
            if (tabContents[r].className.indexOf('active') > -1) {
                currentTab = r;
            }
        }
        var changeTimer = setInterval(function() {
            if (currentTab < totalTabs - 1) {
                currentTab++;
            } else {
                currentTab = 0;
            }
            that.changeTab(that.elem, currentTab);
        }, this.options.autoDelay * 1000);
    }
};
CFTabs.prototype.getLevelElements = function(el, tag) {
    "use strict";
    var arr = el.getElementsByTagName(tag);
    var items = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parentNode === el) {
            items.push(arr[i]);
        }
    }
    return items;
};
CFTabs.prototype.changeTab = function(el, tab) {
    "use strict";
    var tabHeader = el.getElementsByClassName('cf-tab-header')[0];
    var tabContent = el.getElementsByClassName('cf-tab-content')[0];
    var th = this.getLevelElements(tabHeader, 'div');
    var tc = this.getLevelElements(tabContent, 'div');
    for (var i = 0; i < th.length; i++) {
        th[i].className = '';
        th[tab].className = 'active';
    }
    for (var j = 0; j < tc.length; j++) {
        tc[j].className = '';
        tc[tab].className = 'active';
    }
    if (this.options.heightMode === 'dynamic') {
        var elHeight = tc[tab].offsetHeight;
        tabContent.style.height = elHeight + 'px';
    }
    switch (this.options.transition) {
        case 'fade':
            for (var k = 0; k <= tc.length - 1; k++) {
                if (tc[k].style.opacity > 0) {
                    this.fadeout(tc[k]);
                }
            }
            var an = 0;
            var aTimer = setInterval(function() {
                an++;
                tc[tab].style.opacity = an / 100;
                if (an >= 100) {
                    clearInterval(aTimer);
                }
            }, 5);
            break;
        case 'collapse':
            for (var l = 0; l < tc.length; l++) {
                if (tc[l].offsetHeight > 0) {
                    this.collapseout(tc[l], this.contentValues[l]);
                }    
            }
            var anz = 0;
            var frac = Math.round(this.contentValues[tab] / 100);
            var atimerz = setInterval(function() {
                anz++;
                tc[tab].style.height = frac * anz + 'px';
                if (anz >= 100) {
                    clearTimeout(atimerz);
                }
            });
            if (this.options.heightMode === 'dynamic') {
                tabContent.style.height = this.contentValues[tab] + 'px';
            }
            break;
        case 'none':
            for (var q = 0; q < tc.length; q++) {
                tc[q].style.display = 'none';
            }
            tc[tab].style.display = 'block';
            if (this.options.heightMode === 'dynamic') {
                tabContent.style.height = this.contentValues[tab] + 'px';
            }
            break;
    }
};
CFTabs.prototype.fadeout = function(el) {
    "use strict";
    var a = 100;
    var tmr = setInterval(function() {
        a--;
        el.style.opacity = a / 100;
        if (a <= 0) {
            clearInterval(tmr);
        }
    }, 5);
};
CFTabs.prototype.collapseout = function(el, max) {
    "use strict";
    var u = 100;
    var fracu = Math.floor(max / 100);
    var animTimer2 = setInterval(function() {
        u--;
        el.style.height = fracu * u + 'px';
        if (u <= 0) {
            clearInterval(animTimer2);
        }
    }, 5);
};
// CFSlideshow v4.0.b \\
var CFSlideshow = function(id, options) {
    "use strict";
    this.id = id;
    this.presetValues = {
        width: '500px',
        height: '300px',
        autoplay: false,
        delay: 10,
        transition: 'fade',
        showThumbs: true,
        thumbMode: 'preview',
        showButtons: true,
        buttonHide: true,
        clickCancel: true
    };
    this.options = {
        width: options.width,
        height: options.height,
        autoplay: options.autoplay,
        delay: options.delay,
        transition: options.transition,
        showThumbs: options.showThumbs,
        thumbMode: options.thumbMode,
        showButtons: options.showButtons,
        buttonHide: options.buttonHide,
        clickCancel: options.clickCancel
    };
    for (var opt in this.options) {
        if (this.options[opt] === undefined) {
            this.options[opt] = this.presetValues[opt];
        }
    }
    this.elem = null;
    this.slides = 0;
    this.currentSlide = 0;
    this.bugString = '';
    this.init();
};
CFSlideshow.prototype.init = function() {
    "use strict";
    var that = this;
    this.elem = document.getElementById(this.id);
    this.slides = this.getLevelElements(this.elem, 'section').length;
    try {
        this.elem.style.width = this.options.width;
        this.elem.style.height = this.options.height;
    } catch (e) {
        this.elem.style.setProperty('width', this.options.width);
        this.elem.style.setProperty('height', this.options.height);
        this.bugString += 'err: alternate style property. ' + e + '.<br />'
    }
    if (this.options.showButtons) {
        var buttonNext = document.createElement('div');
        buttonNext.className = "nextBtn";
        try {
            this.elem.append(buttonNext);
        } catch (e) {
            this.elem.appendChild(buttonNext);
        }
        var buttonBack = document.createElement('div');
        buttonBack.className = "backBtn";
        try {
            this.elem.prepend(buttonBack);
        } catch (e) {
            this.elem.appendChild(buttonBack);
        }
        var fslide = null;
        var nextButton = null;
        var prevButton = null;
        try {
            fslide = this.getLevelElements(this.elem, 'section')[0];
            nextButton = this.elem.getElementsByClassName('nextBtn')[0];
            prevButton = this.elem.getElementsByClassName('backBtn')[0];
        } catch (e) {
            fslide = this.getByClass(this.elem, 'slide')[0];
            nextButton = this.getByClass(this.elem, 'nextBtn')[0];
            prevButton = this.getByClass(this.elem, 'backBtn')[0];
            this.bugString += 'err: getElementsByClassName not available. ' + e + '.<br />';
        }
        fslide.className += ' active';
        this.addListener('click', nextButton, function() {    
            if (that.currentSlide < that.slides-1) {
                that.currentSlide++;
                that.changeSlide(that.currentSlide, 'right');
                if (that.options.showThumbs) {
                    that.changeThumb(that.elem, that.currentSlide);
                }
                if (that.options.clickCancel) {
                    if (that.options.autoplay) {
                        clearInterval(autotimer);
                    }
                }
            }
        });
        this.addListener('click', prevButton, function() {
            if (that.currentSlide > 0) {
                that.currentSlide--;
                that.changeSlide(that.currentSlide, 'left');
                if (that.options.showThumbs) {
                    that.changeThumb(that.elem, that.currentSlide);
                }
                if (that.options.clickCancel) {
                    if (that.options.autoplay) {
                        clearInterval(autotimer);
                    }
                }
            }
        });
        prevButton.className = 'backBtn disabled';
        if (this.options.buttonHide) {
            nextButton.style.opacity = 0;
            nextButton.style.pointerEvents = 'none';
            prevButton.style.opacity = 0;
            prevButton.style.pointerEvents = 'none';
            this.addListener('mouseover', this.elem, function() {
                try {
                    nextButton.style.opacity = 1;
                    nextButton.style.pointerEvents = 'all';
                    prevButton.style.opacity = 1;
                    prevButton.style.pointerEvents = 'all';
                } catch (e) {
                    nextButton.style.setProperty('opacity', 1);
                    nextButton.style.setProperty('pointer-events', 'all');
                    prevButton.style.setProperty('opacity', 1);
                    prevButton.style.setProperty('pointer-events', 'all');
                    that.bugString += 'err: using alternate style properties. ' + e + '.<br />';
                }
            });
            this.addListener('mouseout', this.elem, function() {
                try {
                    nextButton.style.opacity = 0;
                    nextButton.style.pointerEvents = 'none';
                    prevButton.style.opacity = 0;
                    prevButton.style.pointerEvents = 'none';
                } catch (e) {
                    nextButton.style.setProperty('opacity', 0);
                    nextButton.style.setProperty('pointer-events', 'none');
                    prevButton.style.setProperty('opacity', 0);
                    prevButton.style.setProperty('pointer-events', 'none');
                    that.bugString += 'err: alternate style properties. ' + e + '.<br />';
                }
            });
        }
    }
    if (this.options.showThumbs) {
        var tcontainer = document.createElement('div');
        tcontainer.className = 'thumbnails';
        try {
            this.elem.append(tcontainer);
        } catch (e) {
            this.elem.appendChild(tcontainer);
        }
        for (var i = 0; i < this.slides; i++) {
            var thumb = document.createElement('span');
            thumb.className = 'thumb';
            try {
                tcontainer.append(thumb);
            } catch (e) {
                tcontainer.appendChild(thumb);
            }
            if (this.options.thumbMode === 'preview') {
                var slideContent = this.getLevelElements(this.elem, 'section')[i];
                var thumbContent = document.createElement('div');
                thumbContent.className = 'thumb-preview';
                try {
                    thumb.append(thumbContent);
                } catch (e) {
                    thumb.appendChild(thumbContent);
                }
                thumbContent.innerHTML = slideContent.innerHTML;
            }
        }
        var thumbs = null;
        try {
            thumbs = this.elem.getElementsByClassName('thumb');
        } catch (e) {
            thumbs = this.getByClass(this.elem, 'thumb');
        }
        thumbs[0].className += ' active';
        var direction = '';
        for (var t = 0; t < thumbs.length; t++) {
            var tt = thumbs[t];
            tt.id = t;
            that.addListener('click', tt, function(event) {
                var cs = parseFloat(event.target.id);
                if (cs > that.currentSlide) {
                    direction = 'right';
                } else if (cs < that.currentSlide) {
                    direction = 'left';
                }
                that.currentSlide = cs;
                that.changeSlide(cs, direction);
                for (var i = 0; i < thumbs.length; i++) {
                    thumbs[i].className = 'thumb';
                }
                this.className = 'thumb active';
            });
        }
    }
    if (this.options.autoplay) {
        var autotimer = setInterval(function() {
            if (that.currentSlide < that.slides - 1) {
                that.currentSlide++;
            } else {
                that.currentSlide = 0;
            }
            that.changeSlide(that.currentSlide);
            if (this.options.showThumbs) {
                that.changeThumb(that.elem, that.currentSlide);
            }
        }, that.options.delay * 1000);
    }
    if (this.options.transition === 'fade') {
        for (var j = 0; j < this.slides; j++) {
            var tslide = this.getLevelElements(this.elem, 'section')[j];
            tslide.style.opacity = 0;
            tslide.style.transition = 'opacity 1s ease-out';
            try {
                tslide.style.setProperty('-webkit-transition', 'opacity 1s ease-out');
            } catch (e) {
                this.bugString += 'err: transition property error. ' + e + '.<br />';
            }
        }
        var openSlide = this.getLevelElements(this.elem, 'section')[0];
        openSlide.style.opacity = 1;
    } else if (this.options.transition === 'slide') {
        for (var k = 0; k < this.slides; k++) {
            var uslide = this.getLevelElements(this.elem, 'section')[k];
            uslide.style.transition = 'left 1s ease-out';
            try {
                uslide.style.setProperty('-webkit-transition', 'left 1s ease-out');
            } catch (e) {
                this.bugString += 'err: transition property error. ' + e + '.<br />';
            }
        }
        var gslide = this.getLevelElements(this.elem, 'section')[0];
        var nslide = this.getLevelElements(this.elem, 'section')[1];
        var lslide = this.getLevelElements(this.elem, 'section')[this.slides-1];
        gslide.style.left = '0px';
        nslide.style.left = this.width;
        lslide.style.left = '-' + this.width;
    }
};
CFSlideshow.prototype.changeSlide = function(slideNum, dir) {
    "use strict";
    var allslides = this.getLevelElements(this.elem, 'section');
    var tslide = allslides[slideNum];
    var pslide = 0;
    var direction = dir;
    for (var i = 0; i < allslides.length; i++) {
        if (allslides[i].className.indexOf('active') > -1) {
            pslide = i;
        }
    }
    this.transitionSlide(this.elem, tslide, pslide, direction);
    if (this.options.showButtons) {
        var nb = this.elem.getElementsByClassName('nextBtn')[0];
        var pb = this.elem.getElementsByClassName('backBtn')[0];
        nb.className = 'nextBtn';
        pb.className = 'backBtn';
        if (slideNum === 0) {
            pb.className += ' disabled';
        } else if (slideNum === this.slides - 1) {
            nb.className += ' disabled';
        }
    }
};
CFSlideshow.prototype.nextSlide = function() {
    "use strict";
    var that = this;
    if (this.currentSlide < this.slides) {
        this.currentSlide++;
        that.changeSlide(this.currentSlide);
    }
};
CFSlideshow.prototype.prevSlide = function() {
    "use strict";
    var that = this;
    if (this.currentSlide > 0) {
        this.currentSlide--;
        that.changeSlide(this.currentSlide);
    }
};
CFSlideshow.prototype.getByClass = function(obj, className) {
    var elems = [];
    var all = obj.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className.indexOf(className) > 0) {
            elems.push(all[i]);
        }
    }
    return elems;
};
CFSlideshow.prototype.addListener = function(type, target, handler) {
    "use strict";
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) {
        type = 'on' + type;
        target.attachEvent(type, handler);
    } else {
        target['on' + type] = handler;
    }
}
CFSlideshow.prototype.changeThumb = function(el, n) {
    var thumbs = null;
    try {
        thumbs = el.getElementsByClassName('thumb');
    } catch (e) {
        thumbs = this.getByClass(el, 'thumb');
    }
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].className = 'thumb';
    }
    thumbs[n].className = 'thumb active';
}
CFSlideshow.prototype.getLevelElements = function(el, tag) {
    "use strict";
    var arr = el.getElementsByTagName(tag);
    var items = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parentNode === el) {
            items.push(arr[i]);
        }
    }
    return items;
};
CFSlideshow.prototype.transitionSlide = function (elem, slide, prevSlide, dir) {
    "use strict";
    var tslide = this.getLevelElements(elem, 'section')[prevSlide];
    var allSlides = this.getLevelElements(this.elem, 'section');
    var nslide = this.getLevelElements(elem, 'section')[this.currentSlide + 1];
    if (this.options.transition === 'fade') {
        slide.style.opacity = 0;
        tslide.style.opacity = 0;
        slide.style.opacity = 1;
    } else if (this.options.transition === 'slide') {
        if (dir === 'right') {
            tslide.style.zIndex = 1;
            tslide.style.left = '-' + this.width;
            slide.style.left = '0px';
            if (nslide) {
                 nslide.style.left = this.width;
            }
        } else {
            tslide.style.zIndex = 1;
            tslide.style.left = this.width;
            slide.style.left = '0px';
        }
    }
    for (var i = 0; i < allSlides.length; i++) {
        allSlides[i].className = '';
    }
    slide.className = 'active';
};
CFSlideshow.prototype.getCurrentSlide = function() {
    "use strict";
    return this.currentSlide;
};
CFSlideshow.prototype.getTotalSlides = function() {
    "use strict";
    return this.slides;
};
// CFTooltips v1.0b \\
var CFTooltip = function(id, options) {
    this.elem = document.getElementById(id);
    this.options = {
        alignment: options.alignment,
        delay: options.delay
    }
    this.init();
};
CFTooltip.prototype.init = function() {
    var that = this;
    var link = this.elem.parentNode;
    var delay = null;
    var ondelay = this.options.delay;
    var delayTimer = null;
    link.addEventListener('mouseover', function() {
        if (ondelay > 0) {
            delayTimer = setInterval(function() {
                that.elem.style.display = 'block';
                clearInterval(delayTimer);
            }, ondelay * 1000);
        } else {
            that.elem.style.display = 'block';
        }
        var width = that.elem.offsetWidth;
        var height = that.elem.offsetHeight;
        if (that.options.alignment === 'left') {
            that.elem.style.left = -(width + 5) + 'px';
        } else if (that.options.alignment === 'above') {
            that.elem.style.top = -(height + 10) + 'px';
            that.elem.style.verticalAlign = 'bottom';
            that.elem.style.left = -((width / 2) - (link.offsetWidth / 2)) + 'px';
            that.elem.style.right = 'auto';
        } else if (that.options.alignment === 'below') {
            that.elem.style.top = '100%';
            that.elem.style.verticalAlign = 'top';
            that.elem.style.left = -((width / 2) - (link.offsetWidth / 2)) + 'px';
            that.elem.style.right = 'auto';
        }
        if (delay !== null) {
            clearInterval(delay);
        }
        
    }, false);
    link.addEventListener('mouseout', function() {
        if (ondelay > 0) {
            delay = setInterval(function() {
                that.elem.style.display = 'none';
                clearInterval(delay);
            }, ondelay * 1000);
        } else {
            that.elem.style.display = 'none';
        }
        if (delayTimer !== null) {
            clearInterval(delayTimer)
        }
    }, false);
};
// AutoComplete \\
var CFAutoComplete = function(id, options) {
    this.elem = null;
    this.currentFocus = 0;
    this.id = id;
    var presetValues = {
        source: ['You must provide an array']
    }
    this.options =  {
        source: options.source
    }
    for (var opt in this.options) {
        if (this.options[opt] === undefined) {
            this.options[opt] = presetValues[opt];
        }
    }
    this.init();
};
CFAutoComplete.prototype.init = function() {
    var that = this;
    this.elem = document.getElementById(this.id);
    var inputPositionY = this.elem.offsetTop;
    var inputPositionX = this.elem.offsetLeft;
    var inputHeight = this.elem.offsetHeight;
    this.elem.addEventListener('input', function() {
        var a, b, i, val = this.value;
        that.closeAllLists();
        if (!val) {
            return false;
        }
        that.currentFocus = -1;
        a = document.createElement('div');
        a.setAttribute('id', this.id + '_list');
        a.setAttribute('class', 'cf-autocomplete-list');
        a.style.top = Math.floor(inputPositionY + inputHeight) + 'px';
        a.style.left = Math.floor(inputPositionX) + 'px';
        this.parentNode.appendChild(a);
        for (i = 0; i < that.options.source.length; i++) {
            if (that.options.source[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                b = document.createElement('div');
                b.innerHTML = '<span>' + that.options.source[i].substr(0, that.options.source[i].length) + '</span>';
                b.innerHtml += that.options.source[i].substr(val.length);
                b.innerHTML += '<input type="hidden" value="' + that.options.source[i] + '" />';
                b.addEventListener('click', function() {
                    that.elem.value = this.getElementsByTagName('input')[0].value;
                    that.elem.focus();
                    that.closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    this.elem.addEventListener('keydown', function(event) {
        var x = document.getElementById(this.id + '_list');
        if (x) {
            x = x.getElementsByTagName('div');
        }
        if (event.keyCode === 40) {
            that.currentFocus++;
            that.addActive(x);
        } else if (event.keyCode === 38) {
            that.currentFocus--;
            that.addActive(x);
        } else if (event.keyCode === 13) {
            event.preventDefault();
            if (that.currentFocus > -1) {
                if (x) {
                    x[that.currentFocus].click();
                }
            }
        }
    });
    document.addEventListener('click', function(event) {
        that.closeAllLists(event.target);
    });
};
CFAutoComplete.prototype.addActive = function(x) {
    if (!x) {
        return(false);
    }
    this.removeActive(x);
    if (this.currentFocus >= x.length) {
        this.currentFocus = 0;
    }
    if (this.currentFocus < 0) {
        this.currentFocus = (x.length - 1);
    }
    x[this.currentFocus].classList.add('active');
};
CFAutoComplete.prototype.removeActive = function(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove('active');
    }
};
CFAutoComplete.prototype.closeAllLists = function(elem) {
    var x = document.getElementsByClassName('cf-autocomplete-list');
    for (var i = 0; i < x.length; i++) {
        if (elem !== x[i] && elem !== this.elem) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
};
CFAutoComplete.prototype.getList = function(id) {
    var elem = document.getElementById(id);
    var items = elem.getElementsByTagName('li');
    var list = [];
    for (var i = 0; i < items.length; i++) {
        var val = items[i].innerHTML;
        list.push(val);
    }
    this.options.source = list;
};
// Effects
var CFEffect = function(id, options) {
    this.elem = document.getElementById(id);
    var presetValues = {
        length: 3,
        callback: null
    };
    this.options = {
        length: options.length,
        callback: options.callback
    };
    for (var opt in this.options) {
        if (this.options[opt] === undefined) {
            this.options[opt] = presetValues[opt];
        }
    }
    this.elWidth = this.elem.offsetWidth;
    this.elHeight = this.elem.offsetHeight;
};
CFEffect.prototype.addEffect = function(effect, type) {
    var that = this;
    switch (effect) {
        case 'fade':
            if (type === 'show') {
                this.elem.style.opacity = 0;
                var i = 0;
                var fadeTimer = setInterval(function() {
                    i++;
                    that.elem.style.opacity = i / 100;
                    if (i >= 100) {
                        clearInterval(fadeTimer);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            } else {
                this.elem.style.opacity = 1;
                var ia = 100;
                var fadeTimera = setInterval(function() {
                    ia--;
                    that.elem.style.opacity = ia / 100;
                    if (ia <= 0) {
                        clearInterval(fadeTimera);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            }
            break;
        case 'grow':
            if (type === 'show') {
                this.elem.style.transform = 'scale(0)';
                var j = 0;
                var growTimer = setInterval(function() {
                    j++;
                    that.elem.style.transform = 'scale(' + (j / 100) + ')';
                    if (j >= 100) {
                        clearInterval(growTimer);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            } else {
                this.elem.style.transform = 'scale(1)';
                var ja = 100;
                var growTimera = setInterval(function() {
                    ja--;
                    that.elem.style.transform = 'scale(' + (ja / 100) + ')';
                    if (ja <= 0) {
                        clearInterval(growTimera);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            }
            break;
        case 'spin':
            if (type === 'show') {
                var k = 0;
                this.elem.style.transform = 'scale(0)';
                var spinTimer = setInterval(function() {
                    k++;
                    var deg = k / 100 * 360;
                    that.elem.style.transform = 'scale(' + (k / 100) + ') rotate(' + deg + 'deg)';
                    if (k >= 100) {
                        clearInterval(spinTimer);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            } else {
                var ka = 100;
                this.elem.style.transform = 'scale(1)';
                var spinTimera = setInterval(function() {
                    ka--;
                    var deg = ka / 100 * 360;
                    that.elem.style.transform = 'scale(' + (ka / 100) + ') rotate(' + deg + 'deg)';
                    if (ka <= 0) {
                        clearInterval(spinTimera);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, that.options.length * 10);
            }
            break;
        case 'highlite':
            var l = 0;
            var hilite = document.createElement('div');
            hilite.setAttribute('class', 'highlite');
            this.elem.appendChild(hilite);
            hilite.style.opacity = 0;
            var reverse = false;
            var elwidth = this.elem.offsetWidth;
            var elheight = this.elem.offsetHeight;
            hilite.style.width = elwidth + 'px';
            hilite.style.height = elheight + 'px';
            var highTimer = setInterval(function() {
                if (!reverse) {
                    l++;
                    hilite.style.opacity = l / 100;
                    if (l >= 100) {
                        reverse = true;
                    }
                } else {
                    l--;
                    hilite.style.opacity = l / 100;
                    if (l <= 0) {
                        reverse = false;
                        clearInterval(highTimer);
                        that.elem.removeChild(hilite);
                    }
                }
            }, this.options.length * 5);
            break;
        case 'rollup':
            if (type === 'hide') {
                var m = 100;
                var elHeight = this.elem.offsetHeight;
                var hFrac = elHeight / 100;
                var rollTimer = setInterval(function() {
                    m--;
                    that.elem.style.height = m * hFrac + 'px';
                    if (m <= 0) {
                        clearInterval(rollTimer);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, this.options.length * 10);
            } else {
                var ma = 0;
                var elFrac = this.elHeight / 100;
                var rollTimera = setInterval(function() {
                    ma++;
                    that.elem.style.height = ma * elFrac + 'px';
                    if (ma >= 100) {
                        clearInterval(rollTimera);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, this.options.length * 10);
            }
            break;
        case 'exit':
            var wrapper = this.elem.parentNode;
            wrapper.style.overflow = 'hidden';
            if (type === 'hide') {
                var n = 0;
                var fWidth = this.elem.offsetWidth;
                var ffrac = fWidth / 100;
                var exitTimer = setInterval(function() {
                    n++;
                    that.elem.style.left = -(n * ffrac) + 'px';
                    if (n >= 100) {
                        clearInterval(exitTimer);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, this.options.length * 10);
            } else {
                var na = 100;
                var fStart = -this.elem.offsetWidth;
                var efrac = this.elem.offsetWidth / 100;
                this.elem.style.left = fStart + 'px';
                var exitTimera = setInterval(function() {
                    na--;
                    that.elem.style.left = -(na * efrac) + 'px';
                    if (na <= 0) {
                        clearInterval(exitTimera);
                        if (that.options.callback !== null) {
                            that.options.callback();
                        }
                    }
                }, this.options.length * 10);
            }
            break;
    }
};
CFEffect.prototype.resetElem = function() {
    this.elem.style.opacity = 1;
    this.elem.style.height = this.elHeight + 'px';
    this.elem.style.transform = 'scale(1) rotate(0deg)';
    this.elem.style.left = '0px';
};
CFEffect.prototype.removeElem = function() {
    document.removeChild(this.elem);
};
CFEffect.prototype.reverseEffect = function(effect, type) {
    this.options.callback = null;
    this.addEffect(effect, type);
};
(function() {
    var tooltips = document.getElementsByClassName('tooltip');
    if (tooltips.length > -1) {
        for (var t = 0; t < tooltips.length; t++) {
            var fullClass = tooltips[t].className;
            var delay = tooltips[t].dataset.delay;
            var align = 'right';
            if (fullClass.indexOf('left') > -1) {
                align = 'left';
            } else if (fullClass.indexOf('above') > -1) {
                align = 'above';
            } else if (fullClass.indexOf('below') > -1) {
                align = 'below';
            }
            if (delay === undefined) {
                delay = 0;
            }
            var tooltip = new CFTooltip(tooltips[t].id, {
                alignment: align,
                delay: delay
            });
        }
    }
})();
var CFMenu = function(id, options) {
    "use strict";
    this.id = id;
    this.defaultValues = {
        handler: 'mouseover',
        anim: 'collapse'
    }
    this.options = {
        handler: options.handler,
        anim: options.anim
    }
    for (var opt in this.options) {
        if (this.options[opt] === undefined) {
            this.options[opt] = this.defaultValues[opt];
        }
    }    
    this.elem = null;
    this.menuHeights = [];
    this.init();
};
CFMenu.prototype.init = function() {
    "use strict";
    var that = this;
    this.elem = document.getElementById(this.id);
    var menu = this.elem.getElementsByClassName('menu')[0];
    var alllinks = menu.getElementsByTagName('li');
    var links = [];
    for (var a = 0; a < alllinks.length; a++) {
        if (alllinks[a].parentNode === menu) {
            links.push(alllinks[a]);
        }
    }
    for (var link = 0; link < links.length; link++) {
        var submenu = links[link].getElementsByClassName('submenu')[0];
        if (submenu !== undefined) {
            var menuheight = submenu.offsetHeight;
            that.menuHeights.push(menuheight);
            if (that.options.anim === 'collapse') {
                submenu.style.height = '0px';
            } else if (that.options.anim === 'fade') {
                submenu.style.display = 'none';
                submenu.style.opacity = 0;
            } else {
                submenu.style.display = 'none';
            }
            this.addEvents(links[link], link);
        } else {
            that.menuHeights.push(0);
        }
    }
};
CFMenu.prototype.addEvents = function(el, l) {
    var that = this;
    var headLink = el.getElementsByTagName('a')[0];
    var subMenu = el.getElementsByClassName('submenu')[0];
    var timer = null;
    if (this.options.handler === 'mouseover') {
        headLink.addEventListener('mouseover', function() {
            if (that.options.anim === 'collapse') {
                subMenu.style.height = that.menuHeights[l] + 'px';
            } else if (that.options.anim === 'fade') {
                subMenu.style.display = 'block';
                var delay = setInterval(function() {
                    subMenu.style.opacity = 1;
                    clearInterval(delay);
                },10);
            } else {
                subMenu.style.display = 'block';
            }
            if (timer !== null) {
                clearInterval(timer);
            }
        }, false);
        headLink.addEventListener('mouseout', function() {
            timer = setInterval(function() {
                if (that.options.anim === 'collapse') {
                    subMenu.style.height = '0px';
                } else if (that.options.anim === 'fade') {
                    subMenu.style.opacity = 0;
                    var delay = setInterval(function() {
                        subMenu.style.display = 'none';
                        clearInterval(delay);
                    }, 600);
                } else {
                    subMenu.style.display = 'none';
                }
                clearInterval(timer);
            }, 500);
        }, false);
        subMenu.addEventListener('mouseover', function() {
            if (timer !== null) {
                clearInterval(timer);
            }
        }, false);
        subMenu.addEventListener('mouseout', function() {
            timer = setInterval(function() {
                if (that.options.anim === 'collapse') {
                    subMenu.style.height = '0px';
                } else if (that.options.anim === 'fade') {
                    subMenu.style.opacity = 0;
                    var delay = setInterval(function() {
                        subMenu.style.display = 'none';
                        clearInterval(delay);
                    }, 600);
                } else {
                    subMenu.style.display = 'none';
                }
                clearInterval(timer);
            }, 500);
           
        }, false);
    } else {
        headLink.addEventListener('click', function(event) {
            if (this.className.indexOf('active') < 0) {
                if (that.options.anim === 'collapse') {
                    subMenu.style.height = that.menuHeights[l] + 'px';
                } else if (that.options.anim === 'fade') {
                    subMenu.style.display = 'block';
                    var delay = setInterval(function() {
                        subMenu.style.opacity = 1;
                        clearInterval(delay);
                    }, 10);
                } else {
                    subMenu.style.display = 'block';
                }
                this.className = 'active';
            } else {
                if (that.options.anim === 'collapse') {
                    subMenu.style.height = '0px';
                } else if (that.options.anim === 'fade') {
                    subMenu.style.opacity = 0;
                    var delayOut = setInterval(function() {
                        subMenu.style.display = 'none';
                        clearInterval(delayOut);
                    }, 600);
                } else {
                    subMenu.style.display = 'none';
                }
                this.className = '';
            }
            event.preventDefault();
        }, false);
    }
};