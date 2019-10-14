/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    var breakpoint_icon_list = {
                    "classic": 		{ type: "classic",  addclass: "no-dark-mode",  origin: "https://www.optikunde.de/farbe/rot.php" },
                    "pushpin": 		{ type: "classic",  addclass: "no-dark-mode",  origin: "http://clipart-library.com/red-push-pin.html" },
                    "cat1": 		{ type: "pets",     addclass: "no-dark-mode",  origin: "" },
                    "dog1": 		{ type: "pets",     addclass: "no-dark-mode",  origin: "" },
                    "super": 		{ type: "films",    addclass: "no-dark-mode",  origin: "https://worldvectorlogo.com/logo/superman-3" },
                    "batman": 		{ type: "films",    addclass: "",              origin: "http://getwallpapers.com/collection/black-and-white-batman-wallpaper" },
                    "r2d2": 		{ type: "films",    addclass: "",              origin: "https://imgur.com/gallery/gKSmy" },
                    "sw": 		{ type: "films",    addclass: "",              origin: "https://i2.wp.com/icons.iconarchive.com/icons/sensibleworld/starwars/1024/Death-Star-icon.png" },
                    "bb8": 		{ type: "films",    addclass: "no-dark-mode",  origin: "" },
                    "vader1": 		{ type: "films",    addclass: "",              origin: "" },
                    "grail": 		{ type: "films",    addclass: "no-dark-mode",  origin: "http://3png.com/a-31243892.html" },
                    "despicable": 	{ type: "films",    addclass: "no-dark-mode",  origin: "https://www.helloforos.com/t/cerrado/350821/81" },
                    "lotr4": 		{ type: "films",    addclass: "no-dark-mode",  origin: "http://www.cinecollectibles.com/gentle-giant-c-1_62.html" },
                    "lotr2": 		{ type: "films",    addclass: "no-dark-mode",  origin: "https://www.forbes.com/sites/adrianbridgwater/2016/01/15/microsoft-r-one-big-data-tool-to-rule-them-all/" },
                    "hp1": 		{ type: "films",    addclass: "no-dark-mode",  origin: "http://www.logosclicks.com/logos/harry-potter-name-logo-46a93c.html" }
    } ;


    function sim_core_breakpointicon_get ( icon_name )
    {
	  return "<img alt='stop icon' height=22 src='images/stop/stop_" + icon_name + ".gif'>" ;
    }

