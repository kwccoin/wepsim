/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    // workspaces

    function sim_change_workspace ( page_id, carousel_id )
    {
            if ( (typeof $.mobile                             != "undefined") &&
                 (typeof $.mobile.pageContainer               != "undefined") &&
                 (typeof $.mobile.pageContainer.pagecontainer != "undefined") )
            {
                  $.mobile.pageContainer.pagecontainer('change', page_id);
            }
            else
            {
                  $('#carousel-8').carousel(carousel_id) ;
            }
    }

    // active/restore UI

    function wepsim_uicfg_apply ( )
    {
	    var cfgValue = null ;

	    // view
	    cfgValue = get_cfg('ws_skin_user') ;
	    wepsim_restore_view(cfgValue) ;

	    // dark mode
	    cfgValue = get_cfg('ws_skin_dark_mode') ;
            wepsim_restore_darkmode(cfgValue) ;
    }

    function wepsim_uicfg_restore ( )
    {
	    // Reload UIcfg
	    wepsim_uicfg_apply() ;

	    // Reload view
	    wsweb_change_workspace_simulator() ;
	    wsweb_change_show_processor() ;
	    wsweb_set_details('REGISTER_FILE') ;

	    wsweb_set_cpucu_size(get_cfg('CPUCU_size')) ;
	    wsweb_set_c1c2_size(get_cfg('C1C2_size')) ;
    }

    function wepsim_activeview ( view, is_set )
    {
            // update current skin
	    var cur_skin_user = get_cfg('ws_skin_user').split(":") ;

	    if ('only_asm' === view)
	    {
	        cur_skin_user[0] = 'only_asm' ;
	        cur_skin_user[1] = (is_set) ? 'on' : 'of' ;
	    }
	    if ('only_frequent' === view)
	    {
	        cur_skin_user[2] = 'only_frequent' ;
	        cur_skin_user[3] = (is_set) ? 'on' : 'of' ;
	    }

            // update cfg
	    var new_skin_user = cur_skin_user.join(":") ;
	    update_cfg('ws_skin_user', new_skin_user) ;
	    $('#label14-' + new_skin_user.replace(/:/g,"__")).button('toggle');

            // update view
            wepsim_restore_view(new_skin_user) ;
    }

    function wepsim_restore_view ( view )
    {
            var new_classes = [] ;
	    var cur_skin_user = view.split(":") ;
	    if ('only_asm' === cur_skin_user[0])
	    {
              //$(".multi-collapse-2").collapse("show") ;
		inputfirm.setOption('readOnly', false) ;

	        if ('on' === cur_skin_user[1])
                {
		     $("#tab24").click() ;
		     inputfirm.setOption('readOnly', true) ;
		     new_classes.push('.user_microcode') ;
		}
	    }
	    if ('only_frequent' === cur_skin_user[2])
	    {
	        if ('on' === cur_skin_user[3])
		    new_classes.push('.user_archived') ;
	    }

	    var classes = '.user_archived, .user_microcode' ;
	    $(classes).removeClass('d-none') ;
            classes = new_classes.join(", ") ;
            $(classes).addClass('d-none') ;
    }

    function wepsim_restore_darkmode ( adm )
    {
	    var o = null ;

            // body
	    o = document.getElementsByTagName('body') ;
	    if (o.length > 0)
            {
	         if (adm === false)
	              o[0].removeAttribute('data-theme', 'dark') ;
	         else o[0].setAttribute('data-theme',    'dark') ;
            }

            // skipped elements
	    o = document.querySelectorAll('.no-dark-mode') ;
            for (var i=0; i<o.length; i++)
            {
	         if (adm === false)
	              o[i].removeAttribute('data-theme', 'nodark') ;
	         else o[i].setAttribute('data-theme',    'nodark') ;
            }

	    return true ;
    }


    // hardware

    var ws_hw_hash = {} ;

    function wepsim_hw_init ( )
    {
         var url_list = get_cfg('hw_url') ;
         var jindex = [] ;
      // var jobj   = {} ;

         // try to load the index
         jindex = wepsim_url_getJSON(url_list) ;

         // try to load each one
         for (var i=0; i<jindex.length; i++)
         {
	    //jobj = $.getJSON({'url': jindex[i].url, 'async': false}) ;
            //simcore_hardware_import(jobj.responseText) ;
              ws_hw_hash[jindex[i].name] = jindex[i].url ;
         }

         return true ;
    }

    // reload

    function wepsim_reload_hw ( p_name )
    {
         if (typeof ws_hw_hash[p_name] === "undefined") {
             return false ;
         }

         // try to load the requested one
	 var jobj = $.getJSON({'url': ws_hw_hash[p_name], 'async': false}) ;
	 simcore_hardware_import(jobj.responseText) ;
	 wsweb_select_main(p_name) ;

         return true ;
    }

    // wepsim_activehw: UI handlers

    var msg_default = '<div class="bg-warning"><b>Not available in this hardware</b></div>' ;

    var hash_detail2init = {

	    "REGISTER_FILE":  {
						  init: function() {
							     $('#states_ALL').html(msg_default) ;
							     wepsim_init_states('#states_ALL') ;

							     $('#states_BR').html(msg_default) ;
							     wepsim_init_rf('#states_BR') ;
							},
						 reset: function() {
							     wepsim_show_states() ;
							     wepsim_show_rf_values();
							     wepsim_show_rf_names();
							},
					   show_states: wepsim_show_states,
					show_rf_values: wepsim_show_rf_values,
					 show_rf_names: wepsim_show_rf_names
	                      },

	    "CPU_STATS":      {
						  init: function() {
							   var o = document.getElementById("cpu1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
							   return true ;
						        }
	                      },
	
	    "CONTROL_MEMORY": {
						  init: function() {
							   return true ;
						        },
						 reset: function() {
							   show_control_memory(simhw_internalState('MC'),
									       simhw_internalState('MC_dashboard'),0,true);
						        },
					   update_draw: wepsim_svg_update_draw,
			         update_bus_visibility: wepsim_svg_update_bus_visibility
	                      },
	
	    "MEMORY":         {
		                                  init: function() {
							   return true ;
						        },
						 reset: function() {
							   show_main_memory(simhw_internalState('MP'), 0, true, false) ;
						        },
		                      show_main_memory: wepsim_show_main_memory,
		                        show_asmdbg_pc: wepsim_show_asmdbg_pc,
                                   show_control_memory: wepsim_show_control_memory,
		                          show_dbg_mpc: wepsim_show_dbg_mpc,
				           show_dbg_ir: wepsim_show_dbg_ir
	                      },

	    "MEMORY_CONFIG":  {
						  init: function() {
							   var o = document.getElementById("memcfg1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_STATS":       {
						  init: function() {
							   var o = document.getElementById("ioinfo1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_CONFIG":      {
						  init: function() {
							   var o = document.getElementById("iocfg1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "3DLED":         {
						  init: function() {
							   var o = document.getElementById("l3d1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "SCREEN":         {
		                                  init: function() {
						           return true ;
						        },
		                                 reset: function() {
			                                   wepsim_set_screen_content("") ;
	                                                },
		                    get_screen_content: wepsim_get_screen_content,
                                    set_screen_content: wepsim_set_screen_content
	                      },

	    "KEYBOARD":       {
		                                  init: function() {
						           return true ;
						         },
		                                 reset: function() {
						           return true ;
						        },
		                  get_keyboard_content: wepsim_get_keyboard_content,
                                  set_keyboard_content: wepsim_set_keyboard_content
	                      }
	} ;

    function wepsim_activehw ( mode )
    {
	    simhw_setActive(mode) ;

            // reload images
	    var o = document.getElementById('svg_p') ;
	    if (o != null) o.setAttribute('data',  simhw_active().sim_img_processor) ;
	        o = document.getElementById('svg_cu') ;
	    if (o != null) o.setAttribute('data', simhw_active().sim_img_controlunit) ;
	        o = document.getElementById('svg_p2') ;
	    if (o != null) o.setAttribute('data', simhw_active().sim_img_cpu) ;

            // reload images event-handlers
	    var a = document.getElementById("svg_p");
	    a.addEventListener("load",function() {
		simcore_init_eventlistener("svg_p", hash_detail2action, hash_signal2action) ;
		refresh() ;
	    }, false);

	    var b = document.getElementById("svg_cu");
	    b.addEventListener("load",function() {
		simcore_init_eventlistener("svg_cu", hash_detail2action, hash_signal2action) ;
		refresh() ;
	    }, false);

	    // initialize hw UI
	    simcore_init_ui(hash_detail2init) ;
	    simcoreui_init_hw('#config_HW') ;

            // info + warning
	    wepsim_notify_warning('<strong>WARNING</strong>',
                                  'Please remember the current firmware and assembly might need to be reloaded, ' +
                                  'because previous working session of the simulated hardware are not kept.') ;
	    wepsim_notify_success('<strong>INFO</strong>',
                                  '"' + simhw_active().sim_name + '" has been activated.') ;

            // update UI: memory
            var SIMWARE = get_simware() ;
    	    update_memories(SIMWARE) ;
            simcore_reset() ;

            // update UI: asmdbg
            var asmdbg_content = default_asmdbg_content_horizontal() ;
	    for (var l in SIMWARE.assembly) // <===> if (SIMWARE.assembly != {})
	    {
                 asmdbg_content = assembly2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg, SIMWARE.assembly) ;
		 break ;
	    }

	    asmdbg_loadContent(asmdbg_content) ;

            // return ok
            return true ;
    }

    // sliders

    function set_ab_size ( diva, divb, new_value )
    {
        // reset
	var colclass = "col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 " + 
                       "order-1 order-2 d-none" ;
	$(diva).removeClass(colclass) ;
	$(divb).removeClass(colclass) ;

        // set
        switch (new_value)
        {
           case 0:    $(diva).addClass('col-12 order-1') ;
                      $(divb).addClass('col-12') ;
                      break ;
           case 1:    $(diva).addClass('d-none') ;
                      $(divb).addClass('col-12 order-2') ;
                      break ;
           case 13:   $(diva).addClass('col-12 order-1') ;
                      $(divb).addClass('d-none') ;
                      break ;
           case 14:   $(diva).addClass('col-12') ;
                      $(divb).addClass('col-12 order-2') ;
                      break ;
           default:   $(diva).addClass('col-' + (new_value-1)) ;   //  1,  2, 3, ...
                      $(divb).addClass('col-' + (13-new_value)) ;  // 11, 10, 9, ...
                      break ;
        }
    }

    //
    // Auxiliar function
    //

    // confirm exit
    function wepsim_confirm_exit ( e )
    {
	    wepsim_checkpoint_addCurrentToCache() ;

	    var confirmationMessage = "\o/";
	    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
	    return confirmationMessage;                            // Webkit, Safari, Chrome
    }

    // alert reload
    function wepsim_general_exception_handler ( err )
    {
          alert("Please try to cleanup the browser cache and try again.\n" +
                "WepSIM was improperly used and found an error, sorry :-(\n" +
		"\n" +
		"Diagnostic:\n" +
                " * Error message: " + err.message + "\n" +
		" * Runtime stack:\n" + err.stack +
		"\n" +
		"After close this alert, WepSIM will try to reload and by-pass the cache (just in case).\n") ;

	  location.reload(true) ;
    }


    //
    // Quick Config
    //

    // popover quick-slidercfg
    function wepsim_init_quickcfg ( quick_id, val_trigger, fun_content, fun_ownshown )
    {
	 return $(quick_id).popover({
		    trigger:     val_trigger,
		    html:        true,
		    placement:  'auto',
		    animation:   false,
		    container:  'body',
		    template:   '<div class="popover shadow border border-secondary" role="tooltip">' +
			        '<div class="arrow"></div><h3 class="popover-header"></h3>' +
                                '<div class="popover-body"></div>' +
			        '</div>',
		    content:    fun_content,
		    sanitizeFn: function (content) {
				    return content ; // DOMPurify.sanitize(content) ;
				}
	 }).on('shown.bs.popover',
		                function(shownEvent) {
                                    fun_ownshown(shownEvent);
                                    i18n_update_tags('dialogs') ;
                                    i18n_update_tags('gui') ;
                                    i18n_update_tags('cfg') ;
                                }) ;
    }

    //
    // Initialize UI
    //

    function wepsim_init_quickfixes ( )
    {
	// https://github.com/facebook/react-native/issues/18375
	/* eslint-disable no-extend-native */
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-bitwise */
	if (!String.prototype.padStart)
        {
	  String.prototype.padStart = function padStart(targetLength, padString) {
	    targetLength >>= 0; // truncate if number, or convert non-number to 0;
	    padString = String(typeof padString !== 'undefined' ? padString : ' ');
	    if (this.length >= targetLength) {
	      return String(this);
	    }
	    targetLength -= this.length;
	    if (targetLength > padString.length) {
	      // append to original to ensure we are longer than needed
	      padString += padString.repeat(targetLength / padString.length);
	    }
	    return padString.slice(0, targetLength) + String(this);
	  };
	}
    }

    function wepsim_init_ui ( )
    {
            // fixed padString...
            wepsim_init_quickfixes() ;

	    // install protection for accidental close.
	    window.addEventListener("beforeunload", wepsim_confirm_exit) ;

	    // disable effects
	    if (typeof jQuery.fx != "undefined")
		jQuery.fx.off = true;
	    if (typeof ko != "undefined")
		ko.options.deferUpdates = true;

	    // carousel: touch swipe disabled
	    $('.carousel').carousel({ touch: false }) ;

	    // set wepsim version
	    $("div.wsversion").replaceWith(get_cfg('version'));

	    // tooltip: trigger by hover
	    $('[data-toggle="tooltip"]').tooltip({
		    trigger:   'hover',
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // help popover...
	    $('a[data-toggle="popover1"]').popover({
		    placement: 'bottom',
		    animation: false,
		    trigger:   'focus, hover',
		    delay: { "show": 500, "hide": 100 },
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // init: quick-menus
            for (var p in wsweb_quickcfg) 
            {
                 wepsim_init_quickcfg(wsweb_quickcfg[p].quick_id,
                                      wsweb_quickcfg[p].val_trigger,
		                      wsweb_quickcfg[p].fun_content,
		                      wsweb_quickcfg[p].fun_ownshown) ;
            }

	    // asmdbg
	    showhideAsmElements() ;

	    var target = $("#asm_table");
	    $("#asm_debugger_container").scroll(function() {
	       target.prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
	    });

	    // initialize editors
	    inputfirm_cfg = {
			        value: "\n\n\n\n\n\n\n\n\n\n\n\n",
			        lineNumbers: true,
			        lineWrapping: true,
			        matchBrackets: true,
			        tabSize: 2,
			        foldGutter: {
			  	   rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			        },
			        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			        mode: "text/javascript"
			    } ;
	    inputfirm = sim_init_editor("inputFirmware", inputfirm_cfg) ;

	    inputasm_cfg = {
				value: "\n\n\n\n\n\n\n\n\n\n\n\n",
				lineNumbers: true,
				lineWrapping: true,
				matchBrackets: true,
				tabSize: 2,
				extraKeys: {
				  "Ctrl-Space": function(cm) {
				      CodeMirror.showHint(cm, function(cm, options) {
					      var simware = get_simware();
					      var cur = cm.getCursor();
					      var result = [];
					      for (var i=0; i<simware.firmware.length; i++) {
						   if (simware.firmware[i].name != "begin") {
							result.push(simware.firmware[i].signatureUser) ;
						   }
					      }
					      return { list: result, from: cur, to: cur } ;
				      });
				  }
				},
				mode: "gas"
			    } ;
	    inputasm = sim_init_editor("inputAssembly", inputasm_cfg) ;

	    // init: voice
	    wepsim_voice_init() ;
	    if (false == get_cfg('use_voice')) {
		wepsim_voice_stop() ;
	    }
    }

    function wepsim_init_default ( )
    {
	    // 1 Pre-load by default

	       // 1.A Load hardware...
	       wepsim_hw_init() ;
	       simcore_init_hw('ep') ;

	       // 1.B Load examples
               var ws_examples_index_url = get_cfg('example_url') ;
               wepsim_example_loadList(ws_examples_index_url) ;

	       // 1.C Reload UI configuration
               wepsim_uicfg_restore() ;

	       var ws_mode = get_cfg('ws_mode');
	       wsweb_select_main(ws_mode) ;
	       if (simhw_active() !== null) {
	      	   simcore_reset();
	       }

	       // 1.D Init recording
	       simcore_record_init('record_msg', 'record_pb') ;
               simcore_record_captureInit() ;

	    // 2 Pre-load following URL params

	       // 2.A GET params
	       var url_parameters = new URL(window.location).searchParams ;
	       wepsim_preload_get(url_parameters, 'FileNameToSaveAs1', 'tagToSave1') ;
    }

