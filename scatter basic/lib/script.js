								
											
					var dvc = {}; // global object variable to contain all variables prefixed with 'dvc.'


					dvc.LeastSquareArray_XY = [];
					dvc.LeastSquareArray_XX = [];
					dvc.LeastSquareArray_X = [];
					dvc.LeastSquareArray_Y = [];
	
					
					dvc.filteredLeastSquareArray_XY = [];
					dvc.filteredLeastSquareArray_XX = [];
					dvc.filteredLeastSquareArray_X = [];
					dvc.filteredLeastSquareArray_Y = [];
					
						
					var	equationcirclesAttributes;
					var equationcircles;
					
					
					var	equationRectAttributes;
					var equationRects;
					
					
					var useButton  = false;
	
/*			
					dvc.buttons = [ 
									[ "pin" ,  			"./lib/images/onpin.svg" 		, "Use fixed axis limits" 			, "Fixed axis limits" 	, "85px" , "50px" 	, "if ( dvc.scaleTypeFixed == true ) { dvc.scaleTypeFixed = true; } else { dvc.scaleTypeFixed = false; dvc.axisLimitTypeIndex = 0; dvc.axisLimitType = 'Fixed'; d3.select( '#scale' ).attr( 'src' , './lib/images/offscale.svg' ); }" ],
									[ "scale" ,  		"./lib/images/offscale.svg" 	, "Use data-driven axis limits" 	, "Data axis limits" 	, "85px" , "50px" 	, ""  ],
									[ "equality" ,  	"./lib/images/onequality.svg" 	, "Show/hide 1:1 equality line"  	, "Equality line" 		, "85px" , "50px"  	, ""  ],
									[ "regression"  ,	"./lib/images/onequation.svg"	, "Show/hide regression lines"		, "Regression lines" 	, "85px" , "50px"  	, ""  ]
								];		
					*/

					var axesDefinitions = {};	
					var svg; // SVG element	
					var svg2; // SVG2 element
					
					

					dvc.boolEqualityLine = false;
					dvc.boolRegressionLine = true;
					dvc.boolFilteredRegressionLine = false;
					dvc.boolShadows = true;
					dvc.diagnostics = false;
					dvc.scaleTypeFixed = true;
					dvc.axisLimitTypeIndex = "Fixed";
					
					
					
					dvc.containerWidth = 940;
					dvc.containerHeight = 700;
					var mobile_threshold = 500;
					var tablet_threshold = 700;
					


					// define local variables to store y-axis intersection point depending on x-axis/y-axis scenario
					dvc.y1_value;
					dvc.y2_value;
					
	
					
					var graphic_aspect_width = 16;
					var graphic_aspect_height = 9;
					
							
											
//					// set-up margins and interctive width/height dimensions ...
//					dvc.margin = { top: 25, right: 50, bottom: 25, left: 15 },
//					dvc.width = 940 - dvc.margin.left - dvc.margin.right,
//					dvc.height = 700 - dvc.margin.top - dvc.margin.bottom;
					
					
					//dvc.colourPalette = [  "rgb(28, 130, 197)", "rgb(243, 147, 33)", "rgb(200, 200, 200)"  ];	
					
					
											/* circles */	/*unfiltered regression line */	/*"equality line*/
					dvc.colourPalette = [  	"#007cc2", 		"rgb(0,0,0)", 					"rgb(200, 200, 200)"  ];	
					
					
					
					var containerDiv = $('#container');
					var containerDivWidth = containerDiv.width();	
					var containerDivHeight = containerDiv.height();	
					
					
					var container2Div = $('#container2');
					var container2DivWidth = container2Div.width();	
					var container2DivHeight = container2Div.height();	
					
					
					var container3Div = $('#container3');
					var container3DivWidth = container3Div.width();	
					var container3DivHeight = container3Div.height();	
					
					var introDiv = $('#introDiv');
					var introDivWidth = introDiv.width();	
					var introDivHeight = introDiv.height();
										
					
					var num_ticks = 9;
					var pymChild = null;
					var graphHeight; 	
					
					
					var bodyElement = $('body');	 
					var bodyWidth = bodyElement.width();
					
									
					
					
					
					
					function clickPillLeft(fid){
						
						dvc.chartConfig.vars.axisLimitType.forEach(function(d,i){ d3.select("#" + d).attr("class" , "btn btn-default"); })
								
						if ( fid == "Fixed" ) {
							dvc.axisLimitTypeSelected = "Fixed";
							
							dvc.axisLimitTypeIndex = 0;
							dvc.axisLimitType = "Fixed";
						}
						else {
							dvc.axisLimitTypeSelected = "Data";
										
							dvc.axisLimitTypeIndex = 1;
							dvc.axisLimitType = "Data values";
						} 
					
						d3.select("#" + fid).attr("class" , "btn btn-default active");
						
						transitionData();
						
						return;
						
						
					}// end function clickPillLeft()
	
					
					
					function clickPillRight(fid){
								
						dvc.chartConfig.vars.axisType.forEach(function(d,i){ d3.select("#" + d).attr("class" , "btn btn-default"); })
						
						if ( fid == "Linear" ) { dvc.dataRangeType = "Linear"; }
						else { dvc.dataRangeType = "Log"; } 
					
						d3.select("#" + fid).attr("class" , "btn btn-default active");
						
						transitionData();
						
						return;
						
						
					}// end function clickPillRight()
					
					
					
					function clickTool(fid){
									
						if ( fid == "Equalityline" ) 
						{
							
							if ( dvc.boolEqualityLine == false )
							{							
								dvc.boolEqualityLine = true;
								d3.select("#equalityLine").attr( "display" , "inline");	
								
								d3.select("#" + fid).style( "border-color" , "none").style( "background-color" , "#cecece").style( "color" , "#333333");	
								
							} // end if ... 
								
								
								// if already checked on and dvc.boolEqualityLine == true
							else if ( dvc.boolEqualityLine == true ) 
							{								
								dvc.boolEqualityLine = false;
								d3.select("#equalityLine").attr( "display" , "none");
								d3.select("#" + fid).style( "border-color" , "none").style( "background-color" , "#e7e7e7").style( "color" , "#333333");		
								
							} // end else ...	
							
						}// end else .. 
									
						if ( fid == "Regressionlines" ) 
						{	
							
							if (  dvc.boolRegressionLine == false  )
							{	
								dvc.boolRegressionLine = true;
								
								d3.select("#regressionLine").attr( "display" , "inline" );
								d3.select("#legendRegressionLine").attr( "display" , "inline" );
	
								d3.select("#regressionFilteredLine").attr( "display" , "inline" );
								d3.select("#legendFilteredRegressionLine").attr( "display" , "inline" );
	
								d3.select("#eqtnText").attr( "display" , "inline" );
								d3.select("#eqtnTextFiltered").attr( "display" , "inline" );
								d3.select("#" + fid).style( "border-color" , "none").style( "background-color" , "#cecece").style( "color" , "#333333");
								
							} // end if ...
							
							
							
							// if already checked on and dvc.booleanRegressionLine == true
							else
							{
								dvc.boolRegressionLine = false;
								
								d3.select("#regressionLine").attr( "display" , "none" );
								d3.select("#legendRegressionLine").attr( "display" , "none" );
	
								d3.select("#regressionFilteredLine").attr( "display" , "none" );
								d3.select("#legendFilteredRegressionLine").attr( "display" , "none" );
								
								d3.select("#eqtnText").attr( "display" , "none" );
								d3.select("#eqtnTextFiltered").attr( "display" , "none" );	
								d3.select("#" + fid).style( "border-color" , "none").style( "background-color" , "#e7e7e7").style( "color" , "#333333");		
								
							} // end else ...							
							
						}// end else .. 
						
						
						return;
						
					}// end function clickTool()
					
	

	
	
//					// set-up margins and interctive width/height dimensions ...
//					dvc.margin = { top: 25, right: 50, bottom: 25, left: 15 },
//					dvc.width = 940 - dvc.margin.left - dvc.margin.right,
//					dvc.height = 700 - dvc.margin.top - dvc.margin.bottom;
//
//					graphHeight = Math.ceil( (  containerDivWidth * graphic_aspect_height ) / graphic_aspect_width ) - dvc.margin.top - dvc.margin.bottom;
//					d3.select('#container').style("height", parseInt(graphHeight/* + 200*/ + 200) + "px" );
					 
					 
					$( window ).resize(function()
					{
						
						
						// clear div containing the graph						
					    containerDiv.empty();	
						
						
						
						$("#unfilteredEqtnText").remove();
						$("#filteredEqtnText").remove();
						$(".equations").remove();
						
						

						var graphic = $(/*'#graphic'*/'#container');
						var keypoints = $('#keypoints');
						var footer = $(".footer");
						var pymChild = null;
						
						 
						 
						 // retrieve new height and width of graph container
						containerDivWidth = containerDiv.width();	
						containerDivHeight = containerDiv.height();	
						bodyWidth = bodyElement.width();
						
						
					   	var threshold_md = 788;
		   				var threshold_sm = /*dvc.optional*/dvc.config.optional.mobileBreakpoint; 
						
		  
						//set variables for chart dimensions dependent on width of #graphic
						if (graphic.width() < threshold_sm) {
								var margin = {top: /*dvc.*/dvc.config.optional.margin_sm[0], right: /*dvc.*/dvc.config.optional.margin_sm[1], bottom: /*dvc.*/dvc.config.optional.margin_sm[2], left: /*dvc.*/dvc.config.optional.margin_sm[3]}; 
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_sm[1]) / /*dvc.*/dvc.config.optional.aspectRatio_sm[0]) - margin.top - margin.bottom;
						} else if (graphic.width() < threshold_md){
								var margin = {top: /*dvc.*/dvc.config.optional.margin_md[0], right: /*dvc.*/dvc.config.optional.margin_md[1], bottom: /*dvc.*/dvc.config.optional.margin_md[2], left: /*dvc.*/dvc.config.optional.margin_md[3]}; 
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_md[1]) / /*dvc.*/dvc.config.optional.aspectRatio_md[0]) - margin.top - margin.bottom;
						} else {
								var margin = {top: /*dvc.*/dvc.config.optional.margin_lg[0], right: /*dvc.*/dvc.config.optional.margin_lg[1], bottom: /*dvc.*/dvc.config.optional.margin_lg[2], left: /*dvc.*/dvc.config.optional.margin_lg[3]}
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_lg[1]) / /*dvc.*/dvc.config.optional.aspectRatio_lg[0]) - margin.top - margin.bottom;
						}
						
						
						// recalculate the graph height using new container dimensions
//						graphHeight = Math.ceil( (  containerDivWidth * graphic_aspect_height ) / graphic_aspect_width ) - dvc.margin.top - dvc.margin.bottom;						
						d3.select('#container').style("height", parseInt(graphHeight/* + 200*/ + 150) + "px" );
						

						// logical test to define number of tick lines on x- and y- axes										
