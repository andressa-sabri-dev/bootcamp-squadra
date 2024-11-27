/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,Drupal,once){'use strict';Drupal.webform=Drupal.webform||{};Drupal.webform.select2=Drupal.webform.select2||{};Drupal.webform.select2.options=Drupal.webform.select2.options||{};Drupal.webform.select2.options.width=Drupal.webform.select2.options.width||'100%';Drupal.webform.select2.options.widthInline=Drupal.webform.select2.options.widthInline||'50%';Drupal.behaviors.webformSelect2={attach:function(context){if(!$.fn.select2)return;$(once('webform-select2','select.js-webform-select2, .js-webform-select2 select',context)).each(function(){var $select=$(this);var options={};if($select.parents('.webform-element--title-inline').length)options.width=Drupal.webform.select2.options.widthInline;options=$.extend(options,Drupal.webform.select2.options);if($select.data('placeholder')){options.placeholder=$select.data('placeholder');if(!$select.prop('multiple'))options.allowClear=true;}if($select.data('limit'))options.maximumSelectionLength=$select.data('limit');if(window.navigator.userAgent.indexOf('Trident/')!==-1&&$select.attr('multiple')&&$select.attr('required'))$select.removeAttr('required');$select.select2(options);});}};$(function(){if($.fn.select2)$(document).on('state:visible state:visible-slide',function(e){$('select.select2-hidden-accessible').select2('close');});if($.ui&&$.ui.dialog&&$.ui.dialog.prototype._allowInteraction){var ui_dialog_interaction=$.ui.dialog.prototype._allowInteraction;$.ui.dialog.prototype._allowInteraction=function(e){if($(e.target).closest('.select2-dropdown').length)return true;return ui_dialog_interaction.apply(this,arguments);};}});})(jQuery,Drupal,once);;
(function($,window,Drupal){'use strict';Drupal.behaviors.webformBlockSettingsSummary={attach:function(){if(typeof $.fn.drupalSetSummary==='undefined')return;function selectSummary(context){return $(context).find('#edit-visibility-webform-webforms option:selected').map(function(){return Drupal.checkPlain(this.text);}).get().join(', ')||Drupal.t('Not restricted');}$('[data-drupal-selector="edit-visibility-webform"]').drupalSetSummary(selectSummary);}};})(jQuery,window,Drupal);;
((Drupal,drupalSettings,once)=>{Drupal.behaviors.ginAccent={attach:function(context){once("ginAccent","body",context).forEach((()=>{Drupal.ginAccent.checkDarkmode(),Drupal.ginAccent.setAccentColor(),Drupal.ginAccent.setFocusColor();}));}},Drupal.ginAccent={setAccentColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const accentColorPreset=null!=preset?preset:drupalSettings.gin.preset_accent_color;document.body.setAttribute("data-gin-accent",accentColorPreset),"custom"===accentColorPreset&&this.setCustomAccentColor(color);},setCustomAccentColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.accent_color;if(accentColor){this.clearAccentColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65).replace("#",""),style=document.createElement("style");style.className="gin-custom-colors",style.innerHTML=`\n          [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(accentColor)};\n            --gin-color-primary-hover: ${this.shadeColor(accentColor,-10)};\n            --gin-color-primary-active: ${this.shadeColor(accentColor,-15)};\n            --gin-bg-app-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,97))};\n            --gin-bg-header: ${this.mixColor("ffffff",strippedAccentColor,85)};\n            --gin-color-sticky-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,92))};\n          }\n          .gin--dark-mode[data-gin-accent="custom"],\n          .gin--dark-mode [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(darkAccentColor)};\n            --gin-color-primary-hover: ${this.mixColor("ffffff",strippedAccentColor,55)};\n            --gin-color-primary-active: ${this.mixColor("ffffff",strippedAccentColor,50)};\n            --gin-bg-header: ${this.mixColor("2A2A2D",darkAccentColor,88)};\n          }\n        `,element.append(style);}},clearAccentColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-colors").length>0){const removeElement=element.querySelector(".gin-custom-colors");removeElement.parentNode.removeChild(removeElement);}},setFocusColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const focusColorPreset=null!=preset?preset:drupalSettings.gin.preset_focus_color;document.body.setAttribute("data-gin-focus",focusColorPreset),"custom"===focusColorPreset&&this.setCustomFocusColor(color);},setCustomFocusColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.focus_color;if(accentColor){this.clearFocusColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65),style=document.createElement("style");style.className="gin-custom-focus",style.innerHTML=`\n          [data-gin-focus="custom"] {\n            --gin-color-focus: ${accentColor};\n          }\n          .gin--dark-mode[data-gin-focus="custom"],\n          .gin--dark-mode [data-gin-focus="custom"] {\n            --gin-color-focus: ${darkAccentColor};\n          }`,element.append(style);}},clearFocusColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-focus").length>0){const removeElement=element.querySelector(".gin-custom-focus");removeElement.parentNode.removeChild(removeElement);}},checkDarkmode:()=>{const darkmodeClass=drupalSettings.gin.darkmode_class;window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",((e)=>{e.matches&&"auto"===localStorage.getItem("Drupal.gin.darkmode")&&document.querySelector("html").classList.add(darkmodeClass);})),window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",((e)=>{e.matches&&"auto"===localStorage.getItem("Drupal.gin.darkmode")&&document.querySelector("html").classList.remove(darkmodeClass);}));},hexToRgb:(hex)=>{hex=hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(m,r,g,b){return r+r+g+g+b+b;}));var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?`${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)}`:null;},mixColor:(color_1,color_2,weight)=>{function h2d(h){return parseInt(h,16);}weight=void 0!==weight?weight:50;for(var color="#",i=0;i<=5;i+=2){for(var v1=h2d(color_1.substr(i,2)),v2=h2d(color_2.substr(i,2)),val=Math.floor(v2+weight/100*(v1-v2)).toString(16);val.length<2;)val="0"+val;color+=val;}return color;},shadeColor:(color,percent)=>{const num=parseInt(color.replace("#",""),16),amt=Math.round(2.55*percent),R=(num>>16)+amt,B=(num>>8&255)+amt,G=(255&num)+amt;return `#${(16777216+65536*(R<255?R<1?0:R:255)+256*(B<255?B<1?0:B:255)+(G<255?G<1?0:G:255)).toString(16).slice(1)}`;}};})(Drupal,drupalSettings,once);;
((Drupal,drupalSettings,once)=>{Drupal.behaviors.ginEscapeAdmin={attach:(context)=>{once("ginEscapeAdmin","[data-gin-toolbar-escape-admin]",context).forEach(((el)=>{const escapeAdminPath=sessionStorage.getItem("escapeAdminPath");drupalSettings.path.currentPathIsAdmin&&null!==escapeAdminPath&&el.setAttribute("href",escapeAdminPath);}));}};})(Drupal,drupalSettings,once);;
((Drupal,drupalSettings,once)=>{const toolbarVariant=drupalSettings.gin.toolbar_variant;Drupal.behaviors.ginToolbar={attach:(context)=>{Drupal.ginToolbar.init(context),Drupal.ginToolbar.initKeyboardShortcut(context);}},Drupal.ginToolbar={init:function(context){once("ginToolbarInit","#gin-toolbar-bar",context).forEach((()=>{const toolbarTrigger=document.querySelector(".toolbar-menu__trigger");"classic"!=toolbarVariant&&localStorage.getItem("Drupal.toolbar.trayVerticalLocked")&&localStorage.removeItem("Drupal.toolbar.trayVerticalLocked"),"true"===localStorage.getItem("Drupal.gin.toolbarExpanded")?(document.body.setAttribute("data-toolbar-menu","open"),toolbarTrigger.classList.add("is-active")):(document.body.setAttribute("data-toolbar-menu",""),toolbarTrigger.classList.remove("is-active")),this.initDisplace();})),once("ginToolbarToggle",".toolbar-menu__trigger",context).forEach(((el)=>el.addEventListener("click",((e)=>{e.preventDefault(),this.toggleToolbar();}))));},initKeyboardShortcut:function(context){once("ginToolbarKeyboardShortcutInit",".toolbar-menu__trigger, .admin-toolbar__expand-button",context).forEach((()=>{document.addEventListener("keydown",((e)=>{!0===e.altKey&&"KeyT"===e.code&&this.toggleToolbar();}));}));},initDisplace:()=>{const toolbar=document.querySelector("#gin-toolbar-bar .toolbar-menu-administration");toolbar&&("vertical"===toolbarVariant?toolbar.setAttribute("data-offset-left",""):toolbar.setAttribute("data-offset-top",""));},toggleToolbar:function(){const toolbarTrigger=document.querySelector(".toolbar-menu__trigger");toolbarTrigger.classList.toggle("is-active"),toolbarTrigger.classList.contains("is-active")?this.showToolbar():this.collapseToolbar();},showToolbar:function(){document.body.setAttribute("data-toolbar-menu","open"),localStorage.setItem("Drupal.gin.toolbarExpanded","true"),this.dispatchToolbarEvent("true"),this.displaceToolbar(),window.innerWidth<1280&&"vertical"===toolbarVariant&&Drupal.ginSidebar.collapseSidebar();},collapseToolbar:function(){const toolbarTrigger=document.querySelector(".toolbar-menu__trigger"),elementToRemove=document.querySelector(".gin-toolbar-inline-styles");toolbarTrigger.classList.remove("is-active"),document.body.setAttribute("data-toolbar-menu",""),elementToRemove&&elementToRemove.parentNode.removeChild(elementToRemove),localStorage.setItem("Drupal.gin.toolbarExpanded","false"),this.dispatchToolbarEvent("false"),this.displaceToolbar();},dispatchToolbarEvent:(active)=>{const event=new CustomEvent("toolbar-toggle",{detail:"true"===active});document.dispatchEvent(event);},displaceToolbar:()=>{ontransitionend=()=>{Drupal.displace(!0);};}};})(Drupal,drupalSettings,once);;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUICore = {}));
})(this, (function (exports) { 'use strict';

  function getAlignment(placement) {
    return placement.split('-')[1];
  }

  function getLengthFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
  }

  function getSide(placement) {
    return placement.split('-')[0];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === 'x';
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }

  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }

  function getSideObjectFromPadding(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }

  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      ...rects.floating,
      x,
      y
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  const min = Math.min;
  const max = Math.max;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow = options => ({
    name: 'arrow',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform,
        elements
      } = state;
      // Since `element` is required, we don't Partial<> the type.
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const axis = getMainAxisFromPlacement(placement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform.getDimensions(element);
      const isYAxis = axis === 'y';
      const minProp = isYAxis ? 'top' : 'left';
      const maxProp = isYAxis ? 'bottom' : 'right';
      const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

      // DOM platform can return `window` as the `offsetParent`.
      if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;

      // If the padding is large enough that it causes the arrow to no longer be
      // centered, modify the padding so that it is centered.
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

      // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside the floating element's bounds.
      const min$1 = minPadding;
      const max = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = within(min$1, center, max);

      // If the reference is small enough that the arrow's padding causes it to
      // to point to nothing for an aligned placement, adjust the offset of the
      // floating element itself. This stops `shift()` from taking action, but can
      // be worked around by calling it again after the `arrow()` if desired.
      const shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
      return {
        [axis]: coords[axis] - alignmentOffset,
        data: {
          [axis]: offset,
          centerOffset: center - offset + alignmentOffset
        }
      };
    }
  });

  const sides = ['top', 'right', 'bottom', 'left'];
  const allPlacements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);

  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }

  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }

  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }

  function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter(placement => {
      if (alignment) {
        return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
      }
      return true;
    });
  }
  /**
   * Optimizes the visibility of the floating element by choosing the placement
   * that has the most space available automatically, without needing to specify a
   * preferred placement. Alternative to `flip`.
   * @see https://floating-ui.com/docs/autoPlacement
   */
  const autoPlacement = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'autoPlacement',
      options,
      async fn(state) {
        var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
        const {
          rects,
          middlewareData,
          placement,
          platform,
          elements
        } = state;
        const {
          crossAxis = false,
          alignment,
          allowedPlacements = allPlacements,
          autoAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const placements = alignment !== undefined || allowedPlacements === allPlacements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
        const currentPlacement = placements[currentIndex];
        if (currentPlacement == null) {
          return {};
        }
        const {
          main,
          cross
        } = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

        // Make `computeCoords` start from the right place.
        if (placement !== currentPlacement) {
          return {
            reset: {
              placement: placements[0]
            }
          };
        }
        const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
        const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements[currentIndex + 1];

        // There are more placements to check.
        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        const placementsSortedByMostSpace = allOverflows.map(d => {
          const alignment = getAlignment(d.placement);
          return [d.placement, alignment && crossAxis ?
            // Check along the mainAxis and main crossAxis side.
            d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
            // Check only the mainAxis.
            d.overflows[0], d.overflows];
        }).sort((a, b) => a[1] - b[1]);
        const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
          // Aligned placements should not check their opposite crossAxis
          // side.
          getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
        const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
        if (resetPlacement !== placement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: resetPlacement
            }
          };
        }
        return {};
      }
    };
  };

  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }

  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[main], overflow[cross]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some(side => overflow[side] >= 0);
  }
  /**
   * Provides data to hide the floating element in applicable situations, such as
   * when it is not in the same clipping context as the reference element.
   * @see https://floating-ui.com/docs/hide
   */
  const hide = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'hide',
      options,
      async fn(state) {
        const {
          rects
        } = state;
        const {
          strategy = 'referenceHidden',
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default:
          {
            return {};
          }
        }
      }
    };
  };

  function getBoundingRect(rects) {
    const minX = min(...rects.map(rect => rect.left));
    const minY = min(...rects.map(rect => rect.top));
    const maxX = max(...rects.map(rect => rect.right));
    const maxY = max(...rects.map(rect => rect.bottom));
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  function getRectsByLine(rects) {
    const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
    const groups = [];
    let prevRect = null;
    for (let i = 0; i < sortedRects.length; i++) {
      const rect = sortedRects[i];
      if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
        groups.push([rect]);
      } else {
        groups[groups.length - 1].push(rect);
      }
      prevRect = rect;
    }
    return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
  }
  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'inline',
      options,
      async fn(state) {
        const {
          placement,
          elements,
          rects,
          platform,
          strategy
        } = state;
        // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.
        const {
          padding = 2,
          x,
          y
        } = evaluate(options, state);
        const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
        const clientRects = getRectsByLine(nativeClientRects);
        const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
        const paddingObject = getSideObjectFromPadding(padding);
        function getBoundingClientRect() {
          // There are two rects and they are disjoined.
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            // Find the first rect in which the point is fully inside.
            return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
          }

          // There are 2 or more connected rects.
          if (clientRects.length >= 2) {
            if (getMainAxisFromPlacement(placement) === 'x') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
            const isLeftSide = getSide(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          return fallback;
        }
        const resetRects = await platform.getElementRects({
          reference: {
            getBoundingClientRect
          },
          floating: elements.floating,
          strategy
        });
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
        return {};
      }
    };
  };

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getMainAxisFromPlacement(placement) === 'x';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        const {
          x,
          y
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
    };
  };

  function getCrossAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getSide(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  /**
   * Built-in `limiter` that will stop `shift()` at a certain point.
   */
  const limitShift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const mainAxis = getMainAxisFromPlacement(placement);
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset, state);
        const computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === 'y' ? 'height' : 'width';
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === 'y' ? 'width' : 'height';
          const isOriginSide = ['top', 'left'].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'size',
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform,
          elements
        } = state;
        const {
          apply = () => {},
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const axis = getMainAxisFromPlacement(placement);
        const isXAxis = axis === 'x';
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === 'top' || side === 'bottom') {
          heightSide = side;
          widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
        } else {
          widthSide = side;
          heightSide = alignment === 'end' ? 'top' : 'bottom';
        }
        const overflowAvailableHeight = height - overflow[heightSide];
        const overflowAvailableWidth = width - overflow[widthSide];
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (isXAxis) {
          const maximumClippingWidth = width - overflow.left - overflow.right;
          availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
        } else {
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isXAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  exports.arrow = arrow;
  exports.autoPlacement = autoPlacement;
  exports.computePosition = computePosition;
  exports.detectOverflow = detectOverflow;
  exports.flip = flip;
  exports.hide = hide;
  exports.inline = inline;
  exports.limitShift = limitShift;
  exports.offset = offset;
  exports.rectToClientRect = rectToClientRect;
  exports.shift = shift;
  exports.size = size;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/core'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIDOM = {}, global.FloatingUICore));
})(this, (function (exports, core) { 'use strict';

  function getWindow(node) {
    var _node$ownerDocument;
    return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }

  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isShadowRoot(node) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const safari = isSafari();
    const css = getComputedStyle$1(element);

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || !safari && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !safari && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function isSafari() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createEmptyCoords = v => ({
    x: v,
    y: v
  });

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createEmptyCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createEmptyCoords(0);
  function getVisualOffsets(element, isFixed, floatingOffsetParent) {
    var _win$visualViewport, _win$visualViewport2;
    if (isFixed === void 0) {
      isFixed = true;
    }
    if (!isSafari()) {
      return noOffsets;
    }
    const win = element ? getWindow(element) : window;
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== win) {
      return noOffsets;
    }
    return {
      x: ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0,
      y: ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0
    };
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createEmptyCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = getVisualOffsets(domElement, isFixedStrategy, offsetParent);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return core.rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }

  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createEmptyCoords(1);
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot ||
      // DOM Element detected.
      node.parentNode ||
      // ShadowRoot detected.
      isShadowRoot(node) && node.host ||
      // Fallback.
      getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }

  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }

  function getOverflowAncestors(node, list) {
    var _node$ownerDocument;
    if (list === void 0) {
      list = [];
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isSafari();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createEmptyCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return core.rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    return getCssDimensions(element);
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const window = getWindow(element);
    if (!isHTMLElement(element)) {
      return window;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
    return offsetParent || getContainingBlock(element) || window;
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  const platform = {
    getClippingRect,
    convertOffsetParentRelativeRectToViewportRelativeRect,
    isElement,
    getDimensions,
    getOffsetParent,
    getDocumentElement,
    getScale,
    async getElementRects(_ref) {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
        floating: {
          x: 0,
          y: 0,
          ...(await getDimensionsFn(floating))
        }
      };
    },
    getClientRects: element => Array.from(element.getClientRects()),
    isRTL: element => getComputedStyle$1(element).direction === 'rtl'
  };

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      let isFirstUpdate = true;
      io = new IntersectionObserver(entries => {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (ratio === 0) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }, {
        rootMargin,
        threshold
      });
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = true,
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(update);
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return core.computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  Object.defineProperty(exports, 'arrow', {
    enumerable: true,
    get: function () { return core.arrow; }
  });
  Object.defineProperty(exports, 'autoPlacement', {
    enumerable: true,
    get: function () { return core.autoPlacement; }
  });
  Object.defineProperty(exports, 'detectOverflow', {
    enumerable: true,
    get: function () { return core.detectOverflow; }
  });
  Object.defineProperty(exports, 'flip', {
    enumerable: true,
    get: function () { return core.flip; }
  });
  Object.defineProperty(exports, 'hide', {
    enumerable: true,
    get: function () { return core.hide; }
  });
  Object.defineProperty(exports, 'inline', {
    enumerable: true,
    get: function () { return core.inline; }
  });
  Object.defineProperty(exports, 'limitShift', {
    enumerable: true,
    get: function () { return core.limitShift; }
  });
  Object.defineProperty(exports, 'offset', {
    enumerable: true,
    get: function () { return core.offset; }
  });
  Object.defineProperty(exports, 'shift', {
    enumerable: true,
    get: function () { return core.shift; }
  });
  Object.defineProperty(exports, 'size', {
    enumerable: true,
    get: function () { return core.size; }
  });
  exports.autoUpdate = autoUpdate;
  exports.computePosition = computePosition;
  exports.getOverflowAncestors = getOverflowAncestors;
  exports.platform = platform;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
((Drupal,once,_ref)=>{let {computePosition,offset,shift,flip}=_ref;Drupal.theme.ginTooltipWrapper=(dataset,title)=>`<div class="gin-tooltip ${dataset.drupalTooltipClass||""}">\n      ${dataset.drupalTooltip||title}\n    </div>`,Drupal.behaviors.ginTooltip={attach:(context)=>{Drupal.ginTooltip.init(context);}},Drupal.ginTooltip={init:function(context){once("ginTooltipInit","[data-gin-tooltip]",context).forEach(((trigger)=>{const title=trigger.title;title&&(trigger.title=""),trigger.insertAdjacentHTML("afterend",Drupal.theme.ginTooltipWrapper(trigger.dataset,title));const tooltip=trigger.nextElementSibling,updatePosition=()=>{this.computePosition(trigger,tooltip);};new ResizeObserver(updatePosition).observe(trigger),new MutationObserver(updatePosition).observe(trigger,{attributes:!0,childList:!0,subtree:!0}),trigger.addEventListener("mouseover",updatePosition),trigger.addEventListener("focus",updatePosition);}));},computePosition:function(trigger,tooltip){let placement=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom-end";computePosition(trigger,tooltip,{strategy:"absolute",placement:trigger.dataset.drupalTooltipPosition||placement,middleware:[flip({padding:16}),offset(6),shift({padding:16})]}).then(((_ref2)=>{let {x,y}=_ref2;Object.assign(tooltip.style,{"inset-inline-start":`${x}px`,"inset-block-start":`${y}px`});}));}};})(Drupal,once,FloatingUIDOM);;
(function($,Drupal,debounce){const cache={right:0,left:0,bottom:0,top:0};const cssVarPrefix='--drupal-displace-offset';const documentStyle=document.documentElement.style;const offsetKeys=Object.keys(cache);const offsetProps={};offsetKeys.forEach((edge)=>{offsetProps[edge]={enumerable:true,get(){return cache[edge];},set(value){if(value!==cache[edge])documentStyle.setProperty(`${cssVarPrefix}-${edge}`,`${value}px`);cache[edge]=value;}};});const offsets=Object.seal(Object.defineProperties({},offsetProps));function getRawOffset(el,edge){const $el=$(el);const documentElement=document.documentElement;let displacement=0;const horizontal=edge==='left'||edge==='right';let placement=$el.offset()[horizontal?'left':'top'];placement-=window[`scroll${horizontal?'X':'Y'}`]||document.documentElement[`scroll${horizontal?'Left':'Top'}`]||0;switch(edge){case 'top':displacement=placement+$el.outerHeight();break;case 'left':displacement=placement+$el.outerWidth();break;case 'bottom':displacement=documentElement.clientHeight-placement;break;case 'right':displacement=documentElement.clientWidth-placement;break;default:displacement=0;}return displacement;}function calculateOffset(edge){let edgeOffset=0;const displacingElements=document.querySelectorAll(`[data-offset-${edge}]`);const n=displacingElements.length;for(let i=0;i<n;i++){const el=displacingElements[i];if(el.style.display==='none')continue;let displacement=parseInt(el.getAttribute(`data-offset-${edge}`),10);if(isNaN(displacement))displacement=getRawOffset(el,edge);edgeOffset=Math.max(edgeOffset,displacement);}return edgeOffset;}function displace(broadcast=true){const newOffsets={};offsetKeys.forEach((edge)=>{newOffsets[edge]=calculateOffset(edge);});offsetKeys.forEach((edge)=>{offsets[edge]=newOffsets[edge];});if(broadcast)$(document).trigger('drupalViewportOffsetChange',offsets);return offsets;}Drupal.behaviors.drupalDisplace={attach(){if(this.displaceProcessed)return;this.displaceProcessed=true;$(window).on('resize.drupalDisplace',debounce(displace,200));}};Drupal.displace=displace;Object.defineProperty(Drupal.displace,'offsets',{value:offsets,writable:false});Drupal.displace.calculateOffset=calculateOffset;})(jQuery,Drupal,Drupal.debounce);;
((Drupal)=>{Drupal.behaviors.ginSticky={attach:(context)=>{once("ginSticky",".region-sticky-watcher").forEach((()=>{const observer=new IntersectionObserver(((_ref)=>{let [e]=_ref;const regionSticky=context.querySelector(".region-sticky");regionSticky.classList.toggle("region-sticky--is-sticky",e.intersectionRatio<1),regionSticky.toggleAttribute("data-offset-top",e.intersectionRatio<1),Drupal.displace(!0);}),{threshold:[1]}),element=context.querySelector(".region-sticky-watcher");element&&observer.observe(element);}));}};})(Drupal);;
((Drupal,once)=>{Drupal.behaviors.ginTableHeader={attach:(context)=>{Drupal.ginTableHeader.init(context);}},Drupal.ginTableHeader={init:function(context){once("ginTableHeaderSticky","table.position-sticky, table.sticky-header",context).forEach(((el)=>{this.updateTableHeader(el),this.showTableHeaderOnInit(),new ResizeObserver((()=>{Drupal.debounce(this.updateTableHeader(el),150);})).observe(el),document.querySelectorAll('.gin--sticky-bulk-select > input[type="checkbox"]').forEach(((checkbox)=>{checkbox.addEventListener("click",((event)=>{event.stopImmediatePropagation(),event.checked=!event.checked,document.querySelector(".gin-table-scroll-wrapper table.sticky-enabled thead .select-all > input, .gin-table-scroll-wrapper table.sticky-header thead .select-all > input").click();}));}));}));},showTableHeaderOnInit:function(){const tableHeader=document.querySelector(".gin--sticky-table-header");tableHeader&&(tableHeader.hidden=!1,tableHeader.style.display="block",tableHeader.style.visibility="visible",document.body.style.overflowX="hidden");},updateTableHeader:function(el){const tableHeader=document.querySelector(".gin--sticky-table-header");if(!tableHeader)return;const offset=el.classList.contains("sticky-enabled")?-7:1;tableHeader.style.marginBottom=`-${el.querySelector("thead").getBoundingClientRect().height+offset}px`,el.classList.add("--is-processed"),tableHeader.querySelectorAll("thead th").forEach(((th,index)=>{th.style.width=`${el.querySelectorAll("thead th")[index].getBoundingClientRect().width}px`;}));}};})(Drupal,once);;
(function($,window,Drupal,once){Drupal.behaviors.blockSettingsSummary={attach(){if(typeof $.fn.drupalSetSummary==='undefined')return;function checkboxesSummary(context){const values=[];const $checkboxes=$(context).find('input[type="checkbox"]:checked + label');const il=$checkboxes.length;for(let i=0;i<il;i++)values.push($($checkboxes[i]).html());if(!values.length)values.push(Drupal.t('Not restricted'));return values.join(', ');}$('[data-drupal-selector="edit-visibility-node-type"], [data-drupal-selector="edit-visibility-entity-bundlenode"], [data-drupal-selector="edit-visibility-language"], [data-drupal-selector="edit-visibility-user-role"], [data-drupal-selector="edit-visibility-response-status"]').drupalSetSummary(checkboxesSummary);$('[data-drupal-selector="edit-visibility-request-path"]').drupalSetSummary((context)=>{const $pages=$(context).find('textarea[name="visibility[request_path][pages]"]');if(!$pages.length||!$pages[0].value)return Drupal.t('Not restricted');return Drupal.t('Restricted to certain pages');});}};Drupal.behaviors.blockDrag={attach(context,settings){if(typeof Drupal.tableDrag==='undefined'||typeof Drupal.tableDrag.blocks==='undefined')return;function checkEmptyRegions(table,rowObject){table.find('tr.region-message').each(function(){const $this=$(this);if($this.prev('tr').get(0)===rowObject.element)if(rowObject.method!=='keyboard'||rowObject.direction==='down')rowObject.swap('after',this);if($this.next('tr').length===0||!$this.next('tr')[0].matches('.draggable'))$this.removeClass('region-populated').addClass('region-empty');else{if(this.matches('.region-empty'))$this.removeClass('region-empty').addClass('region-populated');}});}function updateLastPlaced(table,rowObject){table.find('.color-success').removeClass('color-success');const $rowObject=$(rowObject);if(!rowObject.element.matches('.drag-previous')){table.find('.drag-previous').removeClass('drag-previous');$rowObject.addClass('drag-previous');}}function updateBlockWeights(table,region){let weight=-Math.round(table.find('.draggable').length/2);table.find(`.region-${region}-message`).nextUntil('.region-title').find('select.block-weight').each(function(){this.value=++weight;});}const table=$('#blocks');const tableDrag=Drupal.tableDrag.blocks;tableDrag.row.prototype.onSwap=function(swappedRow){checkEmptyRegions(table,this);updateLastPlaced(table,this);};tableDrag.onDrop=function(){const dragObject=this;const $rowElement=$(dragObject.rowObject.element);const regionRow=$rowElement.prevAll('tr.region-message').get(0);const regionName=regionRow.className.replace(/([^ ]+[ ]+)*region-([^ ]+)-message([ ]+[^ ]+)*/,'$2');const regionField=$rowElement.find('select.block-region-select');if(regionField.find(`option[value=${regionName}]`).length===0){window.alert(Drupal.t('The block cannot be placed in this region.'));regionField.trigger('change');}if(!regionField[0].matches(`.block-region-${regionName}`)){const weightField=$rowElement.find('select.block-weight');const oldRegionName=weightField[0].className.replace(/([^ ]+[ ]+)*block-weight-([^ ]+)([ ]+[^ ]+)*/,'$2');regionField.removeClass(`block-region-${oldRegionName}`).addClass(`block-region-${regionName}`);weightField.removeClass(`block-weight-${oldRegionName}`).addClass(`block-weight-${regionName}`);regionField[0].value=regionName;}updateBlockWeights(table,regionName);};$(once('block-region-select','select.block-region-select',context)).on('change',function(event){const row=$(this).closest('tr');const select=$(this);tableDrag.rowObject=new tableDrag.row(row[0]);const regionMessage=table.find(`.region-${select[0].value}-message`);const regionItems=regionMessage.nextUntil('.region-message, .region-title');if(regionItems.length)regionItems.last().after(row);else regionMessage.after(row);updateBlockWeights(table,select[0].value);checkEmptyRegions(table,tableDrag.rowObject);updateLastPlaced(table,tableDrag.rowObject);if(!tableDrag.changed){$(Drupal.theme('tableDragChangedWarning')).insertBefore(tableDrag.table).hide().fadeIn('slow');tableDrag.changed=true;}select.trigger('blur');});}};})(jQuery,window,Drupal,once);;
(($)=>{let cachedScrollbarWidth=null;const {max,abs}=Math;const regexHorizontal=/left|center|right/;const regexVertical=/top|center|bottom/;const regexOffset=/[+-]\d+(\.[\d]+)?%?/;const regexPosition=/^\w+/;const _position=$.fn.position;function getOffsets(offsets,width,height){return [parseFloat(offsets[0])*(typeof offsets[0]==='string'&&offsets[0].endsWith('%')?width/100:1),parseFloat(offsets[1])*(typeof offsets[1]==='string'&&offsets[1].endsWith('%')?height/100:1)];}function parseCss(element,property){return parseInt(window.getComputedStyle(element)[property],10)||0;}function getDimensions(elem){const raw=elem[0];if(raw.nodeType===9)return {width:elem.width(),height:elem.height(),offset:{top:0,left:0}};if(!!raw&&raw===raw.window)return {width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}};if(raw.preventDefault)return {width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}};return {width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()};}const collisions={fit:{left(position,data){const {within}=data;const withinOffset=within.isWindow?within.scrollLeft:within.offset.left;const outerWidth=within.width;const collisionPosLeft=position.left-data.collisionPosition.marginLeft;const overLeft=withinOffset-collisionPosLeft;const overRight=collisionPosLeft+data.collisionWidth-outerWidth-withinOffset;let newOverRight;if(data.collisionWidth>outerWidth)if(overLeft>0&&overRight<=0){newOverRight=position.left+overLeft+data.collisionWidth-outerWidth-withinOffset;position.left+=overLeft-newOverRight;}else if(overRight>0&&overLeft<=0)position.left=withinOffset;else if(overLeft>overRight)position.left=withinOffset+outerWidth-data.collisionWidth;else position.left=withinOffset;else if(overLeft>0)position.left+=overLeft;else if(overRight>0)position.left-=overRight;else position.left=max(position.left-collisionPosLeft,position.left);},top(position,data){const {within}=data;const withinOffset=within.isWindow?within.scrollTop:within.offset.top;const outerHeight=data.within.height;const collisionPosTop=position.top-data.collisionPosition.marginTop;const overTop=withinOffset-collisionPosTop;const overBottom=collisionPosTop+data.collisionHeight-outerHeight-withinOffset;let newOverBottom;if(data.collisionHeight>outerHeight)if(overTop>0&&overBottom<=0){newOverBottom=position.top+overTop+data.collisionHeight-outerHeight-withinOffset;position.top+=overTop-newOverBottom;}else if(overBottom>0&&overTop<=0)position.top=withinOffset;else if(overTop>overBottom)position.top=withinOffset+outerHeight-data.collisionHeight;else position.top=withinOffset;else if(overTop>0)position.top+=overTop;else if(overBottom>0)position.top-=overBottom;else position.top=max(position.top-collisionPosTop,position.top);}},flip:{left(position,data){const {within}=data;const withinOffset=within.offset.left+within.scrollLeft;const outerWidth=within.width;const offsetLeft=within.isWindow?within.scrollLeft:within.offset.left;const collisionPosLeft=position.left-data.collisionPosition.marginLeft;const overLeft=collisionPosLeft-offsetLeft;const overRight=collisionPosLeft+data.collisionWidth-outerWidth-offsetLeft;const myOffset=data.my[0]==='left'?-data.elemWidth:data.my[0]==='right'?data.elemWidth:0;const atOffset=data.at[0]==='left'?data.targetWidth:data.at[0]==='right'?-data.targetWidth:0;const offset=-2*data.offset[0];let newOverRight;let newOverLeft;if(overLeft<0){newOverRight=position.left+myOffset+atOffset+offset+data.collisionWidth-outerWidth-withinOffset;if(newOverRight<0||newOverRight<abs(overLeft))position.left+=myOffset+atOffset+offset;}else{if(overRight>0){newOverLeft=position.left-data.collisionPosition.marginLeft+myOffset+atOffset+offset-offsetLeft;if(newOverLeft>0||abs(newOverLeft)<overRight)position.left+=myOffset+atOffset+offset;}}},top(position,data){const {within}=data;const withinOffset=within.offset.top+within.scrollTop;const outerHeight=within.height;const offsetTop=within.isWindow?within.scrollTop:within.offset.top;const collisionPosTop=position.top-data.collisionPosition.marginTop;const overTop=collisionPosTop-offsetTop;const overBottom=collisionPosTop+data.collisionHeight-outerHeight-offsetTop;const top=data.my[1]==='top';const myOffset=top?-data.elemHeight:data.my[1]==='bottom'?data.elemHeight:0;const atOffset=data.at[1]==='top'?data.targetHeight:data.at[1]==='bottom'?-data.targetHeight:0;const offset=-2*data.offset[1];let newOverTop;let newOverBottom;if(overTop<0){newOverBottom=position.top+myOffset+atOffset+offset+data.collisionHeight-outerHeight-withinOffset;if(newOverBottom<0||newOverBottom<abs(overTop))position.top+=myOffset+atOffset+offset;}else{if(overBottom>0){newOverTop=position.top-data.collisionPosition.marginTop+myOffset+atOffset+offset-offsetTop;if(newOverTop>0||abs(newOverTop)<overBottom)position.top+=myOffset+atOffset+offset;}}}},flipfit:{left(...args){collisions.flip.left.apply(this,args);collisions.fit.left.apply(this,args);},top(...args){collisions.flip.top.apply(this,args);collisions.fit.top.apply(this,args);}}};$.position={scrollbarWidth(){if(cachedScrollbarWidth!==undefined)return cachedScrollbarWidth;const div=$('<div '+"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>"+"<div style='height:100px;width:auto;'></div></div>");const innerDiv=div.children()[0];$('body').append(div);const w1=innerDiv.offsetWidth;div[0].style.overflow='scroll';let w2=innerDiv.offsetWidth;if(w1===w2)w2=div[0].clientWidth;div.remove();cachedScrollbarWidth=w1-w2;return cachedScrollbarWidth;},getScrollInfo(within){const overflowX=within.isWindow||within.isDocument?'':window.getComputedStyle(within.element[0])['overflow-x'];const overflowY=within.isWindow||within.isDocument?'':window.getComputedStyle(within.element[0])['overflow-y'];const hasOverflowX=overflowX==='scroll'||(overflowX==='auto'&&within.width<within.element[0].scrollWidth);const hasOverflowY=overflowY==='scroll'||(overflowY==='auto'&&within.height<within.element[0].scrollHeight);return {width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0};},getWithinInfo(element){const withinElement=$(element||window);const isWindow=!!withinElement[0]&&withinElement[0]===withinElement[0].window;const isDocument=!!withinElement[0]&&withinElement[0].nodeType===9;const hasOffset=!isWindow&&!isDocument;return {element:withinElement,isWindow,isDocument,offset:hasOffset?$(element).offset():{left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:withinElement.outerWidth(),height:withinElement.outerHeight()};}};$.fn.position=function(options){if(!options||!options.of)return _position.apply(this,arguments);options=$.extend({},options);const within=$.position.getWithinInfo(options.within);const scrollInfo=$.position.getScrollInfo(within);const collision=(options.collision||'flip').split(' ');const offsets={};const target=typeof options.of==='string'?$(document).find(options.of):$(options.of);const dimensions=getDimensions(target);const targetWidth=dimensions.width;const targetHeight=dimensions.height;const targetOffset=dimensions.offset;if(target[0].preventDefault)options.at='left top';const basePosition=$.extend({},targetOffset);$.each(['my','at'],function(){let pos=(options[this]||'').split(' ');if(pos.length===1)pos=regexHorizontal.test(pos[0])?pos.concat(['center']):regexVertical.test(pos[0])?['center'].concat(pos):['center','center'];pos[0]=regexHorizontal.test(pos[0])?pos[0]:'center';pos[1]=regexVertical.test(pos[1])?pos[1]:'center';const horizontalOffset=regexOffset.exec(pos[0]);const verticalOffset=regexOffset.exec(pos[1]);offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];options[this]=[regexPosition.exec(pos[0])[0],regexPosition.exec(pos[1])[0]];});if(collision.length===1)collision[1]=collision[0];if(options.at[0]==='right')basePosition.left+=targetWidth;else{if(options.at[0]==='center')basePosition.left+=targetWidth/2;}if(options.at[1]==='bottom')basePosition.top+=targetHeight;else{if(options.at[1]==='center')basePosition.top+=targetHeight/2;}const atOffset=getOffsets(offsets.at,targetWidth,targetHeight);basePosition.left+=atOffset[0];basePosition.top+=atOffset[1];return this.each(function(){let using;const elem=$(this);const elemWidth=elem.outerWidth();const elemHeight=elem.outerHeight();const marginLeft=parseCss(this,'marginLeft');const marginTop=parseCss(this,'marginTop');const collisionWidth=elemWidth+marginLeft+parseCss(this,'marginRight')+scrollInfo.width;const collisionHeight=elemHeight+marginTop+parseCss(this,'marginBottom')+scrollInfo.height;const position=$.extend({},basePosition);const myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());if(options.my[0]==='right')position.left-=elemWidth;else{if(options.my[0]==='center')position.left-=elemWidth/2;}if(options.my[1]==='bottom')position.top-=elemHeight;else{if(options.my[1]==='center')position.top-=elemHeight/2;}position.left+=myOffset[0];position.top+=myOffset[1];const collisionPosition={marginLeft,marginTop};$.each(['left','top'],function(i,dir){if(collisions[collision[i]])collisions[collision[i]][dir](position,{targetWidth,targetHeight,elemWidth,elemHeight,collisionPosition,collisionWidth,collisionHeight,offset:[atOffset[0]+myOffset[0],atOffset[1]+myOffset[1]],my:options.my,at:options.at,within,elem});});if(options.using)using=function(props){const left=targetOffset.left-position.left;const right=left+targetWidth-elemWidth;const top=targetOffset.top-position.top;const bottom=top+targetHeight-elemHeight;const feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right<0?'left':left>0?'right':'center',vertical:bottom<0?'top':top>0?'bottom':'middle'};if(targetWidth<elemWidth&&abs(left+right)<targetWidth)feedback.horizontal='center';if(targetHeight<elemHeight&&abs(top+bottom)<targetHeight)feedback.vertical='middle';if(max(abs(left),abs(right))>max(abs(top),abs(bottom)))feedback.important='horizontal';else feedback.important='vertical';options.using.call(this,props,feedback);};elem.offset($.extend(position,{using}));});};if(!$.hasOwnProperty('ui'))$.ui={};$.ui.position=collisions;})(jQuery);;
(function($,Drupal,once){if(once('drupal-dialog-deprecation-listener','html').length){const eventSpecial={handle($event){const $element=$($event.target);const event=$event.originalEvent;const dialog=event.dialog;const dialogArguments=[$event,dialog,$element,event?.settings];$event.handleObj.handler.apply(this,dialogArguments);}};$.event.special['dialog:beforecreate']=eventSpecial;$.event.special['dialog:aftercreate']=eventSpecial;$.event.special['dialog:beforeclose']=eventSpecial;$.event.special['dialog:afterclose']=eventSpecial;const listenDialogEvent=(event)=>{const windowEvents=$._data(window,'events');const isWindowHasDialogListener=windowEvents[event.type];if(isWindowHasDialogListener)Drupal.deprecationError({message:`jQuery event ${event.type} is deprecated in 10.3.0 and is removed from Drupal:12.0.0. See https://www.drupal.org/node/3422670`});};['dialog:beforecreate','dialog:aftercreate','dialog:beforeclose','dialog:afterclose'].forEach((e)=>window.addEventListener(e,listenDialogEvent));}})(jQuery,Drupal,once);;
class DrupalDialogEvent extends Event{constructor(type,dialog,settings=null){super(`dialog:${type}`,{bubbles:true});this.dialog=dialog;this.settings=settings;}}(function($,Drupal,drupalSettings,bodyScrollLock){drupalSettings.dialog={autoOpen:true,buttonClass:'button',buttonPrimaryClass:'button--primary',close(event){Drupal.dialog(event.target).close();Drupal.detachBehaviors(event.target,null,'unload');}};Drupal.dialog=function(element,options){let undef;const $element=$(element);const domElement=$element.get(0);const dialog={open:false,returnValue:undef};function openDialog(settings){settings=$.extend({},drupalSettings.dialog,options,settings);if(settings.dialogClass)Drupal.deprecationError({message:'dialogClass is deprecated in drupal:10.4.x and will be removed from drupal:12.0.0.'});const event=new DrupalDialogEvent('beforecreate',dialog,settings);domElement.dispatchEvent(event);$element.dialog(event.settings);dialog.open=true;if(event.settings.modal)bodyScrollLock.lock(domElement);domElement.dispatchEvent(new DrupalDialogEvent('aftercreate',dialog,event.settings));}function closeDialog(value){domElement.dispatchEvent(new DrupalDialogEvent('beforeclose',dialog));bodyScrollLock.clearBodyLocks();$element.dialog('close');dialog.returnValue=value;dialog.open=false;domElement.dispatchEvent(new DrupalDialogEvent('afterclose',dialog));}dialog.show=()=>{openDialog({modal:false});};dialog.showModal=()=>{openDialog({modal:true});};dialog.close=closeDialog;return dialog;};})(jQuery,Drupal,drupalSettings,bodyScrollLock);;
(function($,Drupal,drupalSettings,debounce,displace){drupalSettings.dialog=$.extend({autoResize:true,maxHeight:'95%'},drupalSettings.dialog);function resetPosition(options){const offsets=displace.offsets;const left=offsets.left-offsets.right;const top=offsets.top-offsets.bottom;const leftString=`${(left>0?'+':'-')+Math.abs(Math.round(left/2))}px`;const topString=`${(top>0?'+':'-')+Math.abs(Math.round(top/2))}px`;options.position={my:`center${left!==0?leftString:''} center${top!==0?topString:''}`,of:window};return options;}function resetSize(event){const positionOptions=['width','height','minWidth','minHeight','maxHeight','maxWidth','position'];let adjustedOptions={};let windowHeight=$(window).height();let option;let optionValue;let adjustedValue;for(let n=0;n<positionOptions.length;n++){option=positionOptions[n];optionValue=event.data.settings[option];if(optionValue)if(typeof optionValue==='string'&&optionValue.endsWith('%')&&/height/i.test(option)){windowHeight-=displace.offsets.top+displace.offsets.bottom;adjustedValue=parseInt(0.01*parseInt(optionValue,10)*windowHeight,10);if(option==='height'&&event.data.$element.parent().outerHeight()<adjustedValue)adjustedValue='auto';adjustedOptions[option]=adjustedValue;}}if(!event.data.settings.modal)adjustedOptions=resetPosition(adjustedOptions);event.data.$element.dialog('option',adjustedOptions);event.data.$element?.get(0)?.dispatchEvent(new CustomEvent('dialogContentResize',{bubbles:true}));}window.addEventListener('dialog:aftercreate',(e)=>{const autoResize=debounce(resetSize,20);const $element=$(e.target);const {settings}=e;const eventData={settings,$element};if(settings.autoResize===true||settings.autoResize==='true'){const uiDialog=$element.dialog('option',{resizable:false,draggable:false}).dialog('widget');uiDialog[0].style.position='fixed';$(window).on('resize.dialogResize scroll.dialogResize',eventData,autoResize).trigger('resize.dialogResize');$(document).on('drupalViewportOffsetChange.dialogResize',eventData,autoResize);}});window.addEventListener('dialog:beforeclose',()=>{$(window).off('.dialogResize');$(document).off('.dialogResize');});})(jQuery,Drupal,drupalSettings,Drupal.debounce,Drupal.displace);;
(function($,{tabbable,isTabbable}){$.widget('ui.dialog',$.ui.dialog,{options:{buttonClass:'button',buttonPrimaryClass:'button--primary'},_createButtons(){const opts=this.options;let primaryIndex;let index;const il=opts.buttons.length;for(index=0;index<il;index++)if(opts.buttons[index].primary&&opts.buttons[index].primary===true){primaryIndex=index;delete opts.buttons[index].primary;break;}this._super();const $buttons=this.uiButtonSet.children().addClass(opts.buttonClass);if(typeof primaryIndex!=='undefined')$buttons.eq(index).addClass(opts.buttonPrimaryClass);},_createWrapper(){this.uiDialog=$('<div>').hide().attr({tabIndex:-1,role:'dialog','aria-modal':this.options.modal?'true':null}).appendTo(this._appendTo());this._addClass(this.uiDialog,'ui-dialog','ui-widget ui-widget-content ui-front');this._on(this.uiDialog,{keydown(event){if(this.options.closeOnEscape&&!event.isDefaultPrevented()&&event.keyCode&&event.keyCode===$.ui.keyCode.ESCAPE){event.preventDefault();this.close(event);return;}if(event.keyCode!==$.ui.keyCode.TAB||event.isDefaultPrevented())return;const tabbableElements=tabbable(this.uiDialog[0]);if(tabbableElements.length){const first=tabbableElements[0];const last=tabbableElements[tabbableElements.length-1];if((event.target===last||event.target===this.uiDialog[0])&&!event.shiftKey){this._delay(function(){$(first).trigger('focus');});event.preventDefault();}else{if((event.target===first||event.target===this.uiDialog[0])&&event.shiftKey){this._delay(function(){$(last).trigger('focus');});event.preventDefault();}}}},mousedown(event){if(this._moveToTop(event))this._focusTabbable();}});if(!this.element.find('[aria-describedby]').length)this.uiDialog.attr({'aria-describedby':this.element.uniqueId().attr('id')});},_focusTabbable(){let hasFocus=this._focusedElement?this._focusedElement.get(0):null;if(!hasFocus)hasFocus=this.element.find('[autofocus]').get(0);if(!hasFocus){const $elements=[this.element,this.uiDialogButtonPane];for(let i=0;i<$elements.length;i++){const element=$elements[i].get(0);if(element){const elementTabbable=tabbable(element);hasFocus=elementTabbable.length?elementTabbable[0]:null;}if(hasFocus)break;}}if(!hasFocus){const closeBtn=this.uiDialogTitlebarClose.get(0);hasFocus=closeBtn&&isTabbable(closeBtn)?closeBtn:null;}if(!hasFocus)hasFocus=this.uiDialog.get(0);$(hasFocus).eq(0).trigger('focus');}});})(jQuery,window.tabbable);;
(($)=>{$.widget('ui.dialog',$.ui.dialog,{_allowInteraction(event){if(event.target.classList===undefined)return this._super(event);return event.target.classList.contains('ck')||this._super(event);}});})(jQuery);;
(function($,Drupal,{focusable}){Drupal.behaviors.dialog={attach(context,settings){const $context=$(context);if(!$('#drupal-modal').length)$('<div id="drupal-modal" class="ui-front"></div>').hide().appendTo('body');const $dialog=$context.closest('.ui-dialog-content');if($dialog.length){if($dialog.dialog('option','drupalAutoButtons'))$dialog.trigger('dialogButtonsChange');setTimeout(function(){if(!$dialog[0].contains(document.activeElement)){$dialog.dialog('instance')._focusedElement=null;$dialog.dialog('instance')._focusTabbable();}},0);}const originalClose=settings.dialog.close;settings.dialog.close=function(event,...args){originalClose.apply(settings.dialog,[event,...args]);const $element=$(event.target);const ajaxContainer=$element.data('uiDialog')?$element.data('uiDialog').opener.closest('[data-drupal-ajax-container]'):[];if(ajaxContainer.length&&(document.activeElement===document.body||$(document.activeElement).not(':visible'))){const focusableChildren=focusable(ajaxContainer[0]);if(focusableChildren.length>0)setTimeout(()=>{focusableChildren[0].focus();},0);}$(event.target).remove();};},prepareDialogButtons($dialog){const buttons=[];const $buttons=$dialog.find('.form-actions input[type=submit], .form-actions a.button, .form-actions a.action-link');$buttons.each(function(){const $originalButton=$(this);this.style.display='none';buttons.push({text:$originalButton.html()||$originalButton.attr('value'),class:$originalButton.attr('class'),'data-once':$originalButton.data('once'),click(e){if($originalButton[0].tagName==='A')$originalButton[0].click();else $originalButton.trigger('mousedown').trigger('mouseup').trigger('click');e.preventDefault();}});});return buttons;}};Drupal.AjaxCommands.prototype.openDialog=function(ajax,response,status){if(!response.selector)return false;let $dialog=$(response.selector);if(!$dialog.length)$dialog=$(`<div id="${response.selector.replace(/^#/,'')}" class="ui-front"></div>`).appendTo('body');if(!ajax.wrapper)ajax.wrapper=$dialog.attr('id');response.command='insert';response.method='html';ajax.commands.insert(ajax,response,status);response.dialogOptions=response.dialogOptions||{};if(typeof response.dialogOptions.drupalAutoButtons==='undefined')response.dialogOptions.drupalAutoButtons=true;else if(response.dialogOptions.drupalAutoButtons==='false')response.dialogOptions.drupalAutoButtons=false;else response.dialogOptions.drupalAutoButtons=!!response.dialogOptions.drupalAutoButtons;if(!response.dialogOptions.buttons&&response.dialogOptions.drupalAutoButtons)response.dialogOptions.buttons=Drupal.behaviors.dialog.prepareDialogButtons($dialog);$dialog.on('dialogButtonsChange',()=>{const buttons=Drupal.behaviors.dialog.prepareDialogButtons($dialog);$dialog.dialog('option','buttons',buttons);});response.dialogOptions=response.dialogOptions||{};const dialog=Drupal.dialog($dialog.get(0),response.dialogOptions);if(response.dialogOptions.modal)dialog.showModal();else dialog.show();$dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions');};Drupal.AjaxCommands.prototype.closeDialog=function(ajax,response,status){const $dialog=$(response.selector);if($dialog.length){Drupal.dialog($dialog.get(0)).close();if(!response.persist)$dialog.remove();}$dialog.off('dialogButtonsChange');};Drupal.AjaxCommands.prototype.setDialogOption=function(ajax,response,status){const $dialog=$(response.selector);if($dialog.length)$dialog.dialog('option',response.optionName,response.optionValue);};window.addEventListener('dialog:aftercreate',(event)=>{const $element=$(event.target);const dialog=event.dialog;$element.on('click.dialog','.dialog-cancel',(e)=>{dialog.close('cancel');e.preventDefault();e.stopPropagation();});});window.addEventListener('dialog:beforeclose',(e)=>{const $element=$(e.target);$element.off('.dialog');});Drupal.AjaxCommands.prototype.openModalDialogWithUrl=function(ajax,response){const dialogOptions=response.dialogOptions||{};const elementSettings={progress:{type:'throbber'},dialogType:'modal',dialog:dialogOptions,url:response.url,httpMethod:'GET'};Drupal.ajax(elementSettings).execute();};})(jQuery,Drupal,window.tabbable);;
(($,Drupal)=>{Drupal.behaviors.claroTableDrag={attach(context,settings){const createItemWrapBoundaries=(row)=>{const $row=$(row);const $firstCell=$row.find('td:first-of-type').eq(0).wrapInner(Drupal.theme('tableDragCellContentWrapper')).wrapInner($(Drupal.theme('tableDragCellItemsWrapper')).addClass('js-tabledrag-cell-content'));const $targetElem=$firstCell.find('.js-tabledrag-cell-content');$targetElem.eq(0).find('> .tabledrag-cell-content__item > .js-tabledrag-handle, > .tabledrag-cell-content__item > .js-indentation').prependTo($targetElem);};Object.keys(settings.tableDrag||{}).forEach((base)=>{once('claroTabledrag',$(context).find(`#${base}`).find('> tr.draggable, > tbody > tr.draggable')).forEach(createItemWrapBoundaries);});}};$.extend(Drupal.tableDrag.prototype.row.prototype,{markChanged(){const marker=$(Drupal.theme('tableDragChangedMarker')).addClass('js-tabledrag-changed-marker');const cell=$(this.element).find('td:first-of-type');if(cell.find('.js-tabledrag-changed-marker').length===0)cell.find('.js-tabledrag-handle').after(marker);Drupal.tableDrag[this.table.id].changedRowIds.add(this.element.id);},onIndent(){$(this.table).find('.tabledrag-cell > .js-indentation').each((index,indentToMove)=>{const $indentToMove=$(indentToMove);const $cellContent=$indentToMove.siblings('.tabledrag-cell-content');$indentToMove.prependTo($cellContent);});}});$.extend(Drupal.theme,{tableDragIndentation(){return '<div class="js-indentation indentation"><svg xmlns="http://www.w3.org/2000/svg" class="tree" width="25" height="25" viewBox="0 0 25 25"><path class="tree__item tree__item-child-ltr tree__item-child-last-ltr tree__item-horizontal tree__item-horizontal-right" d="M12,12.5 H25" stroke="#888"/><path class="tree__item tree__item-child-rtl tree__item-child-last-rtl tree__item-horizontal tree__horizontal-left" d="M0,12.5 H13" stroke="#888"/><path class="tree__item tree__item-child-ltr tree__item-child-rtl tree__item-child-last-ltr tree__item-child-last-rtl tree__vertical tree__vertical-top" d="M12.5,12 v-99" stroke="#888"/><path class="tree__item tree__item-child-ltr tree__item-child-rtl tree__vertical tree__vertical-bottom" d="M12.5,12 v99" stroke="#888"/></svg></div>';},tableDragChangedWarning(){return `<div class="tabledrag-changed-warning messages messages--warning" role="alert">${Drupal.theme('tableDragChangedMarker')} ${Drupal.t('You have unsaved changes.')}</div>`;},tableDragHandle:(dragOrientation='drag')=>{const title=dragOrientation==='drag-y'?Drupal.t('Change order'):Drupal.t('Move in any direction');return `<a href="#" title="${title}" class="tabledrag-handle js-tabledrag-handle"></a>`;},tableDragToggle:()=>`<div class="tabledrag-toggle-weight-wrapper" data-drupal-selector="tabledrag-toggle-weight-wrapper">
            <button type="button" class="link action-link tabledrag-toggle-weight" data-drupal-selector="tabledrag-toggle-weight"></button>
            </div>`,toggleButtonContent:(show)=>{const classes=['action-link','action-link--extrasmall','tabledrag-toggle-weight'];let text='';if(show){classes.push('action-link--icon-hide');text=Drupal.t('Hide row weights');}else{classes.push('action-link--icon-show');text=Drupal.t('Show row weights');}return `<span class="${classes.join(' ')}">${text}</a>`;},tableDragCellContentWrapper(){return '<div class="tabledrag-cell-content__item"></div>';},tableDragCellItemsWrapper(){return '<div class="tabledrag-cell-content"></div>';}});})(jQuery,Drupal);;
(function($,Drupal,debounce,once){Drupal.behaviors.blockFilterByText={attach(context,settings){const $input=$(once('block-filter-text','input.block-filter-text'));const $table=$($input.attr('data-element'));let $filterRows;function filterBlockList(e){const query=e.target.value.toLowerCase();function toggleBlockEntry(index,label){const $row=$(label).parent().parent();const textMatch=label.textContent.toLowerCase().includes(query);$row.toggle(textMatch);}if(query.length>=2){$filterRows.each(toggleBlockEntry);Drupal.announce(Drupal.formatPlural($table.find('tr:visible').length-1,'1 block is available in the modified list.','@count blocks are available in the modified list.'));}else $filterRows.each(function(index){$(this).parent().parent().show();});}if($table.length){$filterRows=$table.find('div.block-filter-text-source');$input.on('keyup',debounce(filterBlockList,200));}}};Drupal.behaviors.blockHighlightPlacement={attach(context,settings){if(settings.blockPlacement&&$('.js-block-placed').length)once('block-highlight','[data-drupal-selector="edit-blocks"]',context).forEach((container)=>{const $container=$(container);window.scrollTo({top:$('.js-block-placed').offset().top-$container.offset().top+$container.scrollTop(),behavior:'smooth'});});}};})(jQuery,Drupal,Drupal.debounce,once);;
(function($,Drupal,window){function TableResponsive(table){this.table=table;this.$table=$(table);this.showText=Drupal.t('Show all columns');this.hideText=Drupal.t('Hide lower priority columns');this.$headers=this.$table.find('th');this.$link=$('<button type="button" class="link tableresponsive-toggle"></button>').attr('title',Drupal.t('Show table cells that were hidden to make the table fit within a small screen.')).on('click',this.eventhandlerToggleColumns.bind(this));this.$table.before($('<div class="tableresponsive-toggle-columns"></div>').append(this.$link));$(window).on('resize.tableresponsive',this.eventhandlerEvaluateColumnVisibility.bind(this)).trigger('resize.tableresponsive');}Drupal.behaviors.tableResponsive={attach(context,settings){once('tableresponsive','table.responsive-enabled',context).forEach((table)=>{TableResponsive.tables.push(new TableResponsive(table));});}};$.extend(TableResponsive,{tables:[]});$.extend(TableResponsive.prototype,{eventhandlerEvaluateColumnVisibility(e){const pegged=parseInt(this.$link.data('pegged'),10);const hiddenLength=this.$headers.filter('.priority-medium:hidden, .priority-low:hidden').length;if(hiddenLength>0){this.$link.show();this.$link[0].textContent=this.showText;}if(!pegged&&hiddenLength===0){this.$link.hide();this.$link[0].textContent=this.hideText;}},eventhandlerToggleColumns(e){e.preventDefault();const self=this;const $hiddenHeaders=this.$headers.filter('.priority-medium:hidden, .priority-low:hidden');this.$revealedCells=this.$revealedCells||$();if($hiddenHeaders.length>0){$hiddenHeaders.each(function(index,element){const $header=$(this);const position=$header.prevAll('th').length;self.$table.find('tbody tr').each(function(){const $cells=$(this).find('td').eq(position);$cells.show();self.$revealedCells=$().add(self.$revealedCells).add($cells);});$header.show();self.$revealedCells=$().add(self.$revealedCells).add($header);});this.$link[0].textContent=this.hideText;this.$link.data('pegged',1);}else{this.$revealedCells.hide();this.$revealedCells.each(function(index,element){const $cell=$(this);const properties=$cell.attr('style').split(';');const newProps=[];const match=/^display\s*:\s*none$/;for(let i=0;i<properties.length;i++){const prop=properties[i];prop.trim();const isDisplayNone=match.exec(prop);if(isDisplayNone)continue;newProps.push(prop);}$cell.attr('style',newProps.join(';'));});this.$link[0].textContent=this.showText;this.$link.data('pegged',0);$(window).trigger('resize.tableresponsive');}}});Drupal.TableResponsive=TableResponsive;})(jQuery,Drupal,window);;
(function($,Drupal){function DropButton(dropbutton,settings){const options=$.extend({title:Drupal.t('List additional actions')},settings);const $dropbutton=$(dropbutton);this.$dropbutton=$dropbutton;this.$list=$dropbutton.find('.dropbutton');this.$actions=this.$list.find('li').addClass('dropbutton-action');if(this.$actions.length>1){const $primary=this.$actions.slice(0,1);const $secondary=this.$actions.slice(1);$secondary.addClass('secondary-action');$primary.after(Drupal.theme('dropbuttonToggle',options));this.$dropbutton.addClass('dropbutton-multiple').on({'mouseleave.dropbutton':this.hoverOut.bind(this),'mouseenter.dropbutton':this.hoverIn.bind(this),'focusout.dropbutton':this.focusOut.bind(this),'focusin.dropbutton':this.focusIn.bind(this)});}else this.$dropbutton.addClass('dropbutton-single');}function dropbuttonClickHandler(e){e.preventDefault();$(e.target).closest('.dropbutton-wrapper').toggleClass('open');}Drupal.behaviors.dropButton={attach(context,settings){const dropbuttons=once('dropbutton','.dropbutton-wrapper',context);if(dropbuttons.length){const body=once('dropbutton-click','body');if(body.length)$(body).on('click','.dropbutton-toggle',dropbuttonClickHandler);dropbuttons.forEach((dropbutton)=>{DropButton.dropbuttons.push(new DropButton(dropbutton,settings.dropbutton));});}}};$.extend(DropButton,{dropbuttons:[]});$.extend(DropButton.prototype,{toggle(show){const isBool=typeof show==='boolean';show=isBool?show:!this.$dropbutton.hasClass('open');this.$dropbutton.toggleClass('open',show);},hoverIn(){if(this.timerID)window.clearTimeout(this.timerID);},hoverOut(){this.timerID=window.setTimeout(this.close.bind(this),500);},open(){this.toggle(true);},close(){this.toggle(false);},focusOut(e){this.hoverOut.call(this,e);},focusIn(e){this.hoverIn.call(this,e);}});$.extend(Drupal.theme,{dropbuttonToggle(options){return `<li class="dropbutton-toggle"><button type="button"><span class="dropbutton-arrow"><span class="visually-hidden">${options.title}</span></span></button></li>`;}});Drupal.DropButton=DropButton;})(jQuery,Drupal);;
((Drupal)=>{Drupal.theme.dropbuttonToggle=(options)=>`<li class="dropbutton-toggle"><button type="button" class="dropbutton__toggle"><span class="visually-hidden">${options.title}</span></button></li>`;})(Drupal);;
((Drupal,once)=>{Drupal.behaviors.ginDropbutton={attach:function(context){once("ginDropbutton",".dropbutton-multiple:has(.dropbutton--gin)",context).forEach(((el)=>{el.querySelector(".dropbutton__toggle").addEventListener("click",(()=>{this.updatePosition(el),window.addEventListener("scroll",(()=>Drupal.debounce(this.updatePositionIfOpen(el),100))),window.addEventListener("resize",(()=>Drupal.debounce(this.updatePositionIfOpen(el),100)));}));}));},updatePosition:function(el){const preferredDir=document.documentElement.dir??"ltr",secondaryAction=el.querySelector(".secondary-action"),dropMenu=el.querySelector(".dropbutton__items"),toggleHeight=el.offsetHeight,dropMenuWidth=dropMenu.offsetWidth,dropMenuHeight=dropMenu.offsetHeight,boundingRect=secondaryAction.getBoundingClientRect(),spaceBelow=window.innerHeight-boundingRect.bottom,spaceLeft=boundingRect.left,spaceRight=window.innerWidth-boundingRect.right;dropMenu.style.position="fixed";const leftAlignStyles={left:`${boundingRect.left}px`,right:"auto"},rightAlignStyles={left:"auto",right:window.innerWidth-boundingRect.right+"px"};"ltr"===preferredDir?spaceRight>=dropMenuWidth?Object.assign(dropMenu.style,leftAlignStyles):Object.assign(dropMenu.style,rightAlignStyles):spaceLeft>=dropMenuWidth?Object.assign(dropMenu.style,rightAlignStyles):Object.assign(dropMenu.style,leftAlignStyles),dropMenu.style.top=spaceBelow>=dropMenuHeight?`${boundingRect.bottom}px`:boundingRect.top-toggleHeight-dropMenuHeight+"px";},updatePositionIfOpen:function(el){el.classList.contains("open")&&this.updatePosition(el);}};})(Drupal,once);;
(($,Drupal)=>{function init(tab){const $tab=$(tab);const $target=$tab.find('[data-drupal-nav-tabs-target]');const $active=$target.find('.js-active-tab');const openMenu=()=>{$target.toggleClass('is-open');$target.find('button').attr('aria-expanded',$target.hasClass('is-open'));};const toggleOrder=(reset)=>{const current=$active.index();const original=$active.data('original-order');if(original===0||reset===(current===original))return;const siblings={first:'[data-original-order="0"]',previous:`[data-original-order="${original-1}"]`};const $first=$target.find(siblings.first);const $previous=$target.find(siblings.previous);if(reset&&current!==original)$active.insertAfter($previous);else{if(!reset&&current===original)$active.insertBefore($first);}};const toggleCollapsed=({matches})=>{if(matches){if($tab.hasClass('is-horizontal')&&!$tab.attr('data-width')){let width=0;$target.find('.js-tabs-link').each((index,value)=>{width+=$(value).outerWidth();});$tab.attr('data-width',width);}const isHorizontal=$tab.attr('data-width')<=$tab.outerWidth();$tab.toggleClass('is-horizontal',isHorizontal);$tab.find('button').attr('aria-expanded',null);toggleOrder(isHorizontal);}else{toggleOrder(false);$tab.find('button').attr('aria-expanded','false');}};$tab.addClass('position-container is-horizontal-enabled');$target.find('.js-tab').each((index,element)=>{const $item=$(element);$item.attr('data-original-order',$item.index());});$tab.on('click.tabs','[data-drupal-nav-tabs-trigger]',openMenu);const mql=window.matchMedia('(min-width: 48em)');mql.addEventListener('change',toggleCollapsed);toggleCollapsed(mql);}Drupal.behaviors.navTabs={attach(context){once('nav-tabs','[data-drupal-nav-tabs].is-collapsible',context).forEach(init);}};})(jQuery,Drupal);;
(function($,Drupal,drupalSettings){let activeItem=Drupal.url(drupalSettings.path.currentPath);$.fn.drupalToolbarMenuHorizontal=function(){let currentPath=drupalSettings.path.currentPath;const menu=once('toolbar-menu-horizontal',this);if(menu.length){const $menu=$(menu);if(activeItem){const count=currentPath.split('/').length;for(let i=0;i<count;i++){const $menuItem=$menu.find(`a[data-drupal-link-system-path="${currentPath}"]`);if($menuItem.length!==0){$menuItem.closest('a').addClass('is-active');break;}const lastIndex=currentPath.lastIndexOf('/');currentPath=currentPath.slice(0,lastIndex);}}}};$.fn.drupalToolbarMenu=function(){const ui={handleOpen:Drupal.t('Extend'),handleClose:Drupal.t('Collapse')};function toggleList($item,switcher){const $toggle=$item.children('.toolbar-box').children('.toolbar-handle');switcher=typeof switcher!=='undefined'?switcher:!$item.hasClass('open');$item.toggleClass('open',switcher);$toggle.toggleClass('open',switcher);$toggle.find('.action').each((index,element)=>{element.textContent=switcher?ui.handleClose:ui.handleOpen;});}function toggleClickHandler(event){const $toggle=$(event.target);const $item=$toggle.closest('li');toggleList($item);const $openItems=$item.siblings().filter('.open');toggleList($openItems,false);}function linkClickHandler(event){if(!Drupal.toolbar.models.toolbarModel.get('isFixed'))Drupal.toolbar.models.toolbarModel.set('activeTab',null);event.stopPropagation();}function initItems($menu){const options={class:'toolbar-icon toolbar-handle',action:ui.handleOpen,text:''};$menu.find('li > a').wrap('<div class="toolbar-box">');$menu.find('li').each((index,element)=>{const $item=$(element);if($item.children('ul.toolbar-menu').length){const $box=$item.children('.toolbar-box');const $link=$box.find('a');options.text=Drupal.t('@label',{'@label':$link.length?$link[0].textContent:''});$item.children('.toolbar-box').append($(Drupal.theme('toolbarMenuItemToggle',options)).hide().fadeIn(150));}});}function markListLevels($lists,level){level=!level?1:level;const $lis=$lists.children('li').addClass(`level-${level}`);$lists=$lis.children('ul');if($lists.length)markListLevels($lists,level+1);}function openActiveItem($menu){let currentPath=drupalSettings.path.currentPath;const pathItem=$menu.find(`a[href="${window.location.pathname}"]`);if(pathItem.length&&!activeItem)activeItem=window.location.pathname;if(activeItem){const $activeItem=$menu.find(`a[href="${activeItem}"]`).addClass('menu-item--active');if(pathItem.length===0&&activeItem){const count=currentPath.split('/').length;for(let i=0;i<count;i++){const $menuItem=$menu.find(`a[data-drupal-link-system-path="${currentPath}"]`);if($menuItem.length!==0){const $activeTrail=$menuItem.parentsUntil('.root','li').addClass('menu-item--active-trail');toggleList($activeTrail,true);break;}const lastIndex=currentPath.lastIndexOf('/');currentPath=currentPath.slice(0,lastIndex);}}else{const $activeTrail=$activeItem.parentsUntil('.root','li').addClass('menu-item--active-trail');toggleList($activeTrail,true);}}}return this.each(function(selector){const menu=once('toolbar-menu-vertical',this);if(menu.length){const $menu=$(menu);$menu.on('click.toolbar','.toolbar-box',toggleClickHandler).on('click.toolbar','.toolbar-box a',linkClickHandler);$menu.addClass('root');initItems($menu);markListLevels($menu);openActiveItem($menu);}});};Drupal.theme.toolbarMenuItemToggle=function(options){return `<button class="${options.class}"><span class="action">${options.action}</span> <span class="label">${options.text}</span></button>`;};})(jQuery,Drupal,drupalSettings);;
(function($,Drupal,drupalSettings){(()=>{if(!sessionStorage.getItem('Drupal.toolbar.toolbarState'))return;const toolbarState=JSON.parse(sessionStorage.getItem('Drupal.toolbar.toolbarState'));const {activeTray,orientation,isOriented}=toolbarState;const activeTrayElement=document.querySelector(`.toolbar-tray[data-toolbar-tray="${activeTray}"]`);const activeTrayToggle=document.querySelector(`.toolbar-item[data-toolbar-tray="${activeTray}"]`);if(activeTrayElement){activeTrayElement.classList.add(`toolbar-tray-${orientation}`,'is-active');activeTrayToggle.classList.add('is-active');}if(isOriented)document.querySelector('#toolbar-administration').classList.add('toolbar-oriented');})();const options=$.extend({breakpoints:{'toolbar.narrow':'','toolbar.standard':'','toolbar.wide':''}},drupalSettings.toolbar,{strings:{horizontal:Drupal.t('Horizontal orientation'),vertical:Drupal.t('Vertical orientation')}});Drupal.behaviors.toolbar={attach(context){if(!window.matchMedia('only screen').matches)return;once('toolbar','#toolbar-administration',context).forEach((toolbar)=>{const model=new Drupal.toolbar.ToolbarModel({locked:JSON.parse(localStorage.getItem('Drupal.toolbar.trayVerticalLocked')),activeTab:document.getElementById(JSON.parse(localStorage.getItem('Drupal.toolbar.activeTabID'))),height:$('#toolbar-administration').outerHeight()});Drupal.toolbar.models.toolbarModel=model;Object.keys(options.breakpoints).forEach((label)=>{const mq=options.breakpoints[label];const mql=window.matchMedia(mq);Drupal.toolbar.mql[label]=mql;mql.addListener(Drupal.toolbar.mediaQueryChangeHandler.bind(null,model,label));Drupal.toolbar.mediaQueryChangeHandler.call(null,model,label,mql);});Drupal.toolbar.views.toolbarVisualView=new Drupal.toolbar.ToolbarVisualView({el:toolbar,model,strings:options.strings});Drupal.toolbar.views.toolbarAuralView=new Drupal.toolbar.ToolbarAuralView({el:toolbar,model,strings:options.strings});Drupal.toolbar.views.bodyVisualView=new Drupal.toolbar.BodyVisualView({el:toolbar,model});model.trigger('change:isFixed',model,model.get('isFixed'));model.trigger('change:activeTray',model,model.get('activeTray'));const menuModel=new Drupal.toolbar.MenuModel();Drupal.toolbar.models.menuModel=menuModel;Drupal.toolbar.views.menuVisualView=new Drupal.toolbar.MenuVisualView({el:$(toolbar).find('.toolbar-menu-administration').get(0),model:menuModel,strings:options.strings});Drupal.toolbar.setSubtrees.done((subtrees)=>{menuModel.set('subtrees',subtrees);const theme=drupalSettings.ajaxPageState.theme;localStorage.setItem(`Drupal.toolbar.subtrees.${theme}`,JSON.stringify(subtrees));model.set('areSubtreesLoaded',true);});Drupal.toolbar.views.toolbarVisualView.loadSubtrees();$(document).on('drupalViewportOffsetChange.toolbar',(event,offsets)=>{model.set('offsets',offsets);});model.on('change:orientation',(model,orientation)=>{$(document).trigger('drupalToolbarOrientationChange',orientation);}).on('change:activeTab',(model,tab)=>{$(document).trigger('drupalToolbarTabChange',tab);}).on('change:activeTray',(model,tray)=>{$(document).trigger('drupalToolbarTrayChange',tray);});const toolbarState=sessionStorage.getItem('Drupal.toolbar.toolbarState')?JSON.parse(sessionStorage.getItem('Drupal.toolbar.toolbarState')):{};if(Drupal.toolbar.models.toolbarModel.get('orientation')==='horizontal'&&Drupal.toolbar.models.toolbarModel.get('activeTab')===null&&!toolbarState.orientation)Drupal.toolbar.models.toolbarModel.set({activeTab:$('.toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a').get(0)});window.addEventListener('dialog:aftercreate',(e)=>{const $element=$(e.target);const {settings}=e;const toolbarBar=document.getElementById('toolbar-bar');if(toolbarBar){toolbarBar.style.marginTop='0';if(settings.drupalOffCanvasPosition==='top'){const height=Drupal.offCanvas.getContainer($element).outerHeight();toolbarBar.style.marginTop=`${height}px`;$element.on('dialogContentResize.off-canvas',()=>{const newHeight=Drupal.offCanvas.getContainer($element).outerHeight();toolbarBar.style.marginTop=`${newHeight}px`;});}}});window.addEventListener('dialog:beforeclose',()=>{const toolbarBar=document.getElementById('toolbar-bar');if(toolbarBar)toolbarBar.style.marginTop='0';});});if(once('toolbarAntiFlicker','#toolbar-administration',context).length)Drupal.toolbar.models.toolbarModel.on('change:activeTab change:orientation change:isOriented change:isTrayToggleVisible change:offsets',function(){const userButton=document.querySelector('#toolbar-item-user');const hasActiveTab=!!$(this.get('activeTab')).length>0;const previousToolbarState=sessionStorage.getItem('Drupal.toolbar.toolbarState')?JSON.parse(sessionStorage.getItem('Drupal.toolbar.toolbarState')):{};const toolbarState={...previousToolbarState,orientation:Drupal.toolbar.models.toolbarModel.get('orientation'),hasActiveTab,activeTabId:hasActiveTab?this.get('activeTab').id:null,activeTray:$(this.get('activeTab')).attr('data-toolbar-tray'),isOriented:this.get('isOriented'),isFixed:this.get('isFixed'),userButtonMinWidth:userButton?userButton.clientWidth:0};sessionStorage.setItem('Drupal.toolbar.toolbarState',JSON.stringify(toolbarState));});}};Drupal.toolbar={views:{},models:{},mql:{},setSubtrees:new $.Deferred(),mediaQueryChangeHandler(model,label,mql){switch(label){case 'toolbar.narrow':model.set({isOriented:mql.matches,isTrayToggleVisible:false});if(!mql.matches||!model.get('orientation'))model.set({orientation:'vertical'},{validate:true});break;case 'toolbar.standard':model.set({isFixed:mql.matches});break;case 'toolbar.wide':model.set({orientation:mql.matches&&!model.get('locked')?'horizontal':'vertical'},{validate:true});model.set({isTrayToggleVisible:mql.matches});break;default:break;}}};Drupal.theme.toolbarOrientationToggle=function(){return ('<div class="toolbar-toggle-orientation"><div class="toolbar-lining">'+'<button class="toolbar-icon" type="button"></button>'+'</div></div>');};Drupal.AjaxCommands.prototype.setToolbarSubtrees=function(ajax,response,status){Drupal.toolbar.setSubtrees.resolve(response.subtrees);};})(jQuery,Drupal,drupalSettings);;
(function(Backbone,Drupal){Drupal.toolbar.MenuModel=Backbone.Model.extend({defaults:{subtrees:null}});})(Backbone,Drupal);;
(function(Backbone,Drupal){Drupal.toolbar.ToolbarModel=Backbone.Model.extend({defaults:{activeTab:null,activeTray:null,isOriented:false,isFixed:false,areSubtreesLoaded:false,isViewportOverflowConstrained:false,orientation:'horizontal',locked:false,isTrayToggleVisible:true,height:null,offsets:{top:0,right:0,bottom:0,left:0}},validate(attributes,options){if(attributes.orientation==='horizontal'&&this.get('locked')&&!options.override)return Drupal.t('The toolbar cannot be set to a horizontal orientation when it is locked.');}});})(Backbone,Drupal);;
(function($,Drupal,Backbone){Drupal.toolbar.BodyVisualView=Backbone.View.extend({initialize(){this.listenTo(this.model,'change:activeTray ',this.render);this.listenTo(this.model,'change:isFixed change:isViewportOverflowConstrained',this.isToolbarFixed);},isToolbarFixed(){const isViewportOverflowConstrained=this.model.get('isViewportOverflowConstrained');$('body').toggleClass('toolbar-fixed',isViewportOverflowConstrained||this.model.get('isFixed'));},render(){$('body').toggleClass('toolbar-tray-open',!!this.model.get('activeTray'));}});})(jQuery,Drupal,Backbone);;
(function($,Backbone,Drupal){Drupal.toolbar.MenuVisualView=Backbone.View.extend({initialize(){this.listenTo(this.model,'change:subtrees',this.render);this.render();},render(){this.renderVertical();this.renderHorizontal();},renderHorizontal(){if('drupalToolbarMenu' in $.fn)this.$el.children('.toolbar-menu').drupalToolbarMenuHorizontal();},renderVertical(){const subtrees=this.model.get('subtrees');if(!this.model.get('subtrees'))return;Object.keys(subtrees||{}).forEach((id)=>{$(once('toolbar-subtrees',this.$el.find(`#toolbar-link-${id}`))).after(subtrees[id]);});if('drupalToolbarMenu' in $.fn)this.$el.children('.toolbar-menu').drupalToolbarMenu();}});})(jQuery,Backbone,Drupal);;
(function(Backbone,Drupal){Drupal.toolbar.ToolbarAuralView=Backbone.View.extend({initialize(options){this.strings=options.strings;this.listenTo(this.model,'change:orientation',this.onOrientationChange);this.listenTo(this.model,'change:activeTray',this.onActiveTrayChange);},onOrientationChange(model,orientation){Drupal.announce(Drupal.t('Tray orientation changed to @orientation.',{'@orientation':orientation}));},onActiveTrayChange(model,tray){const relevantTray=tray===null?model.previous('activeTray'):tray;if(!relevantTray)return;const action=tray===null?Drupal.t('closed'):Drupal.t('opened');const trayNameElement=relevantTray.querySelector('.toolbar-tray-name');let text;if(trayNameElement!==null)text=Drupal.t('Tray "@tray" @action.',{'@tray':trayNameElement.textContent,'@action':action});else text=Drupal.t('Tray @action.',{'@action':action});Drupal.announce(text);}});})(Backbone,Drupal);;
(function($,Drupal,drupalSettings,Backbone){Drupal.toolbar.ToolbarVisualView=Backbone.View.extend({events(){const touchEndToClick=function(event){event.preventDefault();event.target.click();};return {'click .toolbar-bar .toolbar-tab .trigger':'onTabClick','click .toolbar-toggle-orientation button':'onOrientationToggleClick','touchend .toolbar-bar .toolbar-tab .trigger':touchEndToClick,'touchend .toolbar-toggle-orientation button':touchEndToClick};},initialize(options){this.strings=options.strings;this.listenTo(this.model,'change:activeTab change:orientation change:isOriented change:isTrayToggleVisible',this.render);this.listenTo(this.model,'change:mqMatches',this.onMediaQueryChange);this.listenTo(this.model,'change:offsets',this.adjustPlacement);this.listenTo(this.model,'change:activeTab change:orientation change:isOriented',this.updateToolbarHeight);this.$el.find('.toolbar-tray .toolbar-lining').has('.toolbar-menu').append(Drupal.theme('toolbarOrientationToggle'));this.model.trigger('change:activeTab');},updateToolbarHeight(){const toolbarTabOuterHeight=$('#toolbar-bar').find('.toolbar-tab').outerHeight()||0;const toolbarTrayHorizontalOuterHeight=$('.is-active.toolbar-tray-horizontal').outerHeight()||0;this.model.set('height',toolbarTabOuterHeight+toolbarTrayHorizontalOuterHeight);$('body')[0].style.paddingTop=`${this.model.get('height')}px`;$('html')[0].style.scrollPaddingTop=`${this.model.get('height')}px`;this.triggerDisplace();},triggerDisplace(){_.defer(()=>{Drupal.displace(true);});},render(){this.updateTabs();this.updateTrayOrientation();this.updateBarAttributes();$('[data-toolbar-anti-flicker-loading]').remove();$('html').removeClass(['toolbar-loading','toolbar-horizontal','toolbar-vertical','toolbar-tray-open','toolbar-fixed','toolbar-oriented','toolbar-anti-flicker']);$('body').removeClass('toolbar-loading');if(this.model.changed.orientation==='vertical'||this.model.changed.activeTab)this.loadSubtrees();return this;},onTabClick(event){if(event.currentTarget.hasAttribute('data-toolbar-tray')){const activeTab=this.model.get('activeTab');const clickedTab=event.currentTarget;this.model.set('activeTab',!activeTab||clickedTab!==activeTab?clickedTab:null);event.preventDefault();event.stopPropagation();}},onOrientationToggleClick(event){const orientation=this.model.get('orientation');const antiOrientation=orientation==='vertical'?'horizontal':'vertical';const locked=antiOrientation==='vertical';if(locked)localStorage.setItem('Drupal.toolbar.trayVerticalLocked','true');else localStorage.removeItem('Drupal.toolbar.trayVerticalLocked');this.model.set({locked,orientation:antiOrientation},{validate:true,override:true});event.preventDefault();event.stopPropagation();},updateTabs(){const $tab=$(this.model.get('activeTab'));$(this.model.previous('activeTab')).removeClass('is-active').prop('aria-pressed',false);$(this.model.previous('activeTray')).removeClass('is-active');localStorage.removeItem('Drupal.toolbar.activeTabID');if($tab.length>0){$tab.addClass('is-active').prop('aria-pressed',true);const name=$tab.attr('data-toolbar-tray');const id=$tab.get(0).id;if(id)localStorage.setItem('Drupal.toolbar.activeTabID',JSON.stringify(id));const $tray=this.$el.find(`[data-toolbar-tray="${name}"].toolbar-tray`);if($tray.length){$tray.addClass('is-active');this.model.set('activeTray',$tray.get(0));}else this.model.set('activeTray',null);}else{this.model.set('activeTray',null);localStorage.removeItem('Drupal.toolbar.activeTabID');}},updateBarAttributes(){const isOriented=this.model.get('isOriented');if(isOriented)this.$el.find('.toolbar-bar').attr('data-offset-top','');else this.$el.find('.toolbar-bar').removeAttr('data-offset-top');this.$el.toggleClass('toolbar-oriented',isOriented);},updateTrayOrientation(){const orientation=this.model.get('orientation');const antiOrientation=orientation==='vertical'?'horizontal':'vertical';$('body').toggleClass('toolbar-vertical',orientation==='vertical').toggleClass('toolbar-horizontal',orientation==='horizontal');const removeClass=antiOrientation==='horizontal'?'toolbar-tray-horizontal':'toolbar-tray-vertical';const $trays=this.$el.find('.toolbar-tray').removeClass(removeClass).addClass(`toolbar-tray-${orientation}`);const iconClass=`toolbar-icon-toggle-${orientation}`;const iconAntiClass=`toolbar-icon-toggle-${antiOrientation}`;const $orientationToggle=this.$el.find('.toolbar-toggle-orientation').toggle(this.model.get('isTrayToggleVisible'));const $orientationToggleButton=$orientationToggle.find('button');$orientationToggleButton[0].value=antiOrientation;$orientationToggleButton.attr('title',this.strings[antiOrientation]).removeClass(iconClass).addClass(iconAntiClass);$orientationToggleButton[0].textContent=this.strings[antiOrientation];const dir=document.documentElement.dir;const edge=dir==='rtl'?'right':'left';$trays.removeAttr('data-offset-left data-offset-right data-offset-top');$trays.filter('.toolbar-tray-vertical.is-active').attr(`data-offset-${edge}`,'');$trays.filter('.toolbar-tray-horizontal.is-active').attr('data-offset-top','');},adjustPlacement(){const $trays=this.$el.find('.toolbar-tray');if(!this.model.get('isOriented'))$trays.removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');},loadSubtrees(){const $activeTab=$(this.model.get('activeTab'));const orientation=this.model.get('orientation');if(!this.model.get('areSubtreesLoaded')&&typeof $activeTab.data('drupal-subtrees')!=='undefined'&&orientation==='vertical'){const subtreesHash=drupalSettings.toolbar.subtreesHash;const theme=drupalSettings.ajaxPageState.theme;const endpoint=Drupal.url(`toolbar/subtrees/${subtreesHash}`);const cachedSubtreesHash=localStorage.getItem(`Drupal.toolbar.subtreesHash.${theme}`);const cachedSubtrees=JSON.parse(localStorage.getItem(`Drupal.toolbar.subtrees.${theme}`));const isVertical=this.model.get('orientation')==='vertical';if(isVertical&&subtreesHash===cachedSubtreesHash&&cachedSubtrees)Drupal.toolbar.setSubtrees.resolve(cachedSubtrees);else{if(isVertical){localStorage.removeItem(`Drupal.toolbar.subtreesHash.${theme}`);localStorage.removeItem(`Drupal.toolbar.subtrees.${theme}`);Drupal.ajax({url:endpoint}).execute();localStorage.setItem(`Drupal.toolbar.subtreesHash.${theme}`,subtreesHash);}}}}});})(jQuery,Drupal,drupalSettings,Backbone);;
(($,Drupal,once)=>{Drupal.behaviors.claroAutoCompete={attach(context){once('claroAutoComplete','input.form-autocomplete',context).forEach((value)=>{const $input=$(value);const classRemove=($autoCompleteElem)=>{$autoCompleteElem.removeClass('is-autocompleting');$autoCompleteElem.siblings('[data-drupal-selector="autocomplete-message"]').addClass('hidden');};$input.autocomplete({search(event){const result=Drupal.autocomplete.options.search(event);if(result){$(event.target).addClass('is-autocompleting');$(event.target).siblings('[data-drupal-selector="autocomplete-message"]').removeClass('hidden');}return result;},response(event){classRemove($(event.target));}});});}};})(jQuery,Drupal,once);;
(function($,Drupal){'use strict';Drupal.behaviors.adminToolbarSearch={extraFetched:false,attach:function(context){if(context!=document)return;var $self=this;const elements=once('admin-toolbar-search','#toolbar-bar',context);$(elements).each(function(){$self.links=[];var $searchTab=$(this).find('#admin-toolbar-search-tab');var $searchInput=$searchTab.find('#admin-toolbar-search-input');if($searchInput.length===0)return;$searchInput.autocomplete({minLength:2,position:{collision:'fit'},source:function(request,response){var data=$self.handleAutocomplete(request.term);if(!$self.extraFetched&&drupalSettings.adminToolbarSearch.loadExtraLinks)$.getJSON(Drupal.url('admin/admin-toolbar-search'),function(data){$(data).each(function(){var item=this;item.label=this.labelRaw+' '+this.value;$self.links.push(item);});$self.extraFetched=true;var results=$self.handleAutocomplete(request.term);response(results);});else response(data);},open:function(){var zIndex=$('#toolbar-item-administration-tray').css('z-index')+1;$(this).autocomplete('widget').css('z-index',zIndex);return false;},select:function(event,ui){if(ui.item.value){location.href=ui.item.value;return false;}}}).data('ui-autocomplete')._renderItem=(function(ul,item){ul.addClass('admin-toolbar-search-autocomplete-list');return $('<li>').append('<div ><a href="'+item.value+'">'+item.labelRaw+' <span class="admin-toolbar-search-url">'+item.value+'</span></a></div>').appendTo(ul);});$searchInput.focus(function(){Drupal.behaviors.adminToolbarSearch.populateLinks($self);});$('#admin-toolbar-mobile-search-tab .toolbar-item',context).click(function(e){e.preventDefault();$(this).toggleClass('is-active');$searchTab.toggleClass('visible');$searchInput.focus();});});},getItemLabel:function(item){var breadcrumbs=[];$(item).parents().each(function(){if($(this).hasClass('menu-item')){var $link=$(this).find('a:first');if($link.length&&!$link.hasClass('admin-toolbar-search-ignore'))breadcrumbs.unshift($link.text());}});return breadcrumbs.join(' > ');},handleAutocomplete:function(term){var $self=this;var keywords=term.split(" ");var suggestions=[];$self.links.forEach(function(element){var label=element.label.toLowerCase();if(label.indexOf(term.toLowerCase())>=0)suggestions.push(element);else{var matchCount=0;keywords.forEach(function(keyword){if(label.indexOf(keyword.toLowerCase())>=0)matchCount++;});if(matchCount==keywords.length)suggestions.push(element);}});return suggestions;},populateLinks:function($self){if($self.links.length===0){var getUrl=window.location;var baseUrl=getUrl.protocol+"//"+getUrl.host+"/";$('.toolbar-tray a[data-drupal-link-system-path]').each(function(){if(this.href!==baseUrl){var label=$self.getItemLabel(this);$self.links.push({'value':this.href,'label':label+' '+this.href,'labelRaw':Drupal.checkPlain(label)});}});}}};})(jQuery,Drupal);;
(function($,Drupal,{tabbable,isTabbable}){function TabbingManager(){this.stack=[];}function TabbingContext(options){$.extend(this,{level:null,$tabbableElements:$(),$disabledElements:$(),released:false,active:false,trapFocus:false},options);}$.extend(TabbingManager.prototype,{constrain(elements,{trapFocus=false}={}){const il=this.stack.length;for(let i=0;i<il;i++)this.stack[i].deactivate();let tabbableElements=[];$(elements).each((index,rootElement)=>{tabbableElements=[...tabbableElements,...tabbable(rootElement)];if(isTabbable(rootElement))tabbableElements=[...tabbableElements,rootElement];});const tabbingContext=new TabbingContext({level:this.stack.length,$tabbableElements:$(tabbableElements),trapFocus});this.stack.push(tabbingContext);tabbingContext.activate();$(document).trigger('drupalTabbingConstrained',tabbingContext);return tabbingContext;},release(){let toActivate=this.stack.length-1;while(toActivate>=0&&this.stack[toActivate].released)toActivate--;this.stack.splice(toActivate+1);if(toActivate>=0)this.stack[toActivate].activate();},activate(tabbingContext){const $set=tabbingContext.$tabbableElements;const level=tabbingContext.level;const $disabledSet=$(tabbable(document.body)).not($set);tabbingContext.$disabledElements=$disabledSet;const il=$disabledSet.length;for(let i=0;i<il;i++)this.recordTabindex($disabledSet.eq(i),level);$disabledSet.prop('tabindex',-1).prop('autofocus',false);let $hasFocus=$set.filter('[autofocus]').eq(-1);if($hasFocus.length===0)$hasFocus=$set.eq(0);$hasFocus.trigger('focus');if($set.length&&tabbingContext.trapFocus){$set.last().on('keydown.focus-trap',(event)=>{if(event.key==='Tab'&&!event.shiftKey){event.preventDefault();$set.first().focus();}});$set.first().on('keydown.focus-trap',(event)=>{if(event.key==='Tab'&&event.shiftKey){event.preventDefault();$set.last().focus();}});}},deactivate(tabbingContext){const $set=tabbingContext.$disabledElements;const level=tabbingContext.level;const il=$set.length;tabbingContext.$tabbableElements.first().off('keydown.focus-trap');tabbingContext.$tabbableElements.last().off('keydown.focus-trap');for(let i=0;i<il;i++)this.restoreTabindex($set.eq(i),level);},recordTabindex($el,level){const tabInfo=$el.data('drupalOriginalTabIndices')||{};tabInfo[level]={tabindex:$el[0].getAttribute('tabindex'),autofocus:$el[0].hasAttribute('autofocus')};$el.data('drupalOriginalTabIndices',tabInfo);},restoreTabindex($el,level){const tabInfo=$el.data('drupalOriginalTabIndices');if(tabInfo&&tabInfo[level]){const data=tabInfo[level];if(data.tabindex)$el[0].setAttribute('tabindex',data.tabindex);else $el[0].removeAttribute('tabindex');if(data.autofocus)$el[0].setAttribute('autofocus','autofocus');if(level===0)$el.removeData('drupalOriginalTabIndices');else{let levelToDelete=level;while(tabInfo.hasOwnProperty(levelToDelete)){delete tabInfo[levelToDelete];levelToDelete++;}$el.data('drupalOriginalTabIndices',tabInfo);}}}});$.extend(TabbingContext.prototype,{release(){if(!this.released){this.deactivate();this.released=true;Drupal.tabbingManager.release(this);$(document).trigger('drupalTabbingContextReleased',this);}},activate(){if(!this.active&&!this.released){this.active=true;Drupal.tabbingManager.activate(this);$(document).trigger('drupalTabbingContextActivated',this);}},deactivate(){if(this.active){this.active=false;Drupal.tabbingManager.deactivate(this);$(document).trigger('drupalTabbingContextDeactivated',this);}}});if(Drupal.tabbingManager)return;Drupal.tabbingManager=new TabbingManager();})(jQuery,Drupal,window.tabbable);;
(function($,Drupal,Backbone){const strings={tabbingReleased:Drupal.t('Tabbing is no longer constrained by the Contextual module.'),tabbingConstrained:Drupal.t('Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.'),pressEsc:Drupal.t('Press the esc key to exit.')};function initContextualToolbar(context){if(!Drupal.contextual||!Drupal.contextual.collection)return;const contextualToolbar=Drupal.contextualToolbar;contextualToolbar.model=new contextualToolbar.StateModel({isViewing:document.querySelector('body .contextual-region')===null||localStorage.getItem('Drupal.contextualToolbar.isViewing')!=='false'},{contextualCollection:Drupal.contextual.collection});const viewOptions={el:$('.toolbar .toolbar-bar .contextual-toolbar-tab'),model:contextualToolbar.model,strings};new contextualToolbar.VisualView(viewOptions);new contextualToolbar.AuralView(viewOptions);}Drupal.behaviors.contextualToolbar={attach(context){if(once('contextualToolbar-init','body').length)initContextualToolbar(context);}};Drupal.contextualToolbar={model:null};})(jQuery,Drupal,Backbone);;
(function(Drupal,Backbone){Drupal.contextualToolbar.StateModel=Backbone.Model.extend({defaults:{isViewing:true,isVisible:false,contextualCount:0,tabbingContext:null},initialize(attrs,options){this.listenTo(options.contextualCollection,'reset remove add',this.countContextualLinks);this.listenTo(options.contextualCollection,'add',this.lockNewContextualLinks);this.listenTo(this,'change:contextualCount',this.updateVisibility);this.listenTo(this,'change:isViewing',(model,isViewing)=>{options.contextualCollection.each((contextualModel)=>{contextualModel.set('isLocked',!isViewing);});});},countContextualLinks(contextualModel,contextualCollection){this.set('contextualCount',contextualCollection.length);},lockNewContextualLinks(contextualModel,contextualCollection){if(!this.get('isViewing'))contextualModel.set('isLocked',true);},updateVisibility(){this.set('isVisible',this.get('contextualCount')>0);}});})(Drupal,Backbone);;
(function($,Drupal,Backbone,_){Drupal.contextualToolbar.AuralView=Backbone.View.extend({announcedOnce:false,initialize(options){this.options=options;this.listenTo(this.model,'change',this.render);this.listenTo(this.model,'change:isViewing',this.manageTabbing);$(document).on('keyup',_.bind(this.onKeypress,this));this.manageTabbing();},render(){this.$el.find('button').attr('aria-pressed',!this.model.get('isViewing'));return this;},manageTabbing(){let tabbingContext=this.model.get('tabbingContext');if(tabbingContext){if(tabbingContext.active)Drupal.announce(this.options.strings.tabbingReleased);tabbingContext.release();}if(!this.model.get('isViewing')){tabbingContext=Drupal.tabbingManager.constrain($('.contextual-toolbar-tab, .contextual'));this.model.set('tabbingContext',tabbingContext);this.announceTabbingConstraint();this.announcedOnce=true;}},announceTabbingConstraint(){const strings=this.options.strings;Drupal.announce(Drupal.formatString(strings.tabbingConstrained,{'@contextualsCount':Drupal.formatPlural(Drupal.contextual.collection.length,'@count contextual link','@count contextual links')}));Drupal.announce(strings.pressEsc);},onKeypress(event){if(!this.announcedOnce&&event.keyCode===9&&!this.model.get('isViewing')){this.announceTabbingConstraint();this.announcedOnce=true;}if(event.keyCode===27)this.model.set('isViewing',true);}});})(jQuery,Drupal,Backbone,_);;
(function(Drupal,Backbone){Drupal.contextualToolbar.VisualView=Backbone.View.extend({events(){const touchEndToClick=function(event){event.preventDefault();event.target.click();};return {click(){this.model.set('isViewing',!this.model.get('isViewing'));},touchend:touchEndToClick};},initialize(){this.listenTo(this.model,'change',this.render);this.listenTo(this.model,'change:isViewing',this.persist);},render(){this.$el.toggleClass('hidden',!this.model.get('isVisible'));this.$el.find('button').toggleClass('is-active',!this.model.get('isViewing'));return this;},persist(model,isViewing){if(!isViewing)localStorage.setItem('Drupal.contextualToolbar.isViewing','false');else localStorage.removeItem('Drupal.contextualToolbar.isViewing');}});})(Drupal,Backbone);;
(function($,Drupal){Drupal.behaviors.adminToolbar={attach:function(context,settings){$('a.toolbar-icon',context).removeAttr('title');$('ul.toolbar-menu li.menu-item--expanded a',context).on('focusin',function(){$('li.menu-item--expanded',context).removeClass('hover-intent');$(this).parents('li.menu-item--expanded').addClass('hover-intent');});$('ul.toolbar-menu li.menu-item a',context).keydown(function(e){if((e.shiftKey&&(e.keyCode||e.which)==9))if($(this).parent('.menu-item').prev().hasClass('menu-item--expanded'))$(this).parent('.menu-item').prev().addClass('hover-intent');});$('.toolbar-menu:first-child > .menu-item:not(.menu-item--expanded) a, .toolbar-tab > a',context).on('focusin',function(){$('.menu-item--expanded').removeClass('hover-intent');});$('.toolbar-menu:first-child > .menu-item',context).on('hover',function(){$(this,'a').css("background: #fff;");});$('ul:not(.toolbar-menu)',context).on({mousemove:function(){$('li.menu-item--expanded').removeClass('hover-intent');},hover:function(){$('li.menu-item--expanded').removeClass('hover-intent');}});if(window.matchMedia("(max-width: 767px)").matches&&$('body').hasClass('toolbar-tray-open')){$('body').removeClass('toolbar-tray-open');$('#toolbar-item-administration').removeClass('is-active');$('#toolbar-item-administration-tray').removeClass('is-active');};}};})(jQuery,Drupal);;
;(function(factory){'use strict';if(typeof define==='function'&&define.amd)define(['jquery'],factory);else{if(jQuery&&!jQuery.fn.hoverIntent)factory(jQuery);}})(function($){'use strict';var _cfg={interval:100,sensitivity:6,timeout:0};var INSTANCE_COUNT=0;var cX,cY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,$el,s,cfg){if(Math.sqrt((s.pX-cX)*(s.pX-cX)+(s.pY-cY)*(s.pY-cY))<cfg.sensitivity){$el.off(s.event,track);delete s.timeoutId;s.isActive=true;ev.pageX=cX;ev.pageY=cY;delete s.pX;delete s.pY;return cfg.over.apply($el[0],[ev]);}else{s.pX=cX;s.pY=cY;s.timeoutId=setTimeout(function(){compare(ev,$el,s,cfg);},cfg.interval);}};var delay=function(ev,$el,s,out){delete $el.data('hoverIntent')[s.id];return out.apply($el[0],[ev]);};$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var instanceId=INSTANCE_COUNT++;var cfg=$.extend({},_cfg);if($.isPlainObject(handlerIn)){cfg=$.extend(cfg,handlerIn);if(!typeof cfg.out==='function')cfg.out=cfg.over;}else if(typeof handlerOut==='function')cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector});else cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});var handleHover=function(e){var ev=$.extend({},e);var $el=$(this);var hoverIntentData=$el.data('hoverIntent');if(!hoverIntentData)$el.data('hoverIntent',(hoverIntentData={}));var state=hoverIntentData[instanceId];if(!state)hoverIntentData[instanceId]=state={id:instanceId};if(state.timeoutId)state.timeoutId=clearTimeout(state.timeoutId);var mousemove=state.event='mousemove.hoverIntent.hoverIntent'+instanceId;if(e.type==='mouseenter'){if(state.isActive)return;state.pX=ev.pageX;state.pY=ev.pageY;$el.off(mousemove,track).on(mousemove,track);state.timeoutId=setTimeout(function(){compare(ev,$el,state,cfg);},cfg.interval);}else{if(!state.isActive)return;$el.off(mousemove,track);state.timeoutId=setTimeout(function(){delay(ev,$el,state,cfg.out);},cfg.timeout);}};return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover},cfg.selector);};});;
(function($){$(document).ready(function(){$('.toolbar-tray-horizontal li.menu-item--expanded, .toolbar-tray-horizontal ul li.menu-item--expanded .menu-item').hoverIntent({over:function(){$(this).parent().find('li').removeClass('hover-intent');$(this).addClass('hover-intent');},out:function(){$(this).removeClass('hover-intent');},timeout:250});});})(jQuery);;
(function($,Drupal,drupalSettings){const pathInfo=drupalSettings.path;const escapeAdminPath=sessionStorage.getItem('escapeAdminPath');const windowLocation=window.location;if(!pathInfo.currentPathIsAdmin&&!/destination=/.test(windowLocation.search))sessionStorage.setItem('escapeAdminPath',windowLocation);Drupal.behaviors.escapeAdmin={attach(){const toolbarEscape=once('escapeAdmin','[data-toolbar-escape-admin]');if(toolbarEscape.length&&pathInfo.currentPathIsAdmin&&escapeAdminPath!==null)$(toolbarEscape).attr('href',escapeAdminPath);}};})(jQuery,Drupal,drupalSettings);;
((Drupal,drupalSettings)=>{const replacementsSelector=`script[data-big-pipe-replacement-for-placeholder-with-id]`;const ajaxObject=Drupal.ajax({url:'',base:false,element:false,progress:false});function mapTextContentToAjaxResponse(content){if(content==='')return false;try{return JSON.parse(content);}catch(e){return false;}}function processReplacement(replacement){const id=replacement.dataset.bigPipeReplacementForPlaceholderWithId;const content=replacement.textContent.trim();if(typeof drupalSettings.bigPipePlaceholderIds[id]==='undefined')return;const response=mapTextContentToAjaxResponse(content);if(response===false)return;delete drupalSettings.bigPipePlaceholderIds[id];ajaxObject.success(response,'success');}function checkMutation(node){return Boolean(node.nodeType===Node.ELEMENT_NODE&&node.nodeName==='SCRIPT'&&node.dataset&&node.dataset.bigPipeReplacementForPlaceholderWithId&&typeof drupalSettings.bigPipePlaceholderIds[node.dataset.bigPipeReplacementForPlaceholderWithId]!=='undefined');}function checkMutationAndProcess(node){if(checkMutation(node))processReplacement(node);else{if(node.parentNode!==null&&checkMutation(node.parentNode))processReplacement(node.parentNode);}}function processMutations(mutations){mutations.forEach(({addedNodes,type,target})=>{addedNodes.forEach(checkMutationAndProcess);if(type==='characterData'&&checkMutation(target.parentNode)&&drupalSettings.bigPipePlaceholderIds[target.parentNode.dataset.bigPipeReplacementForPlaceholderWithId]===true)processReplacement(target.parentNode);});}const observer=new MutationObserver(processMutations);Drupal.attachBehaviors(document);document.querySelectorAll(replacementsSelector).forEach(processReplacement);observer.observe(document.body,{childList:true,subtree:true,characterData:true});window.addEventListener('DOMContentLoaded',()=>{const mutations=observer.takeRecords();observer.disconnect();if(mutations.length)processMutations(mutations);Drupal.ajax.instances[ajaxObject.instanceIndex]=null;});})(Drupal,drupalSettings);;