//						mobileThresholdCheck();
						
						
						// redraw graph using pym logic ... 						
						pymChild = new pym.Child({ polling: 5000, renderCallback: makeChart});
						
						
					 });
					 
					 					
												
				
					//then, onload, check to see if the web browser can handle 'inline svg'
					if (Modernizr.inlinesvg)
					{
						

						
						
//						mobileThresholdCheck();
												
						
						
						// And here's the full-fat code for everyone else		
						// function call to delay displaying opening screen until all data in 'data.js' has loaded			
						loadConfiguration();
						
					
					} // end if ... 
					else
					{
						
						
						//$('#main-wrapper').show();
						//$('#ieMsg').show();							
						
						
						//browser can't handle inline svg, so display alternative content
						//in this example, load the config file to get the links to underlying datasets
						//$("#dataLoadingGif").hide();
						
		  
					}					
					
					
					
					
					function loadConfiguration()
					{		
						
						
						// open and load configuration file. 					
						d3.json("data/config.json", function(json)
						{	
												
							// strore read in json data from config file as as global dvc. variable ...	
							dvc.config = json;				
								
	
							var graphic = $(/*'#graphic'*/'#container');
							var keypoints = $('#keypoints');
							var footer = $(".footer");
							var pymChild = null;
							
														
							var threshold_md = 788;
							var threshold_sm = /*dvc.optional*/dvc.config.optional.mobileBreakpoint; 
							
			  
							//set variables for chart dimensions dependent on width of #graphic
							if (graphic.width() < threshold_sm) {
									var margin = {top: /*dvc.*/dvc.config.optional.margin_sm[0], right: /*dvc.*/dvc.config.optional.margin_sm[1], bottom: /*dvc.*/dvc.config.optional.margin_sm[2], left: /*dvc.*/dvc.config.optional.margin_sm[3]}; 
									var chart_width = graphic.width() - margin.left - margin.right;
									var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_sm[1]) / /*dvc.*/dvc.config.optional.aspectRatio_sm[0]) - margin.top - margin.bottom;
							} else if (graphic.width() < threshold_md){
									var margin = {top: /*dvc.*/dvc.config.optional.margin_md[0], right: /*dvc.*/dvc.config.optional.margin_md[1], bottom: /*dvc.*/dvc.config.optional.margin_md[2], left: /*dvc.*/dvc.config.optional.margin_md[3]}; 
									var chart_width = graphic.width() - margin.left - margin.right;
									var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_md[1]) / /*dvc.*/dvc.config.optional.aspectRatio_md[0]) - margin.top - margin.bottom;
							} else {
									var margin = {top: /*dvc.*/dvc.config.optional.margin_lg[0], right: /*dvc.*/dvc.config.optional.margin_lg[1], bottom: /*dvc.*/dvc.config.optional.margin_lg[2], left: /*dvc.*/dvc.config.optional.margin_lg[3]}
									var chart_width = graphic.width() - margin.left - margin.right;
									var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_lg[1]) / /*dvc.*/dvc.config.optional.aspectRatio_lg[0]) - margin.top - margin.bottom;
							}	
							
							
							
													
								
							// set-up margins and interctive width/height dimensions ...
							//dvc.margin = { top: 25, right: 50, bottom: 25, left: 15 },
							dvc.width = 940 - /*dvc.*/margin.left - /*dvc.*/margin.right,
							dvc.height = 700 - /*dvc.*/margin.top - /*dvc.*/margin.bottom;
	
							graphHeight = Math.ceil( ( containerDivWidth * graphic_aspect_height ) / graphic_aspect_width ) - /*dvc.*/margin.top - /*dvc.*/margin.bottom;
							d3.select('#container').style("height", parseInt(graphHeight/* + 200*/ + 200) + "px" );
							
													
						//	graphHeight = Math.ceil( ( containerDivWidth * graphic_aspect_height ) / graphic_aspect_width ) - dvc.margin.top - dvc.margin.bottom;						
							containerDivHeight = containerDiv.height();								
							
						})
						
						
						// open and load configuration file. 					
						d3.json("data/scatterconfig.json", function(json)
						{
					
					
							if ( dvc.diagnostics == true ) { console.log("config started");	}
					
					
							// strore read in json data from config file as as global dvc. variable ...	
							dvc.chartConfig = json;	
										
										
	//						dvc.axisLimitTypeSelected = dvc.chartConfig.vars.axisLimitTypeSelected; 
//							dvc.axisTypeSelected = dvc.chartConfig.vars.axisTypeSelected; 
							
							
							var pillWidthPercentWidth = (100/(dvc.chartConfig.vars.axisLimitType.length+dvc.chartConfig.vars.axisType.length));
							var buttonsLeftpillWidthPercentWidth = (100/dvc.chartConfig.vars.axisLimitType.length);		
							var buttonsRightpillWidthPercentWidth = (100/dvc.chartConfig.vars.axisType.length);		
	
				
							
							d3.select("#buttonsLeft").append("div").attr( "class" , "btn-group " ).attr( "id" , "simple-justified-button-groupGrphStyles" );
							d3.select("#simple-justified-button-groupGrphStyles").append("div").attr( "class" , "btn-group btn-group-justified" ).attr( "id" , "justifiedBtnStyles" ).attr( "role" , "group" ).attr( "aria-label" , "Justified button group" ).style( "margin-right" , "0px" );
							
							dvc.chartConfig.vars.axisLimitType.forEach(function(d, i) {
								var fid = d;
								d3.select("#justifiedBtnStyles").append("a").attr("href" , "#").attr("class" , "btn btn-default hrefbuttonsLeft").attr("id" , d).text(d).style( "text-align" , "center" ).style("border-style", "solid").style("border-width", "1px").style("border-color", "white").attr("onClick" , "clickPillLeft(this.id)");
							})	
				
							
							
							d3.select("#buttonsRight").append("div").attr( "class" , "btn-group " ).attr( "id" , "simple-justified-button-groupGrphRanges" );
							d3.select("#simple-justified-button-groupGrphRanges").append("div").attr( "class" , "btn-group btn-group-justified" ).attr( "id" , "justifiedBtnRanges" ).attr( "role" , "group" ).attr( "aria-label" , "Justified button group" ).style( "margin-left" , "0px" );
							
							dvc.chartConfig.vars.axisType.forEach(function(d, i) {
								var fid = d;
								d3.select("#justifiedBtnRanges").append("a").attr("href" , "#").attr("class" , "btn btn-default hrefbuttonsRight").attr("id" , d).text(d).style( "text-align" , "center" ).style("border-style", "solid").style("border-width", "1px").style("border-color", "white").attr("onClick" , "clickPillRight(this.id)");
							})	
							
							
							d3.select("#tools").append("div").attr( "class" , "btn-group " ).attr( "id" , "simple-justified-button-groupGrphTools" );
							d3.select("#simple-justified-button-groupGrphTools").append("div").attr( "class" , "btn-group btn-group-justified" ).attr( "id" , "justifiedBtnTools" ).attr( "role" , "group" ).attr( "aria-label" , "Justified button group" );
							
							dvc.chartConfig.vars.tools1.forEach(function(d, i) {
								var fid = d;
								
								d3.select("#justifiedBtnTools")
									.append("a")
									.attr("href" , "#")
									.attr("class" , "btn btn-default hrefbuttonTools")
									.attr("id" , function(){ var str = d.replace(' ', ''); return str; })
									.text(d)
									.style( "text-align" , "center" )
									.style("border-style", "solid")
									.style("border-width", "1px")
									.style("border-color", "white")
									.attr("onClick" , "clickTool(this.id)");									
							})
				
							
							
							d3.select("#tools").append("div").attr( "class" , "btn-group " ).attr( "id" , "simple-justified-button-groupGrphTools" );
							d3.select("#simple-justified-button-groupGrphTools").append("div").attr( "class" , "btn-group btn-group-justified" ).attr( "id" , "justifiedBtnTools" ).attr( "role" , "group" ).attr( "aria-label" , "Justified button group" );
							
							dvc.chartConfig.vars.tools2.forEach(function(d, i) {
								var fid = d;
								
								d3.select("#justifiedBtnTools")
									.append("a")
									.attr("href" , "#")
									.attr("class" , "btn btn-default hrefbuttonTools")
									.attr("id" , function(){ var str = d.replace(' ', ''); return str; })
									.text(d)
									.style( "text-align" , "center" )
									.style("border-style", "solid")
									.style("border-width", "1px")
									.style("border-color", "white")
									.attr("onClick" , "clickTool(this.id)");									
							})
								
											
							
							d3.select("#" + dvc.axisLimitTypeSelected).attr("class" , "btn btn-default active");
//							d3.select("#" + dvc.axisTypeSelected).attr("class" , "btn btn-default active");
							
												
									
							/* Build DataGroup selection list ... */			
							var valueArray = [];
							for ( var i=0 ; i < /*dvc.chartConfig.vars.dataGroups*/dvc.config.essential.dataGroups.length; i++ ) { valueArray[i] = i; }
														
				
				
							var dataGroupsArrays = d3.zip( /*dvc.chartConfig.vars.dataGroups*/dvc.config.essential.dataGroups , valueArray );
							dvc.dataGroupsArrays = dataGroupsArrays.sort(function(b, a){ return d3.descending(a[0], b[0])});
								
								
							
							// Build option menu for data Groups
							var dataGroupsOptns = d3.select("#panelHeader")
								.append("select")
								.attr("id","selectDataGroup")
								.attr("style","width:25%")
								.attr("class","chosen-select");
																				
							
							dataGroupsOptns.selectAll("p")
								.data(dvc.dataGroupsArrays)
								.enter()
								.append("option")
								.attr("value", function(d){ return d[1]}) 
								.text(function(d){ return d[0]});
							
							
							$('#selectDataGroup').chosen({width: "25%", allow_single_deselect: true, placeholder_text_single:"Select Data Group"}).on('change',function(evt,params)
							{
		
								if(typeof params != 'undefined')
								{
									
													
									// update selectedIndex and name variables of newly selected option on selection list
									dvc.dataGroupIndex = params.selected;
									dvc.dataGroup = /*dvc.chartConfig.vars.dataGroups*/dvc.config.essential.dataGroups[this.options[this.selectedIndex].value];	
										
									  
									  
									//update both axis variable selection lists when user changes selected dataGroup 
									rebuildAxisSelections();
									  
									  
		
									// update selectedIndex and name variables of newly selected option on selection list
									transitionData();
									 
									 
										
								} // end if ....
								
								
								
								else {
								} // end else ....
								
								
												
							});						
						
						
						
							// Axis type variables ...
							// y- and x-Axis variables ... initialises to first element of "axisType" array in config file 
							dvc.dataGroup = /*dvc.chartConfig.vars.dataGroups*/dvc.config.essential.dataGroups[0];
							dvc.dataGroupIndex = /*dvc.chartConfig.vars.dataGroups*/dvc.config.essential.dataGroups.indexOf(dvc.dataGroup);							
							/*
							
							end building dataGroups selection list
							
							*/
							
							
																	
							// Axis limit variables ...
							// y- and x-Axis variables ... initialises to first element of "axisLimitType" array in config file 
							dvc.axisLimitType = dvc.chartConfig.vars.axisLimitType[0];	
							dvc.axisLimitTypeIndex = dvc.chartConfig.vars.axisLimitType.indexOf(dvc.axisLimitType);
							
							
													
							// Axis type variables ...
							// y- and x-Axis variables ... initialises to first element of "axisType" array in config file 
							dvc.axisType = dvc.chartConfig.vars.axisType[0];
							dvc.axisTypeIndex = dvc.chartConfig.vars.axisLimitType.indexOf(dvc.axisType);
	
							
																			
							// store  axis limits as global variables
//							dvc.min_XVal = dvc.chartConfig.vars.xAxisLimitDefaults[ 0 ];	
//							dvc.max_XVal = dvc.chartConfig.vars.xAxisLimitDefaults[ 1 ];
//							dvc.min_YVal = dvc.chartConfig.vars.yAxisLimitDefaults[ 0 ];	
//							dvc.max_YVal = dvc.chartConfig.vars.yAxisLimitDefaults[ 1 ];
	
	
/*					
							d3.select("#introTitle")	
								.append( "text" )
								.attr("id" ,  "title");
								
							d3.select("#introText")	
								.append( "text" )
								.attr("id" ,  "introTextContent")
								.text(dvc.chartConfig.vars.intro)
*/
							
							
								d3.select("#regressionLine").style( "display" , "none" );
								d3.select("#legendRegressionLine").style( "display" , "none" );
							
							// call function to read in data.json ...
							loadchartData();
					
					
					
							if ( dvc.diagnostics == true ) { console.log("config ended");	}
					
					
					
							return;						
							
						
							
						});	//end load config
						
						return;
						
						
					}// end function loadConfiguration()
			
					
					
					
					
						
					/*
						NAME: 			getSelectedVariableData
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:		
						REQUIRES: 		
						RETURNS: 		
					*/
					function loadchartData()
					{
				
				
						if ( dvc.diagnostics == true ) { console.log("loadchartData started");	}
				
				
						// define file path to data file
							var filepth = './data/data.json';
							
								
							// read in data.json file
							d3.json(filepth, function(json)
							{
								
								
								// store file content as global dvc. variable.
								dvc.data = json;

																
								// call function to draw scatter plot based on content and initialisation variables.								
						        pymChild = new pym.Child({ polling: 5000, renderCallback: makeChart});
							});
				
				
						if ( dvc.diagnostics == true ) { console.log("loadchartData ended"); }
				
				
						return;
							
						
					} // end loadchartData
			
			
			
			
			
			
					/*
						NAME: 			makeChart
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function makeChart()
					{
						
										
						if ( dvc.diagnostics == true ) { console.log("makeChart started");	}

						var graphic = $(/*'#graphic'*/'#container');
						var keypoints = $('#keypoints');
						var footer = $(".footer");
						var pymChild = null;

						$("#eqtnText").remove();
						$("#eqtnTextFiltered").remove();
						$("#controlsSVG").remove();	
						d3.select("#title").text("");
						$(".eqtnCircles").remove();	
						d3.selectAll(".eqtnCircles").remove();
						
						
					   	var threshold_md = 788;
		   				var threshold_sm = /*dvc.optional*/dvc.config.optional.mobileBreakpoint; 
						
						
		  
						//set variables for chart dimensions dependent on width of #graphic
						if (graphic.width() < threshold_sm) {
								var margin = {top: /*dvc.*/dvc.config.optional.margin_sm[0], right: /*dvc.*/dvc.config.optional.margin_sm[1], bottom: /*dvc.*/dvc.config.optional.margin_sm[2], left: /*dvc.*/dvc.config.optional.margin_sm[3]}; 
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_sm[1]) / /*dvc.*/dvc.config.optional.aspectRatio_sm[0]) - margin.top - margin.bottom;
						} else if (graphic.width() < threshold_md){
								var margin = {top: /*dvc.*/dvc.config.optional.margin_md[0], right: /*dvc.*/dvc.config.optional.margin_md[1], bottom: /*dvc.*/dvc.config.optional.margin_md[2], left: /*dvc.*/dvc.config.optional.margin_md[3]}; 
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_md[1]) / /*dvc.*/dvc.config.optional.aspectRatio_md[0]) - margin.top - margin.bottom;
						} else {
								var margin = {top: /*dvc.*/dvc.config.optional.margin_lg[0], right: /*dvc.*/dvc.config.optional.margin_lg[1], bottom: /*dvc.*/dvc.config.optional.margin_lg[2], left: /*dvc.*/dvc.config.optional.margin_lg[3]}
								var chart_width = graphic.width() - margin.left - margin.right;
								var height = Math.ceil((chart_width * /*dvc.*/dvc.config.optional.aspectRatio_lg[1]) / /*dvc.*/dvc.config.optional.aspectRatio_lg[0]) - margin.top - margin.bottom;
						}
						
						
						
						
										
						
						
//						mobileThresholdCheck();						
									
				
						// iniitalise padding variables
/*
						dvc.Padding_top = 50;
						dvc.Padding_right = 300;
						dvc.Padding_left = 0;
						dvc.Padding_bottom = 150;
						dvc.yPadding = 100;
						dvc.xPadding = 100;
*/
						dvc.Padding_top = margin.top;
						dvc.Padding_right = margin.right;
						dvc.Padding_left = margin.left;
						dvc.Padding_bottom = margin.bottom;
						dvc.yPadding = 100;
						dvc.xPadding = 100;
						
						
						
						//graphHeight = Math.ceil( (  containerDivWidth * graphic_aspect_height ) / graphic_aspect_width ) - dvc.margin.top - dvc.margin.bottom;
						
						
						
						// call function to return minimum & maximum values for both x- and y-axis based on whether user has selected fixed or data values as the axes ranges
						defineAxisLimits();
						
						
						
						// set up new SVG element to attach D3 and SVG DOM components												 
						svg = d3.select("#container")
							.append( "svg" )
							.attr( "class" , "SVG" )
							.attr( "id" , "graphSVG" )
							.attr( "x" , 0 )
							.attr( "y" , 0 )
							.attr( "width" , containerDivWidth )	
							.attr( "height" , containerDivHeight/**1.0*/ );					
						
						/*
						equationcirclesAttributes = [
													[	"unfiltered" 	, dvc.colourPalette[0], 15 , ( containerDivWidth * 0.35 ) , ( containerDivHeight * 1.1 )	],
													[	"filtered" 		, dvc.colourPalette[1], 15 , ( containerDivWidth * 0.35 ) , ( containerDivHeight * 1.2 )	]
										];*/
										
										
						equationRectsAttributes = [
													[	"unfiltered" 	, dvc.colourPalette[0], 125 , ( containerDivWidth * 0.20 ) , ( containerDivHeight * 1.07 ) , 40	],
													[	"filtered" 		, dvc.colourPalette[1], 125 , ( containerDivWidth * 0.20 ) , ( containerDivHeight * 1.17 ) , 40	]
										];
						
												/*
						equationcircles = svg.selectAll("circle")
		                        .data(equationcirclesAttributes)
				                .enter()
								.append("circle")
								.attr("class" , "eqtnCircles" );*/
						
									/*			
						equationRects = svg.selectAll("rect")
		                        .data(equationRectsAttributes)
				                .enter()
								.append("rect")
								.attr("class" , "eqtnRects" );						
						*/
														
							
						d3.select( "#container" ).append( "div" ).attr( "id" , "xAxisSlider" ).style("display", "none");
						d3.select( "#container" ).append( "div" ).attr( "id" , "yAxisSlider" ).style("display", "none");
						
						
						
						/*
						
						build x-Axis data groups selection list
						
						*/														
						// initialise temporary array to hold numeric values associated to drop selection options. 1 for each selection list option
						valueArray = [];
						for ( var i=0 ; i<dvc.chartConfig.vars.variables[dvc.dataGroupIndex].length; i++ ) { valueArray[i] = i; }
						
						

						

						// initialise x-Axis range slider to filter plotted dots w.r.t. x-Axis				
						$("#xAxisSlider").slider({
							Range: true,
							min : 0,
							max : 9,
							values :  [ 0.0 , 9.0 ],
							step : 0.1,
							option :"animate",
							slide : function( event, ui ) // fired if time-slider interacted with
							{	  
							
							
								// store and update global variables with new slider values
								dvc.min_XVal = ui.values[ 0 ];	
								dvc.max_XVal = ui.values[ 1 ];
								

								// Update x-Axis values limits imposed by user using associated slider
								d3.select( "#xAxis_minFilterValue" ).text(dvc.min_XVal.toFixed(1) );
								d3.select( "#xAxis_maxFilterValue" ).text(dvc.max_XVal.toFixed(1) );		
								
								
								
								// call function to transition view
								transitionData();
								
								
								return;
								
											
							}
							
														
						});	// end xAxisSlider definition
						
						
						
						d3.select( "#xAxisSlider" ).style( "left" , ( /*dvc.*/margin.left + dvc.xPadding + 15 ) + "px" );
						d3.select( "#xAxisSlider" ).style( "top" , ( graphHeight + dvc.yPadding + /*dvc.*/margin.top + 75 ) + "px" );
						d3.select( "#xAxisSlider" ).style( "width" , ( containerDivWidth - /*dvc.*/margin.left - /*dvc.*/margin.right - dvc.xPadding + 5 ) + "px" );						
												


						// build and manipulate data array s to help populate y-axis array...
						var XdataVariablesArrays = d3.zip( dvc.chartConfig.vars.variables[dvc.dataGroupIndex] , valueArray );		//	var codeoccyzip = d3.zip(dvc.allOcc, dvc.allCode);						
						dvc.XdataVariablesArrays = XdataVariablesArrays.sort(function(b, a){ return d3.descending(a[0], b[0])});	// dvc.codeoccyzip = codeoccyzip.sort(function(b, a){ return d3.descending(a[0], b[0])});										
						
						
						
						// Build option menu for x-Axis
						var xAxisOptns = d3.select("#container")
							.append("select")
							.attr("id","selectxAxisGroup")
							.attr("style","width:15%")
							.attr("class","chosen-select")
							.attr("position" , "absolute")
							.attr("left" , "385px")
							.attr("top" , "55px").style("display", "none");
							
					
					
						// populate variable selection list.
						xAxisOptns.selectAll("p")
							.data(dvc.XdataVariablesArrays)
							.enter()
							.append("option")
							.attr("value", function(d){ return d[1]}) 
							.text(function(d){ return d[0]});
							
								
														
						// define dimensions and functionality associated with selection list ... 
						$('#selectxAxisGroup').chosen({width: "15%", allow_single_deselect: true, placeholder_text_single:"Select x-Axis variable"}).on('change',function(evt,params)
						{
	
	
	
							// if selection list variable is valid selection ...
							if(typeof params != 'undefined')
							{		
							
							
								
								// update selectedIndex and name variables of newly selected option on selection list
								dvc.selectedXVariableIndex = params.selected;
								dvc.selectedXVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][dvc.selectedXVariableIndex];	
								dvc.selectedXUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][this.selectedIndex];

							
							
								// update selectedIndex and name variables of newly selected option on selection list
								d3.select("#xAxisLabel").text(dvc.selectedXVariable + " (" + dvc.selectedXUnits + ")");
							
							
										
								// transition and update scatter plot based on new user selection
								transitionData();
							
								
									
							} // end if ....
							
							
							
							else {
							} // end else ....
											
						});		
						

									
						/* initialise all variables for onLoad scenario */
						// x-Axis variables ...initialises to first element of "variables" array in config file 
						dvc.selectedXVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][0];
						dvc.selectedXVariableIndex = dvc.chartConfig.vars.variables[dvc.dataGroupIndex].indexOf(dvc.selectedXVariable);
						dvc.selectedXUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][0];				
						
						

						// initialise x-Axis range slider to filter plotted dots w.r.t. x-Axis				
						$("#yAxisSlider").slider({
							Range: true,
							min : 0,
							max : 9,
							values : [ 0.0 , 9 ],
							step : 0.1,
							orientation : "vertical",
							option :"animate",
							slide : function( event, ui ) // fired if time-slider interacted with
							{	 
														
							
								// store and update global variables with new slider values
								dvc.min_YVal = ui.values[ 0 ];	
								dvc.max_YVal = ui.values[ 1 ];
																

								// Update x-Axis values limits imposed by user using associated slider
								d3.select( "#yAxis_minFilterValue" ).text( dvc.min_YVal.toFixed(1) );
								d3.select( "#yAxis_maxFilterValue" ).text( dvc.max_YVal.toFixed(1) );										
								
								
								// call function to transition view
								transitionData();
								
								
								return;
								
											
							}
							
							
						});		// end yAxisSlider definition	
						
						
						
						/*
						
						begin building y-axis selection list
						
						*/
						// initialise temporary array to hold numeric values associated to drop selection options. 1 for each selection list option
						valueArray = [];
						for ( var i=0 ; i<dvc.chartConfig.vars.variables[dvc.dataGroupIndex].length; i++ ) { valueArray[i] = i; }
												

						// build and manipulate data array s to help populate y-axis array...
						var YdataVariablesArrays = d3.zip( dvc.chartConfig.vars.variables[dvc.dataGroupIndex] , valueArray );		//	var codeoccyzip = d3.zip(dvc.allOcc, dvc.allCode);						
						dvc.YdataVariablesArrays = YdataVariablesArrays.sort(function(b, a){ return d3.descending(a[0], b[0])});	// dvc.codeoccyzip = codeoccyzip.sort(function(b, a){ return d3.descending(a[0], b[0])});										
						
						
						// Build option menu for y-Axis
						var yAxisOptns = d3.select("#container")
							.append("select")
							.attr("id","selectyAxisGroup")
							.attr("style","width:15%")
							.attr("class","chosen-select");
					
					
						// populate variable selection list.
						yAxisOptns.selectAll("p")
							.data(dvc.YdataVariablesArrays)
							.enter()
							.append("option")
							.attr("value", function(d, i){ return d[1]}) 
							.text(function(d){ return d[0]});						
						
						
						// define dimensions and functionality associated with selection list ... 
						$('#selectyAxisGroup').chosen({width: "15%", allow_single_deselect: true, placeholder_text_single:"Select y-Axis variable"}).on('change',function(evt,params)
						{
	
	
	
							// if selected option is valid selection ...
							if(typeof params != 'undefined')
							{		
							
								
								// update selectedIndex and name variables of newly selected option on selection list
								dvc.selectedYVariableIndex = params.selected;
								dvc.selectedYVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][dvc.selectedYVariableIndex];	
								dvc.selectedYUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][this.selectedIndex];

							
								// update selectedIndex and name variables of newly selected option on selection list
								d3.select("#yAxisLabel").text(/*dvc.selectedYVariable + " (" + dvc.selectedYUnits + ")"*/dvc.config.essential.xAxisScale);

																		
								// transition and update scatter plot based on new user selection
								transitionData();
								
								
									
							} // end if ....
							
							
							
							else {
							} // end else ....
							
							
											
						});	
											
						
						
						
						// y-Axis variables ...
						// y-Axis variables ...initialises to second element of "variables" array in config file 
						dvc.selectedYVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][1];
						dvc.selectedYVariableIndex = dvc.chartConfig.vars.variables[dvc.dataGroupIndex].indexOf(dvc.selectedYVariable);	
						dvc.selectedYUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][1];	
						
												
						document.getElementById("selectyAxisGroup").selectedIndex = dvc.selectedYVariableIndex;
						document.getElementById("selectyAxisGroup_chosen").selectedIndex = dvc.selectedYVariableIndex;
						
											
						$('#selectyAxisGroup').val(dvc.selectedYVariableIndex);	
						$('#selectyAxisGroup').trigger("chosen:updated");							
						
						
						d3.select("#title").text( dvc.dataGroup + ": How does " + dvc.selectedYVariable + " vary with " + dvc.selectedXVariable + "...");						
						d3.select( "#yAxisSlider" ).style( "left" , ( dvc.xPadding - 50 ) + "px" );
						d3.select( "#yAxisSlider" ).style( "top" , ( dvc.yPadding + /*dvc.*/margin.top - 10 ) + "px" );
						d3.select( "#yAxisSlider" ).style( "height" , graphHeight  + "px" );
						
						

						// append text to show value attached to first/min handle on y-Axis slider
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" , "yAxis_minFilterValue" )
							.attr( "position" , "absolute" )
							.attr( "x" , 15 )
							.attr( "y" , graphHeight + dvc.yPadding + /*dvc.*/margin.top - 50 )
							.text(  $( "#yAxisSlider" ).slider( "values", 0 ).toFixed(1) ).style("display", "none");
							
						

						// append text to show value attached to second/max handle on y-Axis slider
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" , "yAxis_maxFilterValue" )
							.attr( "position" , "absolute" )
							.attr( "x" , 15 )
							.attr( "y" , dvc.yPadding + /*dvc.*/margin.top - 95 )
							.text( $( "#yAxisSlider" ).slider( "values", 1 ).toFixed(1) ).style("display", "none");;
							
							
						
						// append text to show value attached to first/min handle on x-Axis slider				
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" , "xAxis_minFilterValue" )
							.attr( "position" , "absolute" )
							.attr( "x" , ( /*dvc.*/margin.left + dvc.xPadding - 50) )
							.attr( "y" , graphHeight + dvc.yPadding + /*dvc.*/margin.top + 20 )
							.text( $( "#xAxisSlider" ).slider( "values", 0 ).toFixed(1) ).style("display", "none");;

						

						// append text to show value attached to second/max handle on x-Axis slider
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" , "xAxis_maxFilterValue" )
							.attr( "position" , "absolute" )
							.attr( "x" , ( /*dvc.*/margin.left + dvc.xPadding  ) + ( containerDivWidth - /*dvc.*/margin.left - /*dvc.*/margin.right - dvc.xPadding  ) )
							.attr( "y" , graphHeight + dvc.yPadding + /*dvc.*/margin.top + 20  )
							.text( $( "#xAxisSlider" ).slider( "values", 1 ).toFixed(1) ).style("display", "none");;	
							
							
							
						// define clipPath around scatterplot frame
						svg.append("defs").append("clipPath")
							.attr("id", "clip")
							.append("rect")
							.attr("width", containerDivWidth - /*dvc.*/margin.left - /*dvc.*/margin.right )
							.attr("height", graphHeight );
							
						
													

						
						// generate text string to hold function to access data.josn to return data array associated with slected variables on x- and y-axis 
						var xVariable = "dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[ " + dvc.selectedXVariableIndex + " ]";
						var yVariable = "dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[ " + dvc.selectedYVariableIndex + " ]";
						
						
						
			
						
						//y domain calculations	: zero to intelligent max choice, or intelligent min and max choice,  or interval chosen manually
						if (dvc.config.essential.yAxisScale == "auto_zero_max" ){
							var maxVal = Math.ceil(d3.max(eval(yVariable))/100)*100;
						   	var yDomain = [	0, maxVal ];
						} else if (dvc.config.essential.yAxisScale == "auto_min_max" ){
							var minVal = Math.floor(d3.min(eval(yVariable))/100)*100;
							var maxVal = Math.ceil(d3.max(eval(yVariable))/100)*100;
							var yDomain = [ minVal, maxVal ];
						} else {
						   var yDomain = dvc.config.essential.yAxisScale;
						}
						
			
						
						//x domain calculations	: zero to intelligent max choice, or intelligent min and max choice,  or interval chosen manually
						if (dvc.config.essential.xAxisScale == "auto_zero_max" ){
							var maxVal = Math.ceil(d3.max(eval(xVariable))/100)*100;
						   	var xDomain = [	0, maxVal ];
						} else if (dvc.config.essential.xAxisScale == "auto_min_max" ){
							var minVal = Math.floor(d3.min(eval(xVariable))/100)*100;
							var maxVal = Math.ceil(d3.max(eval(xVariable))/100)*100;
							var xDomain = [ minVal, maxVal ];
						} else {
						   var xDomain = dvc.config.essential.xAxisScale;
						}
							 
						
						
					
						
						
						dvc.xScale = d3.scale.linear().domain(xDomain).range([ /*dvc.yPadding*/margin.left , ( containerDivWidth - /*dvc.*//*margin.left -*/ /*dvc.*/margin.right/*dvc.width - dvc.xPadding*/ ) ]);
						dvc.xAxis = d3.svg.axis().scale(dvc.xScale).orient("bottom").ticks(/*10*/num_ticks).tickFormat(d3.format(",.1f"));
						svg.append("g")
							.attr("class", "x axis")
							.attr("id", "focusXAxis")
							.attr("transform", "translate(0," + ( graphHeight/*dvc.height*/ /*+ dvc.yPadding*/ + dvc.Padding_top ) + ")")
							.call(dvc.xAxis);	
						
						
						
						// set up y-axis scsale ... 
						dvc.yScale = d3.scale.linear().domain(yDomain).range([ ( graphHeight) , 0 ]);
						dvc.yAxis = d3.svg.axis().scale(dvc.yScale).orient("left").ticks(/*10*/num_ticks).tickFormat(d3.format(",.0f"));								
						svg.append("g")
							.attr("class", "y axis")
							.attr("id", "focusYAxis")
							.attr("transform", "translate(" + /*dvc.xPadding */dvc.Padding_left + "," + dvc.Padding_top + ")")
							.call(dvc.yAxis);
						
						
														
						// draw tick grid lines extending from y-axis ticks on axis across scatter graph
						dvc.xticks = svg.selectAll('#focusXAxis').selectAll('.tick');					 
						dvc.xticks.append('svg:line')
							.attr( 'id' , "xAxisTicks" )
							.attr( 'y0' , 0 )
							.attr( 'y1' , -graphHeight )
							.attr( 'x1' , 0 )
							.attr( 'x2',  0 );
						
								
														
						// draw tick grid lines extending from y-axis ticks on axis across scatter graph
						dvc.yticks = svg.selectAll('#focusYAxis').selectAll('.tick');					 
						dvc.yticks.append('svg:line')
							.attr( 'id' , "yAxisTicks" )
							.attr( 'y0' , 0 )
							.attr( 'y1' , 0 )
							.attr( 'x1' , 0 )
							.attr( 'x2', containerDivWidth - /*dvc.*/margin.left - /*dvc.*/margin.right/* - dvc.xPadding*/);
						
				
						
						
						
						
				
						// call function to calculate y-axis intersect value and y-axis value at X(max) based on data range relationship y- ansd x-axes
						calculateYValues();
						
						
						// construct new variable to contain selected axis variables by zipping relevant daat together into multiple 2-element arrays
						dvc.currentData = d3.zip( eval(xVariable) , eval(yVariable) );
						
						
						
						dvc.arrayNames = [ "dvc.currentData" ,  "dvc.currentFilteredData" ];
						dvc.currentFilteredData = dvc.currentData.filter(function(d, i) { if ( ( d[0] >= dvc.min_XVal && d[0] <= dvc.max_XVal ) && ( d[1] >= dvc.min_YVal && d[1] <= dvc.max_YVal ) ) { return d; } });
						
			

 						// call function for each coordinate pairing held in global variable to [re]calculate best fit line parameter values of XX and XY
 						// store these in global arrays.
						dvc.currentData.forEach(calculateLeastSquaresValues);
						dvc.currentFilteredData.forEach(calculateFilteredLeastSquaresValues);



 						// Calculate best fit line parameter values using values/arrays from calculateLeastSquaresValues
						calculateLeastSquaresLine();
						calculateFilteredLeastSquaresLine();
						
						
						// select all plotted circles, and draw based on data values ... 													
						svg.selectAll(".circle")
							.data( dvc.currentData )
							.enter()
							.append( "circle" )
							.attr( "id" , "currentCircles" )
							.attr( "cx" , function( d , i ) { return dvc.xScale( dvc.currentData[i][0] ); })
							.attr( "cy" , function( d , i ) { return dvc.yScale( dvc.currentData[i][1] )+dvc.Padding_top; })
							.attr( "r" , function( d , i ) {
								
								if ( d[0] == d[1] ) { return 8; }
								else { return 4; }
							})
							.attr( "fill" , function ( d , i ) {
								
								if ( d[0] == d[1] ) { return dvc.colourPalette[0]; }
								else { return dvc.colourPalette[0]; }
							})
							.attr( "stroke" , dvc.colourPalette[0] )
							.attr( "opacity" , 1.00 )
							.attr( "fill-opacity" , 0.25 )
							.attr( "display" , "inline")
							.on("mouseover" , function( d, i ){

								if ( d[0] == d[1] ) { return; }
								else { return; }
									
							})
							.on("mouseout" , function( d, i ){								
							});
							
							
							
						// update x-Axis variable based on initial selection							
						d3.select( "#graphSVG" )
							.append( "text" )
		                	.attr('class', 'unit')
							.attr( "id" , "xAxisLabel" )
							.attr( "x" , containerDivWidth - margin.right )
							.style( "text-anchor" , "end" )
							.attr( "y" , graphHeight + /*dvc.*/margin.bottom + /*dvc.*/margin.top + dvc.Padding_top )
							.text(/*dvc.selectedYVariable + " (" + dvc.selectedYUnits + ")"*/dvc.config.essential.xAxisLabel);	
							
							
							
						// update y-Axis variable based on initial selection							
						d3.select( "#graphSVG" )
							.append( "text" )
		                	.attr('class', 'unit')
							.attr( "id" , "yAxisLabel" )
							.attr( "x" , /*dvc.*/margin.left )
							.attr( "y" , 25 )
							.text( /*dvc.selectedYVariable + " (" + dvc.selectedYUnits + ")"*/dvc.config.essential.yAxisLabel );
							

							
						// draw 1:1 equality line
						svg.selectAll('#focusYAxis')
							.append( 'svg:line' )
							.attr( "id"  , "equalityLine" )/*
							.attr("clip-path", "url(#clip)")*/
							.style( "stroke" , dvc.colourPalette[3] )
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.y1_value )
							.attr( 'x2' , dvc.max_max_VariableValue * dvc.xValIncrement )
							.attr( 'y2' , dvc.y2_value )
							.style("display" , function(d,i){
								if ( dvc.config.optional.equalityLine == true ){
									return "inline";
								}
								else {
									return "none";
								}
							});
							
							
							
						// draw FILTERED DATA regression line
/*						svg.selectAll('#focusYAxis')
							.append( 'svg:line' )
							.attr( "id"  , "regressionFilteredLine" )
							.attr("clip-path", "url(#clip)")
							.style( "stroke" , dvc.colourPalette[0] )
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.yScale(dvc.yATminXFiltered) )
							.attr( 'x2' , ( dvc.xDomainArray[1] - dvc.xDomainArray[0] ) * dvc.xValIncrement )
							.attr( 'y2' , dvc.yScale(dvc.yATmaxXFiltered) )
							.on("mouseover" , function(){ })
							.on("mouseout" , function(){ });
*/
	
	
							
						// draw FULL DATA regression line
						svg.selectAll('#focusYAxis')
							.append( 'svg:line' )
							.attr( "id"  , "regressionLine" )
							.attr( "clip-path", "url(#clip)")
							.style( "stroke" , dvc.colourPalette[1] )
							.style( "stroke-width" , "3px" )
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.yScale(dvc.yATminX) )
							.attr( 'x2' , ( dvc.xDomainArray[1] - dvc.xDomainArray[0] ) * dvc.xValIncrement )
							.attr( 'y2' , dvc.yScale(dvc.yATmaxX) )
							.on("mouseover" , function(){ })
							.on("mouseout" , function(){ })
							.style("display" , function(d,i){
								if ( dvc.config.optional.regressionLine == true ){
									return "inline";
								}
								else {
									return "none";
								}
							});
							
						
						//create link to source				
						d3.select(".footer").append("p")
							.text("Source: ")
							.append("a")
							.attr("href", dvc.config.essential.sourceURL)
							.attr("target", "_blank")
							.html(dvc.config.essential.sourceText);


					    if (pymChild) { pymChild.sendHeight(); }
				
				
						if ( dvc.diagnostics == true ) { console.log("makeChart ended");	}
				
				
						return;
						 

					 } // end function makeChart()
						
			
			
			
				
					/*
						NAME: 			transitionData
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function transitionData()
					{
				
				
						if ( dvc.diagnostics == true ) { console.log("transitionData started");	}
						
				
						$(".tick").remove();						
						$("#unfilteredEqtnText").remove();
						$("#filteredEqtnText").remove();
						$(".equations").remove();
						d3.selectAll(".eqtnCircles").remove();											
						

						// update x- and y-axis labels based on new selections
						d3.select("#xAxisLabel").text(dvc.selectedXVariable + " (" + dvc.selectedXUnits + ")");	
						d3.select("#yAxisLabel").text(dvc.selectedYVariable + " (" + dvc.selectedYUnits + ")");
						d3.select("#title").text( dvc.dataGroup + ": How does " + dvc.selectedYVariable + " vary with " + dvc.selectedXVariable + "...");
						
												
						
						// generate text string to hold function to access data.josn to return data array associated with slected variables on x- and y-axis 
						var xVariable = "dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[" + dvc.selectedXVariableIndex + "]";
						var yVariable = "dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[" + dvc.selectedYVariableIndex + "]";
						
						
						
						// construct new variable to contain selected axis variables by zipping relevant data together into multiple 2-element arrays
						dvc.currentData = d3.zip( eval(xVariable) , eval(yVariable) );					
						
						
						
						// call function to return minimum & maximum values for both x- and y-axis based on whether user has selected fixed or data values as the axes ranges
						defineAxisLimits();
						
						
						
						// update xScale and yScale components 
						dvc.xScale.domain([ dvc.minimum_xData , dvc.maximum_xData ]);
						dvc.yScale.domain([ dvc.minimum_yData , dvc.maximum_yData ]);
						
						

						if ( dvc.axisType == "linear" ) {
							dvc.xScale.domain([ dvc.minimum_xData , dvc.maximum_xData ]);
							dvc.yScale.domain([ dvc.minimum_yData , dvc.maximum_yData ]);
						}
						else if ( dvc.axisType == "log" ) {
							dvc.xScale.domain([ 1 , 10 ]);
							dvc.yScale.domain([ 1 , 10 ]);
						}													


						// modify x-axis min and max limits using slider min and max limits if user changes from fixed axis range to data value axis range
						$( "#xAxisSlider" ).slider( "option" , "min" , dvc.minimum_xData );
						$( "#xAxisSlider" ).slider( "option" , "max" , dvc.maximum_xData );


						// modify y-axis min and max limits using slider min and max limits if user changes from fixed axis range to data value axis range
						$( "#yAxisSlider" ).slider( "option" , "min" , dvc.minimum_yData );
						$( "#yAxisSlider" ).slider( "option" , "max" , dvc.maximum_yData );

						
						
						if ( dvc.min_XVal.toFixed(1) < dvc.minimum_xData )
						{
							
							$( "#xAxis_minFilterValue" ).text( dvc.minimum_xData.toFixed(1) );
						}
						else
						{
							$( "#xAxis_minFilterValue" ).text( dvc.min_XVal.toFixed(1) );
						}


						if ( dvc.max_XVal.toFixed(1) > dvc.maximum_xData )						
						{
							$( "#xAxis_maxFilterValue" ).text( dvc.maximum_xData.toFixed(1) );							
						}
						else
						{
							$( "#xAxis_maxFilterValue" ).text( dvc.max_XVal.toFixed(1) );							
						}

						
						
						if ( dvc.min_YVal.toFixed(1) < dvc.minimum_yData )
						{
							
							$( "#yAxis_minFilterValue" ).text( dvc.minimum_yData.toFixed(1) );
						}
						else
						{
							$( "#yAxis_minFilterValue" ).text( dvc.min_YVal.toFixed(1) );
						}


						if ( dvc.max_YVal.toFixed(1) > dvc.maximum_yData )						
						{
							$( "#yAxis_maxFilterValue" ).text( dvc.maximum_yData.toFixed(1) );							
						}
						else
						{
							$( "#yAxis_maxFilterValue" ).text( dvc.max_YVal.toFixed(1) );							
						}
						
						


						// update xAxis and yAxis based xScale and yScale components 
						dvc.xAxis = d3.svg.axis().scale(dvc.xScale).orient("bottom").ticks(num_ticks).tickFormat(d3.format(",.1f"));
						dvc.yAxis = d3.svg.axis().scale(dvc.yScale).orient("left").ticks(num_ticks).tickFormat(d3.format(",.1f"));
						
				
				
						// call function to calcualte y-axis intersect value and y-axis value atg X(max) based on data range relationship y- ansd x-axes
						calculateYValues();


						// call functions to calculate linear regresion line of best fit for plotted data points
						dvc.LeastSquareArray_XY = [];
						dvc.LeastSquareArray_XX = [];
						dvc.LeastSquareArray_X = [];
						dvc.LeastSquareArray_Y = [];
	
					
						dvc.filteredLeastSquareArray_XY = [];
						dvc.filteredLeastSquareArray_XX = [];
						dvc.filteredLeastSquareArray_X = [];
						dvc.filteredLeastSquareArray_Y = [];



						// clear global variables relating to regression line of best fit ready for updating
 						dvc.regressionSlopeGradient = 0;
 						dvc.sigmaXY = 0;
 						dvc.sigmaXX = 0;
 						dvc.sigmaX = 0;
 						dvc.sigmaY = 0;
 						dvc.minX = 0;
 						dvc.maxX = 0;
						
						
						
						dvc.arrayNames = [ "dvc.currentData" ,  "dvc.currentFilteredData" ];
						dvc.currentFilteredData = dvc.currentData.filter(function(d, i) { if ( ( d[0] >= dvc.min_XVal && d[0] <= dvc.max_XVal ) && ( d[1] >= dvc.min_YVal && d[1] <= dvc.max_YVal ) ) { return d; } });
											


 						// call function for each coordinate pairing held in global variable to [re]calculate best fit line parameter values of XX and XY
 						// store these in global arrays.
						dvc.currentData.forEach(calculateLeastSquaresValues);
						dvc.currentFilteredData.forEach(calculateFilteredLeastSquaresValues);



 						// Calculate best fit line parameter values using values/arrays from calculateLeastSquaresValues
						calculateLeastSquaresLine();
						calculateFilteredLeastSquaresLine();					
						
						
						
						// transition x- and y-axes based on their new domain and range definitions
						svg.select(".x.axis").transition().duration(1000).call(dvc.xAxis);							
						svg.select(".y.axis").transition().duration(1000).call(dvc.yAxis);
						
												
											
						// transition circles based on new data selections. Modify CSS based on value relationship to x- and y-axis ranges imposed by user
						svg.selectAll( "circle" )
							.data(dvc.currentData)
							.transition()
							.ease("linear")
							.delay(function(d, i){ return i * 10; })
							.duration(500)
							.attr( "cx" , function( d , i ) { return dvc.xScale( dvc.currentData[i][0] ); })
							.attr( "cy" , function( d , i ) { return dvc.yScale( dvc.currentData[i][1] ) + dvc.Padding_top; })
							.attr( "r" , function( d , i ) {
								
								if ( d[0] == d[1] ) { return 8; }
								else { return 4; }
							})
							.attr( "fill" , function ( d , i )
							{
								if ( ( d[0] >= dvc.min_XVal && d[0] <= dvc.max_XVal ) && ( d[1] >= dvc.min_YVal && d[1] <= dvc.max_YVal ) )
								{
								
									if ( d[0] == d[1] ) { return dvc.colourPalette[0]; }
									else { return dvc.colourPalette[0]; }	
								}
								else
								{
									return dvc.colourPalette[1];
								}
							})	

							.attr( "opacity" , function ( d , i )
							{
								
								if ( ( d[0] >= dvc.min_XVal && d[0] <= dvc.max_XVal ) && ( d[1] >= dvc.min_YVal && d[1] <= dvc.max_YVal ) )
								{									
									return 0.66;	
								}
								else
								{
									return 0.33;
								}
							})							
							.attr( "stroke" , function ( d , i )
							{
								if ( ( d[0] >= dvc.min_XVal && d[0] <= dvc.max_XVal ) && ( d[1] >= dvc.min_YVal && d[1] <= dvc.max_YVal ) )
								{
								
									return "blue";
								}
								else
								 {
									return "red";
								}
							});
						
						
												
						// transition and redraw equality line based on new axis variables.						
						svg.selectAll('#equalityLine')
							.transition()
							.ease("linear")
							.duration(1000)
							.attr("clip-path", "url(#clip)")
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.y1_value )
							.attr( 'x2' , dvc.max_max_VariableValue * dvc.xValIncrement )
							.attr( 'y2' , dvc.y2_value );
							
							
						// transition and redraw FULL DATA regression line
						svg.selectAll('#regressionLine')
							.transition()
							.ease("linear")
							.duration(1000)
							.attr("clip-path", "url(#clip)")
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.yScale(dvc.yATminX) )
							.attr( 'x2' , ( dvc.xDomainArray[1] - dvc.xDomainArray[0] ) * dvc.xValIncrement )
							.attr( 'y2' , dvc.yScale(dvc.yATmaxX) );
							
							
						// transition and redraw FILTERED DATA regression line
						svg.selectAll( "#regressionFilteredLine" )
							.transition()
							.ease("linear")
							.duration(1000)
							.attr( "clip-path" , "url(#clip)" )
							.attr( 'x1' , 0 )
							.attr( 'y1' , dvc.yScale(dvc.yATminXFiltered) )
							.attr( 'x2' , ( dvc.xDomainArray[1] - dvc.xDomainArray[0] ) * dvc.xValIncrement )
							.attr( 'y2' , dvc.yScale(dvc.yATmaxXFiltered) );							



						// redraw tick grid lines extending from x-axis ticks on axis across scatter graph
						dvc.xticks = svg.selectAll('#focusXAxis').selectAll('.tick');					 
						dvc.xticks.append('svg:line')
							.attr( 'id' , "xAxisTicks" )
							.attr( 'y0' , 0 )
							.attr( 'y1' , -graphHeight )
							.attr( 'x1' , 0 )
							.attr( 'x2',  0 );	
								
														
						// redraw tick grid lines extending from y-axis ticks on axis across scatter graph
						dvc.yticks = svg.selectAll('#focusYAxis').selectAll('.tick');					 
						dvc.yticks.append('svg:line')
							.attr( 'id' , "yAxisTicks" )
							.attr( 'y0' , 0 )
							.attr( 'y1' , 0 )
							.attr( 'x1' , 0 )
							.attr( 'x2', containerDivWidth - dvc.margin.left - dvc.margin.right - dvc.xPadding/*dvc.width - dvc.Padding_right*/ );
											
							
						useButton = false;
				
				
						if ( dvc.diagnostics == true ) { console.log("transitionData ended");	}
				
				
						return;
						 
						 
					 }// end transitionData()
					 
					 


				
					/*
						NAME: 			calculateYValues
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function calculateYValues()
					{
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateYValues started");	}
				
				
						// determine pixel incrementation between sequential integer steps of x- and y-axis. Necessary for redrawing equalityLine
						dvc.xValIncrement = dvc.xScale(1) - dvc.xScale(0);					
						dvc.yValIncrement = dvc.yScale(0) - dvc.yScale(1);
						
						
						// store domains of both axes as local variable (Note: dvc.xScale.domain([1]) does not seem to return necessary value)
						// then determine higher maximum domain value from both
						dvc.xDomainArray = dvc.xScale.domain();
						dvc.yDomainArray = dvc.yScale.domain();	
						

						// store as local variables minimum and maximum values of both axes, afer comparing									
						dvc.min_min_VariableValue = d3.min( [ dvc.xDomainArray[0] , dvc.yDomainArray[0] ]);
						dvc.max_min_VariableValue = d3.max( [ dvc.xDomainArray[0] , dvc.yDomainArray[0] ]);
						dvc.min_max_VariableValue = d3.min( [ dvc.xDomainArray[1] , dvc.yDomainArray[1] ]);
						dvc.max_max_VariableValue = d3.max( [ dvc.xDomainArray[1] , dvc.yDomainArray[1] ]);								
						
						
						// calculate pixel values for y-component of equality line based on relationship scenario between yAxis(min) and xAxis(min)
						if ( dvc.xDomainArray[0] > dvc.yDomainArray[0] ) {
							
							dvc.y1_value = graphHeight - ( ( dvc.max_min_VariableValue - dvc.min_min_VariableValue ) * dvc.yValIncrement );
							dvc.y2_value = graphHeight - ( ( dvc.max_max_VariableValue + ( dvc.max_min_VariableValue - dvc.min_min_VariableValue ) ) * dvc.yValIncrement );
						}
						
						else if ( dvc.xDomainArray[0] < dvc.yDomainArray[0] ) {

							dvc.y1_value = graphHeight - ( ( dvc.min_min_VariableValue - dvc.max_min_VariableValue ) * dvc.yValIncrement );
							dvc.y2_value = graphHeight - ( ( dvc.max_max_VariableValue + ( dvc.min_min_VariableValue - dvc.max_min_VariableValue ) ) * dvc.yValIncrement );
						}
						else {							
							dvc.y1_value = graphHeight - ( ( dvc.min_min_VariableValue - dvc.max_min_VariableValue ) * dvc.yValIncrement );
							dvc.y2_value = graphHeight - ( ( dvc.max_max_VariableValue ) * dvc.yValIncrement );
						}
										
				
						if ( dvc.diagnostics == true ) { console.log("calculateYValues ended");	}
				
				
						return;						
			
						
					} // end function calculateYValues()
			
			
				

				
					/*
						NAME: 			defineAxisLimits
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function defineAxisLimits()
					{
				
				
						if ( dvc.diagnostics == true ) { console.log("defineAxisLimits started");	}
				
				
						// set axis maximum values to fixed or floating values based on the data content
						if ( dvc.axisLimitType == "Fixed" )
						{	
							dvc.minimum_xData = 0;
							dvc.minimum_yData = 0;
							
							dvc.maximum_xData = 9;
							dvc.maximum_yData = 9;												  
						}
						else
						{	
							
														
							// store functions to determine minimum and maximum values for each axis as local variables
							var minimum_xData = "dvc.minimum_xData = d3.min(dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[parseInt(" + dvc.selectedXVariableIndex + ")] , function( d , i ){ return Math.floor(d); })";
							var minimum_yData = "dvc.minimum_yData = d3.min(dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[parseInt(" + dvc.selectedYVariableIndex + ")] , function( d , i ){ return Math.floor(d); })";							
							var maximum_xData = "dvc.maximum_xData = d3.max(dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[parseInt(" + dvc.selectedXVariableIndex + ")] , function( d , i ){ return Math.ceil(d); })";
							var maximum_yData = "dvc.maximum_yData = d3.max(dvc.data.vars.dataGroups."+ dvc.dataGroup + ".dataValues[parseInt(" + dvc.selectedYVariableIndex + ")] , function( d , i ){ return Math.ceil(d); })";


							// evaluate each local variables
							dvc.minimum_xData = eval(minimum_xData);						
							dvc.minimum_yData = eval(minimum_yData);
							dvc.maximum_xData = eval(maximum_xData);
							dvc.maximum_yData = eval(maximum_yData);						
						}
						
						
//						console.log("dvc.minimum_xData: " + dvc.minimum_xData + "		dvc.maximum_xData: " + dvc.maximum_xData);
//						console.log("dvc.minimum_yData: " + dvc.minimum_yData + "		dvc.maximum_yData: " + dvc.maximum_yData);
						
//						$( "#xAxisSlider" ).slider( "option", "values",  [ dvc.minimum_xData, dvc.maximum_xData ] );
//						$( "#yAxisSlider" ).slider( "option", "values",  [ dvc.minimum_yData, dvc.maximum_yData ] );
//						
//						d3.select( "#xAxis_minFilterValue" ).text(dvc.minimum_xData);
//						d3.select( "#xAxis_maxFilterValue" ).text(dvc.maximum_xData);			
//						
//						d3.select( "#yAxis_minFilterValue" ).text(dvc.minimum_yData);
//						d3.select( "#yAxis_maxFilterValue" ).text(dvc.maximum_yData);
						
//						console.log("after");			
				
				
						if ( dvc.diagnostics == true ) { console.log("defineAxisLimits ended");	}
				
				
						return;
						 
						 
					 }// end function defineAxisLimits()
			
			
				

				
					/*
						NAME: 			switchAxes
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function switchAxes()
					{
						 
						console.log("switchAxes");
						 
						return;
						 
						 
					}// end function switchAxes()
			
			


				
					/*
						NAME: 			calculateLeastSquaresValues
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function calculateLeastSquaresValues(element, index, array)
					{
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateLeastSquares started");	}
				
				
						/* calculations necessary for regression line on FULL DATA .... */


						//	console.log('a[' + index + '] = ' + element);
						// store separately X- and Y-component of coordinate
					 	var X = (element.toString()).split(",")[0];
					 	var Y = (element.toString()).split(",")[1];
						
						
						
						// calculate XY for each coordinate pairing
					 	var XY = parseFloat(X*Y);
						
						
						
						// calculate XX for each coordinate pairing
					 	var XX = parseFloat(X*X);
						
						
						
						// add latest value for X onto dedicated array
					 	dvc.LeastSquareArray_X.push(X);
						
						
						
						// add latest value for Y onto dedicated array					 	
					 	dvc.LeastSquareArray_Y.push(Y);
						
						
						
						// add latest value for XY onto dedicated array					 	
					 	dvc.LeastSquareArray_XY.push(XY);
						
						
						
						// add latest value for XX onto dedicated array					 						 	
					 	dvc.LeastSquareArray_XX.push(XX);
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateLeastSquares ended");	}
				
				
						return;
						
						
					 	
 					}// end function calculateLeastSquares()
			
			


				
					/*
						NAME: 			calculateFilteredLeastSquaresValues
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function calculateFilteredLeastSquaresValues(element, index, array)
					{ 
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateFilteredLeastSquaresValues started");	}
				
				
						/* calculations necessary for regression line on FILTERED DATA .... */
						

						//	console.log('a[' + index + '] = ' + element);
						// store separately X- and Y-component of coordinate
					 	var X = (element.toString()).split(",")[0];
					 	var Y = (element.toString()).split(",")[1];
						
						
						
						// calculate XY for each coordinate pairing
					 	var XY = parseFloat(X*Y);
						
						
						
						// calculate XX for each coordinate pairing
					 	var XX = parseFloat(X*X);
						
						
						
						// add latest value for X onto dedicated array
					 	dvc.filteredLeastSquareArray_X.push(X);
						
						
						// add latest value for Y onto dedicated array					 	
					 	dvc.filteredLeastSquareArray_Y.push(Y);
						
						
						
						// add latest value for XY onto dedicated array					 	
					 	dvc.filteredLeastSquareArray_XY.push(XY);
						
						
						
						// add latest value for XX onto dedicated array					 						 	
					 	dvc.filteredLeastSquareArray_XX.push(XX);
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateFilteredLeastSquaresValues started");	}
				
				
						return;
						
						
					 	
 					}// end function calculateFilteredLeastSquaresValues()
			
			

			
				
					/*
						NAME: 			calculateLeastSquaresLine
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function calculateLeastSquaresLine()
 					{ 
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateLeastSquaresLine started");	}
				
				
						/* calculations necessary for regression line on FULL DATA .... */						


						// calculate sum of X co-ordinates
						dvc.sigmaX = d3.sum(dvc.LeastSquareArray_X);
						
						

						// calculate sum of Y co-ordinates
						dvc.sigmaY = d3.sum(dvc.LeastSquareArray_Y);



						// calculate sum of X*Y co-ordinates
						dvc.sigmaXY = d3.sum(dvc.LeastSquareArray_XY);



						//calculate sum of X*X co-ordinates
						dvc.sigmaXX = d3.sum(dvc.LeastSquareArray_XX);



						// calculate top part to equation for calculating the line's slope
						var top = ( dvc.sigmaXY - ( ( dvc.sigmaX * dvc.sigmaY ) / dvc.LeastSquareArray_X.length ) );



						// calculate bottom part to equation for calculating the line's slope						
						var bottom = ( ( dvc.sigmaXX - ( ( dvc.sigmaX*dvc.sigmaX ) / dvc.LeastSquareArray_X.length ) ) );



						// calculate the regression line's slope												
						dvc.regressionSlopeGradient =  top / bottom;



						// mean value of X component of all coordinates
						var xMean = dvc.sigmaX / dvc.LeastSquareArray_X.length;



						// mean value of Y component of all coordinates
						var yMean = dvc.sigmaY / dvc.LeastSquareArray_Y.length;



						// calculate line intercept
						var yIntercept = yMean - ( dvc.regressionSlopeGradient * xMean );



						// store final line equation
						dvc.eqtnText = dvc.selectedYVariable + " = (" + dvc.regressionSlopeGradient.toFixed(2) + "*" + dvc.selectedXVariable + ") + " + yIntercept.toFixed(2);
						
						
													 			
			
						// determine pixel incrementation between sequential integer steps of x- and y-axis. Necessary for redrawing equalityLine
						dvc.xValIncrement = dvc.xScale(1) - dvc.xScale(0);					
						dvc.yValIncrement = dvc.yScale(0) - dvc.yScale(1);
						
						
						
						// store domains of both axes as local variable (Note: dvc.xScale.domain([1]) does not seem to return necessary value)
						// then determine higher maximum domain value from both
						dvc.xDomainArray = dvc.xScale.domain();
						dvc.yDomainArray = dvc.yScale.domain();		



						// calculate y-axis value at xAxis(min)
						dvc.yATminX = dvc.regressionSlopeGradient * dvc.xDomainArray[0] + yIntercept;



						// calculate y-axis value at xAxis(max)
						dvc.yATmaxX = dvc.regressionSlopeGradient * dvc.xDomainArray[1] + yIntercept;
						
/*					
						
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" ,  "unfilteredEqtnText" )
							.attr( "class" ,  "equations" )
							.attr( "x" , dvc.margin.left + dvc.xPadding )
							.attr( "y" , dvc.margin.top + dvc.yPadding )
							.style( "color" , dvc.colourPalette[1] )
							.style( "font-size" , "1.5em" )
							.style(  "text-anchor" , "start" )
							.text(  "Unfiltered data: " + dvc.eqtnText );
*/
				
						if ( dvc.diagnostics == true ) { console.log("calculateLeastSquaresLine ended");	}
				
				
						return;
						
					 	
 					 } // end function calculateLeastSquaresLine()
			
			

			
				
					/*
						NAME: 			calculateFilteredLeastSquaresLine
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
					function calculateFilteredLeastSquaresLine()
 					{
				
				
						if ( dvc.diagnostics == true ) { console.log("calculateFilteredLeastSquaresLine started");	}
				
				
						/* calculations necessary for regression line on FILTERED DATA .... */						


						// calculate sum of X co-ordinates
						dvc.sigmaFilteredX = d3.sum(dvc.filteredLeastSquareArray_X);
						
						

						// calculate sum of Y co-ordinates
						dvc.sigmaFilteredY = d3.sum(dvc.filteredLeastSquareArray_Y);



						// calculate sum of X*Y co-ordinates
						dvc.sigmaFilteredXY = d3.sum(dvc.filteredLeastSquareArray_XY);



						//calculate sum of X*X co-ordinates
						dvc.sigmaFilteredXX = d3.sum(dvc.filteredLeastSquareArray_XX);



						// calculate top part to equation for calculating the line's slope
						var top = ( dvc.sigmaFilteredXY - ( ( dvc.sigmaFilteredX * dvc.sigmaFilteredY ) / dvc.filteredLeastSquareArray_X.length ) );
						
						

						// calculate bottom part to equation for calculating the line's slope						
						var bottom = ( ( dvc.sigmaFilteredXX - ( ( dvc.sigmaFilteredX*dvc.sigmaFilteredX ) / dvc.filteredLeastSquareArray_X.length ) ) );



						// calculate the regression line's slope												
						dvc.regressionFilteredSlopeGradient =  top / bottom;



						// mean value of X component of all coordinates
						var xMean = dvc.sigmaFilteredX / dvc.filteredLeastSquareArray_X.length;



						// mean value of Y component of all coordinates
						var yMean = dvc.sigmaFilteredY / dvc.filteredLeastSquareArray_Y.length;



						// calculate line intercept
						var yIntercept = yMean - ( dvc.regressionFilteredSlopeGradient * xMean );



						// store final line equation
						dvc.eqtnTextFiltered = dvc.selectedYVariable + " = (" + dvc.regressionFilteredSlopeGradient.toFixed(2) + "*" + dvc.selectedXVariable + ") + " + yIntercept.toFixed(2);
						
													 			
			
						// determine pixel incrementation between sequential integer steps of x- and y-axis. Necessary for redrawing equalityLine
						dvc.xValIncrement = dvc.xScale(1) - dvc.xScale(0);					
						dvc.yValIncrement = dvc.yScale(0) - dvc.yScale(1);
						
						
						
						// store domains of both axes as local variable (Note: dvc.xScale.domain([1]) does not seem to return necessary value)
						// then determine higher maximum domain value from both
						dvc.xDomainArray = dvc.xScale.domain();
						dvc.yDomainrray = dvc.yScale.domain();



						// calculate y-axis value at xAxis(min)
						dvc.yATminXFiltered = dvc.regressionFilteredSlopeGradient * dvc.xDomainArray[0] + yIntercept;



						// calculate y-axis value at xAxis(max)
						dvc.yATmaxXFiltered = dvc.regressionFilteredSlopeGradient * dvc.xDomainArray[1] + yIntercept;
						
/*						
						d3.select( "#graphSVG" )
							.append( "text" )
							.attr( "id" ,  "filteredEqtnText" )
							.attr( "class" ,  "equations" )
							.attr( "x" , dvc.margin.left + dvc.xPadding )
							.attr( "y" , dvc.margin.top + dvc.yPadding  - 40 )
							.style( "color" , dvc.colourPalette[1] )
							.style( "font-size" , "1.5em" )
							.style(  "text-anchor" , "start" )
							.text(  "Filtered data: " + dvc.eqtnTextFiltered );							
*/
				
						if ( dvc.diagnostics == true ) { console.log("calculateFilteredLeastSquaresLine ended");	}
				
				
						return;
						
					 	
 					 }// end function calculateFilteredLeastSquaresValues()
			
			
				


					/*
						NAME: 			rebuildAxisSelections
						DESCRIPTION: 	
						CALLED FROM:	
						CALLS:			
						REQUIRES: 		
						RETURNS: 		
					*/
//					function rebuildAxisSelections()
//					{
//				
//				
//						if ( dvc.diagnostics == true ) { console.log("rebuildAxisSelections started");	}						
//						
//						
//						// determine the new index for the selected item on the dataGroups array
//						dvc.dataGroupIndex = document.getElementById('selectDataGroup').selectedIndex;					
//				
//			
//						// empty x-Axis variable option list
//						$("#selectXVariable").remove();
//						$("#selectxAxisGroup").remove();
//						$("#selectxAxisGroup_chosen").remove();
//
//
//						/* rebuild x-axis based on new dataGroup selection */
//						// populate proxy 'valueArray' array with sequential ascending numbers euqal to the number of variables in the dataGroup 
//						valueArray = [];			
//						for ( var i=0 ; i<dvc.chartConfig.vars.variables[dvc.dataGroupIndex].length; i++ ) { valueArray[i] = i; }												
//
//
//						// update content on x-axis arrays based on new selections to populate x-axis chosen selection list
//						var XdataVariablesArrays = d3.zip( dvc.chartConfig.vars.variables[dvc.dataGroupIndex] , valueArray );		//	var codeoccyzip = d3.zip(dvc.allOcc, dvc.allCode);						
//						dvc.XdataVariablesArrays = XdataVariablesArrays.sort(function(b, a){ return d3.descending(a[0], b[0])});	// dvc.codeoccyzip = codeoccyzip.sort(function(b, a){ return d3.descending(a[0], b[0])});										
//						
//						
//						// Build option menu for x-Axis
//						var xAxisOptns = d3.select("#container")
//							.append("select")
//							.attr("id","selectxAxisGroup")
//							.attr("style","width:15%")
//							.attr("class","chosen-select")
//							.style("position","absolute").style("display", "none");
//							
//							
//						// populate option menu for y-Axis					
//						xAxisOptns.selectAll("p")
//							.data(dvc.XdataVariablesArrays)
//							.enter()
//							.append("option")
//							.attr("value", function(d){ return d[1]}) 
//							.text(function(d){ return d[0]});		
//
//
//						// update content on x-axis arrays based on new selections to populate x-axis chosen selection list
//						$('#selectxAxisGroup').chosen({width: "15%", allow_single_deselect: true, placeholder_text_single:"Select x-Axis variable"}).on('change',function(evt,params)
//						{
//	
//							if(typeof params != 'undefined')
//							{		
//							
//								
//								// update selectedIndex and name variables of newly selected option on selection list
//								dvc.selectedXVariableIndex = params.selected;
//								dvc.selectedXVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][dvc.selectedXVariableIndex];	
//								dvc.selectedXUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][this.selectedIndex];
//
//							
//								// update selectedIndex and name variables of newly selected option on selection list
//								d3.select("#xAxisLabel").text(dvc.selectedXVariable + " (" + dvc.selectedXUnits + ")");
//							
//										
//								// transition and update scatter plot based on new user selection
//								transitionData();
//								
//									
//							} // end if ....
//							
//							else {
//							} // end else ....
//											
//						});		
//						
//						
//						// update related x-axis chosen selection list
//						$('selectxAxisGroup').trigger("chosen:updated");	
//
//									
//						/* initialise all variables for onLoad scenario */
//						// x-Axis variables ...initialises to first element of "variables" array in config file 
//						dvc.selectedXVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][0];
//						dvc.selectedXVariableIndex = dvc.chartConfig.vars.variables[dvc.dataGroupIndex].indexOf(dvc.selectedXVariable);
//						dvc.selectedXUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][0];
//						
//												
//						// empty y-Axis variable option list
//						$("#selectYVariable").remove();
//						$("#selectyAxisGroup").remove();
//						$("#selectyAxisGroup_chosen").remove();
//
//
//						/* rebuild y-axis based on new dataGroup selection */
//						// populate proxy 'valueArray' array with sequential ascending numbers euqal to the number of variables in the dataGroup 
//						valueArray = [];
//						for ( var i=0 ; i<dvc.chartConfig.vars.variables[dvc.dataGroupIndex].length; i++ ) { valueArray[i] = i; }												
//
//
//						// update content on x-axis arrays based on new selections to populate x-axis chosen selection list
//						var YdataVariablesArrays = d3.zip( dvc.chartConfig.vars.variables[dvc.dataGroupIndex] , valueArray );		//	var codeoccyzip = d3.zip(dvc.allOcc, dvc.allCode);						
//						dvc.YdataVariablesArrays = YdataVariablesArrays.sort(function(b, a){ return d3.descending(a[0], b[0])});	// dvc.codeoccyzip = codeoccyzip.sort(function(b, a){ return d3.descending(a[0], b[0])});										
//						
//						
//						// Build option menu for y-Axis
//						var yAxisOptns = d3.select("#container")
//							.append("select")
//							.attr("id","selectyAxisGroup")
//							.attr("style","width:15%")
//							.attr("class","chosen-select");
//							
//							
//						// populate option menu for y-Axis					
//						yAxisOptns.selectAll("p")
//							.data(dvc.YdataVariablesArrays)
//							.enter()
//							.append("option")
//							.attr("value", function(d, i){ return d[1]}) 
//							.text(function(d){ return d[0]});
//							
//							
//						// define dimensions and functionality for y-axis														
//						$('#selectyAxisGroup').chosen({width: "15%", allow_single_deselect: true, placeholder_text_single:"Select y-Axis variable"}).on('change',function(evt,params)
//						{
//	
//	
//							// if a valid value has been selected
//							if(typeof params != 'undefined')
//							{		
//							
//								
//								// update selectedIndex and name variables of newly selected option on selection list
//								dvc.selectedYVariableIndex = params.selected;
//								dvc.selectedYVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][dvc.selectedYVariableIndex];	
//								dvc.selectedYUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][this.selectedIndex];
//
//							
//								// update selectedIndex and name variables of newly selected option on selection list
//								d3.select("#yAxisLabel").text(dvc.selectedYVariable + " (" + dvc.selectedYUnits + ")");
//							
//										
//								// transition and update scatter plot based on new user selection
//								transitionData();
//								
//									
//							} // end if ....
//							
//							else {
//							} // end else ....
//											
//						});		
//						
//						
//						// update related y-axis chosen selection list
//						$('selectyAxisGroup').trigger("chosen:updated");	
//
//
//						// x-Axis variables ...
//						// default initialises to first element of "variables" array in config file 
//						dvc.selectedXVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][0];
//						dvc.selectedXVariableIndex = dvc.chartConfig.vars.variables[dvc.dataGroupIndex].indexOf(dvc.selectedXVariable);
//						dvc.selectedXUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][0];	
//						
//						
//						// y-Axis variables ...
//						// default initialises to second element of "variables" array in config file 
//						dvc.selectedYVariable = dvc.chartConfig.vars.variables[dvc.dataGroupIndex][1];
//						dvc.selectedYVariableIndex = dvc.chartConfig.vars.variables[dvc.dataGroupIndex].indexOf(dvc.selectedYVariable);	
//						dvc.selectedYUnits = dvc.chartConfig.vars.Units[dvc.dataGroupIndex][1];			
//				
//				
//						if ( dvc.diagnostics == true ) { console.log("rebuildAxisSelections ended");	}
//				
//				
//						return;
//						
//							
//					 }// function rebuildAxisSelections()
							
							
							
							
							
//					function mobileThresholdCheck()
//					{
//																
//						if ( containerDivWidth < tablet_threshold )
//						{							
//							d3.select("#introText").style("display" , "none"); 
//							d3.select("#equations").style("display" , "none");
//							d3.select( "#chartthree" ).attr( "class" , "hide" ); 
//						
//						}	// end if ...
//						else
//						{
//							d3.select("#introText").style("display" , "block");
//							d3.select("#equations").style("display" , "inline"); 
//							d3.select( "#chartthree" ).attr( "class" , "show" );
//							
//						}	// end else ...
//						
//												
//						// logical test to define number of tick lines on x- and y- axes											
//						if ( containerDivWidth < mobile_threshold )
//						{	
//							num_ticks = 5;
//							
//							d3.selectAll(".buttonLbls").style("display" , "none");	
//							
////							for ( var i = 0 ; i<dvc.buttons.length; i++ ) 
////							{	
////								d3.select("#" + dvc.buttons[i][0]).style("width" , dvc.buttons[i][5]).style("height" , dvc.buttons[i][5]).style("left" , (containerDivWidth*(0.20*(i+1))) + "px");								
////								 
////							}// end for ... 	
//							
//							$("#xAxisSlider").attr( "display" , "none" ); // NOT WORKING ....
//							$("#yAxisSlider").attr( "display" , "none" ); // NOT WORKING ....	
//														
//							d3.selectAll(".axis .domain").style( "display" , "none" );
//							d3.selectAll(".axis .line").style( "display" , "none" );		
//							d3.selectAll(".axis").style( "display" , "none" );						
//														
//						}// end if ...
//						else
//						{
//							num_ticks = 10;
//							
//							d3.selectAll(".buttonLbls").style("display" , "inline");
//							
////							for ( var i = 0 ; i<dvc.buttons.length; i++ ) 
////							{	
////								d3.select("#" + dvc.buttons[i][0]).style("width" , dvc.buttons[i][4]).style("height" , dvc.buttons[i][4]).style("left" , (containerDivWidth*(0.20*(i+1))) + "px");
////								
////							}// end for ... 	
//							
//							$("#xAxisSlider").attr( "display" , "inline" ); // NOT WORKING ....
//							$("#yAxisSlider").attr( "display" , "inline" ); // NOT WORKING ....
//							
//							d3.selectAll(".axis .domain").style( "display" , "inline" );	
//							d3.selectAll(".axis .line").style( "display" , "inline" );		
//							d3.selectAll(".axis").style( "display" , "inline" );
//														
//						}// end else ...
//						
//						
////						for ( var i = 0 ; i<dvc.buttons.length; i++ ) 
////						{
////								
////							d3.select("#buttonLbl" + i).style("left" , (containerDivWidth*((i+1)*0.20)) + "px");
////							
////						}// end for ... 
//						
//						
//						// modify height of container2 based on height of buttons
//						d3.select("#container2" ).style("height", $('#scale').height() + "px");
//						
//						
//					}// end function mobileThresholdCheck() 