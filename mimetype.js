//
// mimetype.js - A catalog object of mime types based on file extensions
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//

(function (exports) {
	var path;
	
	// If we're NodeJS I can use the path module.
	// If I'm MongoDB shell, not available.
	if (require !== undefined) {
		path = require('path');
	}
	
	var self = { 
		charset: 'UTF-8',
		catalog: {}
	};
	
	if (exports === undefined) {
		exports = {};
	}

	self.lookup = function (fname, include_charset, default_mime_type) {
		var ext, charset = this.charset;
		
		if (include_charset === undefined) {
			include_charset = false;
		}
		
		if (typeof include_charset === "string") {
			charset = include_charset;
			include_charset = true;
		}

		if (path.extname !== undefined) {
			ext = path.extname(fname).toLowerCase();
		} else if (fname.lastIndexOf('.') > 0) {
			ext = fname.substr(fname.lastIndexOf('.')).toLowerCase();
		} else {
			ext = fname;
		}
		
		// Handle the special cases where their is no extension
		// e..g README, manifest, LICENSE, TODO
		if (ext == "") {
			ext = fname;
		}

		if (self.catalog[ext] !== undefined) {
			if (include_charset === true && 
				self.catalog[ext].indexOf('text/') === 0 &&
				self.catalog[ext].indexOf('charset') < 0) {
				return self.catalog[ext] + '; charset=' + charset;
			} else {
				return self.catalog[ext];
			}
		} else if (default_mime_type !== undefined) {
			if (include_charset === true && 
				default_mime_type.indexOf('text/') === 0) {
				return default_mime_type + '; charset=' + charset;
			}
			return default_mime_type;
		}
		return false;
	};
		
	self.set = function (exts, mime_type_string) {
        var result = true;
        if (exts.indexOf(',')) {
            exts.split(',').forEach(function (ext) {
                ext = ext.trim();
                self.catalog[ext] = mime_type_string;
                if (self.catalog[ext] !== mime_type_string) {
                    result = false;
                }
            });
        } else {
            result = (self.catalog[exts] === mime_type_string);
        }
		return result;
	};
	
	self.del = function (ext) {
		delete self.catalog[ext];
		return (self.catalog[ext] === undefined);
	};
	
	self.forEach = function (callback) {
		Object.keys(self.catalog).forEach(function (ext) {
			callback(ext, self.catalog[ext]);
		});
		return self.catalog;
	};

    /*
	// Quick and dirty list of common mime-types I've run across
	self.set('.txt,.text,.md,README','text/plain');
	self.set('.html,.htm', 'text/html');
	self.set('.js', 'application/javascript');
	self.set('.json', 'application/json');
	self.set('.css', 'text/css');
	self.set('.xml,.dtd', 'text/xml');
	self.set('.csv', 'text/csv');
	self.set('.tsv', 'text/tab-separated-value');
	self.set('.ico', 'image/icon');
	self.set('.jpg,.jpeg,.jpe', 'image/jpeg');
	self.set('.qt,.mov', 'video/quicktime');
	self.set('.mpg,.mpeg,.mpe', 'video/mpeg');
	self.set('.png', 'image/png');
	self.set('.doc,.docx', 'application/msword');
	self.set('.xls', 'application/excel');
	self.set('.ppt', 'application/powerpoint');
	self.set('.bin', 'application/octet-stream');
	self.set('.pdf', 'application/pdf');
	self.set('.rtf', 'application/rtf');
	self.set(".ai,.eps,.ps", "application/postscript");
	self.set(".tar", "application/x-tar");
	self.set(".gz", "application/x-gzip");
	self.set(".tar.gz,.tgz", "application/x-tar-gz");
	self.set(".tar.bz,.tbz", "application/x-tar-bzip");
	self.set(".zip", "application/zip");
	self.set(".bz", "application/bzip");
	self.set(".au,.snd", "audio/basic");
	self.set(".wav", "audio/x-wav");
	self.set(".aif,.aiff,.aifc", "audio/x-aiff");
	self.set(".ogx", "application/ogg");
	self.set(".ogg,.spx,.oga", "audio/ogg");
	self.set(".ogv", "video/ogg");
	self.set(".mp3,.mp2,.mpga", "audio/mpeg");
	self.set(".rpm", "audio/x-pn-realaudio-plugin");
	self.set(".ram,.rm", "audio/x-pn-realaudio");
	self.set(".ra", "audio/x-realaudio");
	self.set(".flac", "audio/flac");
	self.set(".aac", "audio/x-aac");

	self.set(".gif", "image/gif");
	self.set(".jpg,.jpeg,.jpe", "image/jpeg");
	self.set(".png", "image/png");
	self.set(".tif,.tiff", "image/tiff");
	// Not sure if this is real for .raw files
	self.set(".raw", "image/x-raw");
	self.set(".mpg,.mpeg,.mpe", "video/mpeg");
	self.set(".mp4,.m4a", "video/mp4");
	self.set(".qt,.mov", "video/quicktime");
	self.set(".avi", "video/x-msvideo");
	self.set(".asf", "video/x-ms-asf");
	self.set(".asx", "video/x-ms-asx");
	self.set(".wmv", "video/x-ms-wmv");
	*/
	
    // From Apache project's mime type list.
    self.set(".ez", "application/andrew-inset");
    self.set(".aw", "application/applixware");
    self.set(".atom", "application/atom+xml");
    self.set(".atomcat", "application/atomcat+xml");
    self.set(".atomsvc", "application/atomsvc+xml");
    self.set(".ccxml", "application/ccxml+xml");
    self.set(".cu", "application/cu-seeme");
    self.set(".davmount", "application/davmount+xml");
    self.set(".ecma", "application/ecmascript");
    self.set(".emma", "application/emma+xml");
    self.set(".epub", "application/epub+zip");
    self.set(".pfr", "application/font-tdpfr");
    self.set(".stk", "application/hyperstudio");
    self.set(".jar", "application/java-archive");
    self.set(".ser", "application/java-serialized-object");
    self.set(".class", "application/java-vm");
    self.set(".js", "application/javascript");
    self.set(".json", "application/json");
    self.set(".lostxml", "application/lost+xml");
    self.set(".hqx", "application/mac-binhex40");
    self.set(".cpt", "application/mac-compactpro");
    self.set(".mrc", "application/marc");
    self.set(".ma,.nb,.mb", "application/mathematica");
    self.set(".mathml", "application/mathml+xml");
    self.set(".mbox", "application/mbox");
    self.set(".mscml", "application/mediaservercontrol+xml");
    self.set(".mp4s", "application/mp4");
    self.set(".doc,.dot", "application/msword");
    self.set(".mxf", "application/mxf");
    self.set(".oda", "application/oda");
    self.set(".opf", "application/oebps-package+xml");
    self.set(".ogx", "application/ogg");
    self.set(".onetoc,.onetoc2,.onetmp,.onepkg", "application/onenote");
    self.set(".xer", "application/patch-ops-error+xml");
    self.set(".pdf", "application/pdf");
    self.set(".pgp", "application/pgp-encrypted");
    self.set(".asc,.sig", "application/pgp-signature");
    self.set(".prf", "application/pics-rules");
    self.set(".p10", "application/pkcs10");
    self.set(".p7m,.p7c", "application/pkcs7-mime");
    self.set(".p7s", "application/pkcs7-signature");
    self.set(".cer", "application/pkix-cert");
    self.set(".crl", "application/pkix-crl");
    self.set(".pkipath", "application/pkix-pkipath");
    self.set(".pki", "application/pkixcmp");
    self.set(".pls", "application/pls+xml");
    self.set(".ai,.eps,.ps", "application/postscript");
    self.set(".cww", "application/prs.cww");
    self.set(".rdf", "application/rdf+xml");
    self.set(".rif", "application/reginfo+xml");
    self.set(".rnc", "application/relax-ng-compact-syntax");
    self.set(".rl", "application/resource-lists+xml");
    self.set(".rld", "application/resource-lists-diff+xml");
    self.set(".rs", "application/rls-services+xml");
    self.set(".rsd", "application/rsd+xml");
    self.set(".rss", "application/rss+xml");
    self.set(".rtf", "application/rtf");
    self.set(".sbml", "application/sbml+xml");
    self.set(".scq", "application/scvp-cv-request");
    self.set(".scs", "application/scvp-cv-response");
    self.set(".spq", "application/scvp-vp-request");
    self.set(".spp", "application/scvp-vp-response");
    self.set(".sdp", "application/sdp");
    self.set(".setpay", "application/set-payment-initiation");
    self.set(".setreg", "application/set-registration-initiation");
    self.set(".shf", "application/shf+xml");
    self.set(".smi,.smil", "application/smil+xml");
    self.set(".rq", "application/sparql-query");
    self.set(".srx", "application/sparql-results+xml");
    self.set(".gram", "application/srgs");
    self.set(".grxml", "application/srgs+xml");
    self.set(".ssml", "application/ssml+xml");
    self.set(".plb", "application/vnd.3gpp.pic-bw-large");
    self.set(".psb", "application/vnd.3gpp.pic-bw-small");
    self.set(".pvb", "application/vnd.3gpp.pic-bw-var");
    self.set(".tcap", "application/vnd.3gpp2.tcap");
    self.set(".pwn", "application/vnd.3m.post-it-notes");
    self.set(".aso", "application/vnd.accpac.simply.aso");
    self.set(".imp", "application/vnd.accpac.simply.imp");
    self.set(".acu", "application/vnd.acucobol");
    self.set(".atc,.acutc", "application/vnd.acucorp");
    self.set(".air", "application/vnd.adobe.air-application-installer-package+zip");
    self.set(".xdp", "application/vnd.adobe.xdp+xml");
    self.set(".xfdf", "application/vnd.adobe.xfdf");
    self.set(".azf", "application/vnd.airzip.filesecure.azf");
    self.set(".azs", "application/vnd.airzip.filesecure.azs");
    self.set(".azw", "application/vnd.amazon.ebook");
    self.set(".acc", "application/vnd.americandynamics.acc");
    self.set(".ami", "application/vnd.amiga.ami");
    self.set(".apk", "application/vnd.android.package-archive");
    self.set(".cii", "application/vnd.anser-web-certificate-issue-initiation");
    self.set(".fti", "application/vnd.anser-web-funds-transfer-initiation");
    self.set(".atx", "application/vnd.antix.game-component");
    self.set(".mpkg", "application/vnd.apple.installer+xml");
    self.set(".swi", "application/vnd.arastra.swi");
    self.set(".aep", "application/vnd.audiograph");
    self.set(".mpm", "application/vnd.blueice.multipass");
    self.set(".bmi", "application/vnd.bmi");
    self.set(".rep", "application/vnd.businessobjects");
    self.set(".cdxml", "application/vnd.chemdraw+xml");
    self.set(".mmd", "application/vnd.chipnuts.karaoke-mmd");
    self.set(".cdy", "application/vnd.cinderella");
    self.set(".cla", "application/vnd.claymore");
    self.set(".c4g,.c4d,.c4f,.c4p,.c4u", "application/vnd.clonk.c4group");
    self.set(".csp", "application/vnd.commonspace");
    self.set(".cdbcmsg", "application/vnd.contact.cmsg");
    self.set(".cmc", "application/vnd.cosmocaller");
    self.set(".clkx", "application/vnd.crick.clicker");
    self.set(".clkk", "application/vnd.crick.clicker.keyboard");
    self.set(".clkp", "application/vnd.crick.clicker.palette");
    self.set(".clkt", "application/vnd.crick.clicker.template");
    self.set(".clkw", "application/vnd.crick.clicker.wordbank");
    self.set(".wbs", "application/vnd.criticaltools.wbs+xml");
    self.set(".pml", "application/vnd.ctc-posml");
    self.set(".ppd", "application/vnd.cups-ppd");
    self.set(".car", "application/vnd.curl.car");
    self.set(".pcurl", "application/vnd.curl.pcurl");
    self.set(".rdz", "application/vnd.data-vision.rdz");
    self.set(".fe_launch", "application/vnd.denovo.fcselayout-link");
    self.set(".dna", "application/vnd.dna");
    self.set(".mlp", "application/vnd.dolby.mlp");
    self.set(".dpg", "application/vnd.dpgraph");
    self.set(".dfac", "application/vnd.dreamfactory");
    self.set(".geo", "application/vnd.dynageo");
    self.set(".mag", "application/vnd.ecowin.chart");
    self.set(".nml", "application/vnd.enliven");
    self.set(".esf", "application/vnd.epson.esf");
    self.set(".msf", "application/vnd.epson.msf");
    self.set(".qam", "application/vnd.epson.quickanime");
    self.set(".slt", "application/vnd.epson.salt");
    self.set(".ssf", "application/vnd.epson.ssf");
    self.set(".es3,.et3", "application/vnd.eszigno3+xml");
    self.set(".ez2", "application/vnd.ezpix-album");
    self.set(".ez3", "application/vnd.ezpix-package");
    self.set(".fdf", "application/vnd.fdf");
    self.set(".mseed", "application/vnd.fdsn.mseed");
    self.set(".seed,.dataless", "application/vnd.fdsn.seed");
    self.set(".gph", "application/vnd.flographit");
    self.set(".ftc", "application/vnd.fluxtime.clip");
    self.set(".fm,.frame,.maker,.book", "application/vnd.framemaker");
    self.set(".fnc", "application/vnd.frogans.fnc");
    self.set(".ltf", "application/vnd.frogans.ltf");
    self.set(".fsc", "application/vnd.fsc.weblaunch");
    self.set(".oas", "application/vnd.fujitsu.oasys");
    self.set(".oa2", "application/vnd.fujitsu.oasys2");
    self.set(".oa3", "application/vnd.fujitsu.oasys3");
    self.set(".fg5", "application/vnd.fujitsu.oasysgp");
    self.set(".bh2", "application/vnd.fujitsu.oasysprs");
    self.set(".ddd", "application/vnd.fujixerox.ddd");
    self.set(".xdw", "application/vnd.fujixerox.docuworks");
    self.set(".xbd", "application/vnd.fujixerox.docuworks.binder");
    self.set(".fzs", "application/vnd.fuzzysheet");
    self.set(".txd", "application/vnd.genomatix.tuxedo");
    self.set(".ggb", "application/vnd.geogebra.file");
    self.set(".ggt", "application/vnd.geogebra.tool");
    self.set(".gex,.gre", "application/vnd.geometry-explorer");
    self.set(".gmx", "application/vnd.gmx");
    self.set(".kml", "application/vnd.google-earth.kml+xml");
    self.set(".kmz", "application/vnd.google-earth.kmz");
    self.set(".gqf,.gqs", "application/vnd.grafeq");
    self.set(".gac", "application/vnd.groove-account");
    self.set(".ghf", "application/vnd.groove-help");
    self.set(".gim", "application/vnd.groove-identity-message");
    self.set(".grv", "application/vnd.groove-injector");
    self.set(".gtm", "application/vnd.groove-tool-message");
    self.set(".tpl", "application/vnd.groove-tool-template");
    self.set(".vcg", "application/vnd.groove-vcard");
    self.set(".zmm", "application/vnd.handheld-entertainment+xml");
    self.set(".hbci", "application/vnd.hbci");
    self.set(".les", "application/vnd.hhe.lesson-player");
    self.set(".hpgl", "application/vnd.hp-hpgl");
    self.set(".hpid", "application/vnd.hp-hpid");
    self.set(".hps", "application/vnd.hp-hps");
    self.set(".jlt", "application/vnd.hp-jlyt");
    self.set(".pcl", "application/vnd.hp-pcl");
    self.set(".pclxl", "application/vnd.hp-pclxl");
    self.set(".sfd-hdstx", "application/vnd.hydrostatix.sof-data");
    self.set(".x3d", "application/vnd.hzn-3d-crossword");
    self.set(".mpy", "application/vnd.ibm.minipay");
    self.set(".afp,.listafp,.list3820", "application/vnd.ibm.modcap");
    self.set(".irm", "application/vnd.ibm.rights-management");
    self.set(".sc", "application/vnd.ibm.secure-container");
    self.set(".icc,.icm", "application/vnd.iccprofile");
    self.set(".igl", "application/vnd.igloader");
    self.set(".ivp", "application/vnd.immervision-ivp");
    self.set(".ivu", "application/vnd.immervision-ivu");
    self.set(".xpw,.xpx", "application/vnd.intercon.formnet");
    self.set(".qbo", "application/vnd.intu.qbo");
    self.set(".qfx", "application/vnd.intu.qfx");
    self.set(".rcprofile", "application/vnd.ipunplugged.rcprofile");
    self.set(".irp", "application/vnd.irepository.package+xml");
    self.set(".xpr", "application/vnd.is-xpr");
    self.set(".jam", "application/vnd.jam");
    self.set(".rms", "application/vnd.jcp.javame.midlet-rms");
    self.set(".jisp", "application/vnd.jisp");
    self.set(".joda", "application/vnd.joost.joda-archive");
    self.set(".ktz,.ktr", "application/vnd.kahootz");
    self.set(".karbon", "application/vnd.kde.karbon");
    self.set(".chrt", "application/vnd.kde.kchart");
    self.set(".kfo", "application/vnd.kde.kformula");
    self.set(".flw", "application/vnd.kde.kivio");
    self.set(".kon", "application/vnd.kde.kontour");
    self.set(".kpr,.kpt", "application/vnd.kde.kpresenter");
    self.set(".ksp", "application/vnd.kde.kspread");
    self.set(".kwd,.kwt", "application/vnd.kde.kword");
    self.set(".htke", "application/vnd.kenameaapp");
    self.set(".kia", "application/vnd.kidspiration");
    self.set(".kne,.knp", "application/vnd.kinar");
    self.set(".skp,.skd,.skt,.skm", "application/vnd.koan");
    self.set(".sse", "application/vnd.kodak-descriptor");
    self.set(".lbd", "application/vnd.llamagraphics.life-balance.desktop");
    self.set(".lbe", "application/vnd.llamagraphics.life-balance.exchange+xml");
    self.set(".123", "application/vnd.lotus-1-2-3");
    self.set(".apr", "application/vnd.lotus-approach");
    self.set(".pre", "application/vnd.lotus-freelance");
    self.set(".nsf", "application/vnd.lotus-notes");
    self.set(".org", "application/vnd.lotus-organizer");
    self.set(".scm", "application/vnd.lotus-screencam");
    self.set(".lwp", "application/vnd.lotus-wordpro");
    self.set(".portpkg", "application/vnd.macports.portpkg");
    self.set(".mcd", "application/vnd.mcd");
    self.set(".mc1", "application/vnd.medcalcdata");
    self.set(".cdkey", "application/vnd.mediastation.cdkey");
    self.set(".mwf", "application/vnd.mfer");
    self.set(".mfm", "application/vnd.mfmp");
    self.set(".flo", "application/vnd.micrografx.flo");
    self.set(".igx", "application/vnd.micrografx.igx");
    self.set(".mif", "application/vnd.mif");
    self.set(".daf", "application/vnd.mobius.daf");
    self.set(".dis", "application/vnd.mobius.dis");
    self.set(".mbk", "application/vnd.mobius.mbk");
    self.set(".mqy", "application/vnd.mobius.mqy");
    self.set(".msl", "application/vnd.mobius.msl");
    self.set(".plc", "application/vnd.mobius.plc");
    self.set(".txf", "application/vnd.mobius.txf");
    self.set(".mpn", "application/vnd.mophun.application");
    self.set(".mpc", "application/vnd.mophun.certificate");
    self.set(".xul", "application/vnd.mozilla.xul+xml");
    self.set(".cil", "application/vnd.ms-artgalry");
    self.set(".cab", "application/vnd.ms-cab-compressed");
    self.set(".xls,.xlm,.xla,.xlc,.xlt,.xlw", "application/vnd.ms-excel");
    self.set(".xlam", "application/vnd.ms-excel.addin.macroenabled.12");
    self.set(".xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12");
    self.set(".xlsm", "application/vnd.ms-excel.sheet.macroenabled.12");
    self.set(".xltm", "application/vnd.ms-excel.template.macroenabled.12");
    self.set(".eot", "application/vnd.ms-fontobject");
    self.set(".chm", "application/vnd.ms-htmlhelp");
    self.set(".ims", "application/vnd.ms-ims");
    self.set(".lrm", "application/vnd.ms-lrm");
    self.set(".cat", "application/vnd.ms-pki.seccat");
    self.set(".stl", "application/vnd.ms-pki.stl");
    self.set(".ppt,.pps,.pot", "application/vnd.ms-powerpoint");
    self.set(".ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12");
    self.set(".pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12");
    self.set(".sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12");
    self.set(".ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12");
    self.set(".potm", "application/vnd.ms-powerpoint.template.macroenabled.12");
    self.set(".mpp,.mpt", "application/vnd.ms-project");
    self.set(".docm", "application/vnd.ms-word.document.macroenabled.12");
    self.set(".dotm", "application/vnd.ms-word.template.macroenabled.12");
    self.set(".wps,.wks,.wcm,.wdb", "application/vnd.ms-works");
    self.set(".wpl", "application/vnd.ms-wpl");
    self.set(".xps", "application/vnd.ms-xpsdocument");
    self.set(".mseq", "application/vnd.mseq");
    self.set(".mus", "application/vnd.musician");
    self.set(".msty", "application/vnd.muvee.style");
    self.set(".nlu", "application/vnd.neurolanguage.nlu");
    self.set(".nnd", "application/vnd.noblenet-directory");
    self.set(".nns", "application/vnd.noblenet-sealer");
    self.set(".nnw", "application/vnd.noblenet-web");
    self.set(".ngdat", "application/vnd.nokia.n-gage.data");
    self.set(".n-gage", "application/vnd.nokia.n-gage.symbian.install");
    self.set(".rpst", "application/vnd.nokia.radio-preset");
    self.set(".rpss", "application/vnd.nokia.radio-presets");
    self.set(".edm", "application/vnd.novadigm.edm");
    self.set(".edx", "application/vnd.novadigm.edx");
    self.set(".ext", "application/vnd.novadigm.ext");
    self.set(".odc", "application/vnd.oasis.opendocument.chart");
    self.set(".otc", "application/vnd.oasis.opendocument.chart-template");
    self.set(".odb", "application/vnd.oasis.opendocument.database");
    self.set(".odf", "application/vnd.oasis.opendocument.formula");
    self.set(".odft", "application/vnd.oasis.opendocument.formula-template");
    self.set(".odg", "application/vnd.oasis.opendocument.graphics");
    self.set(".otg", "application/vnd.oasis.opendocument.graphics-template");
    self.set(".odi", "application/vnd.oasis.opendocument.image");
    self.set(".oti", "application/vnd.oasis.opendocument.image-template");
    self.set(".odp", "application/vnd.oasis.opendocument.presentation");
    self.set(".ods", "application/vnd.oasis.opendocument.spreadsheet");
    self.set(".ots", "application/vnd.oasis.opendocument.spreadsheet-template");
    self.set(".odt", "application/vnd.oasis.opendocument.text");
    self.set(".otm", "application/vnd.oasis.opendocument.text-master");
    self.set(".ott", "application/vnd.oasis.opendocument.text-template");
    self.set(".oth", "application/vnd.oasis.opendocument.text-web");
    self.set(".xo", "application/vnd.olpc-sugar");
    self.set(".dd2", "application/vnd.oma.dd2+xml");
    self.set(".oxt", "application/vnd.openofficeorg.extension");
    self.set(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
    self.set(".sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide");
    self.set(".ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow");
    self.set(".potx", "application/vnd.openxmlformats-officedocument.presentationml.template");
    self.set(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    self.set(".xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template");
    self.set(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    self.set(".dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template");
    self.set(".dp", "application/vnd.osgi.dp");
    self.set(".pdb,.pqa,.oprc", "application/vnd.palm");
    self.set(".str", "application/vnd.pg.format");
    self.set(".ei6", "application/vnd.pg.osasli");
    self.set(".efif", "application/vnd.picsel");
    self.set(".plf", "application/vnd.pocketlearn");
    self.set(".pbd", "application/vnd.powerbuilder6");
    self.set(".box", "application/vnd.previewsystems.box");
    self.set(".mgz", "application/vnd.proteus.magazine");
    self.set(".qps", "application/vnd.publishare-delta-tree");
    self.set(".ptid", "application/vnd.pvi.ptid1");
    self.set(".qxd,.qxt,.qwd,.qwt,.qxl,.qxb", "application/vnd.quark.quarkxpress");
    self.set(".mxl", "application/vnd.recordare.musicxml");
    self.set(".musicxml", "application/vnd.recordare.musicxml+xml");
    self.set(".cod", "application/vnd.rim.cod");
    self.set(".rm", "application/vnd.rn-realmedia");
    self.set(".link66", "application/vnd.route66.link66+xml");
    self.set(".see", "application/vnd.seemail");
    self.set(".sema", "application/vnd.sema");
    self.set(".semd", "application/vnd.semd");
    self.set(".semf", "application/vnd.semf");
    self.set(".ifm", "application/vnd.shana.informed.formdata");
    self.set(".itp", "application/vnd.shana.informed.formtemplate");
    self.set(".iif", "application/vnd.shana.informed.interchange");
    self.set(".ipk", "application/vnd.shana.informed.package");
    self.set(".twd,.twds", "application/vnd.simtech-mindmapper");
    self.set(".mmf", "application/vnd.smaf");
    self.set(".teacher", "application/vnd.smart.teacher");
    self.set(".sdkm,.sdkd", "application/vnd.solent.sdkm+xml");
    self.set(".dxp", "application/vnd.spotfire.dxp");
    self.set(".sfs", "application/vnd.spotfire.sfs");
    self.set(".sdc", "application/vnd.stardivision.calc");
    self.set(".sda", "application/vnd.stardivision.draw");
    self.set(".sdd", "application/vnd.stardivision.impress");
    self.set(".smf", "application/vnd.stardivision.math");
    self.set(".sdw", "application/vnd.stardivision.writer");
    self.set(".vor", "application/vnd.stardivision.writer");
    self.set(".sgl", "application/vnd.stardivision.writer-global");
    self.set(".sxc", "application/vnd.sun.xml.calc");
    self.set(".stc", "application/vnd.sun.xml.calc.template");
    self.set(".sxd", "application/vnd.sun.xml.draw");
    self.set(".std", "application/vnd.sun.xml.draw.template");
    self.set(".sxi", "application/vnd.sun.xml.impress");
    self.set(".sti", "application/vnd.sun.xml.impress.template");
    self.set(".sxm", "application/vnd.sun.xml.math");
    self.set(".sxw", "application/vnd.sun.xml.writer");
    self.set(".sxg", "application/vnd.sun.xml.writer.global");
    self.set(".stw", "application/vnd.sun.xml.writer.template");
    self.set(".sus,.susp", "application/vnd.sus-calendar");
    self.set(".svd", "application/vnd.svd");
    self.set(".sis,.sisx", "application/vnd.symbian.install");
    self.set(".xsm", "application/vnd.syncml+xml");
    self.set(".bdm", "application/vnd.syncml.dm+wbxml");
    self.set(".xdm", "application/vnd.syncml.dm+xml");
    self.set(".tao", "application/vnd.tao.intent-module-archive");
    self.set(".tmo", "application/vnd.tmobile-livetv");
    self.set(".tpt", "application/vnd.trid.tpt");
    self.set(".mxs", "application/vnd.triscape.mxs");
    self.set(".tra", "application/vnd.trueapp");
    self.set(".ufd,.ufdl", "application/vnd.ufdl");
    self.set(".utz", "application/vnd.uiq.theme");
    self.set(".umj", "application/vnd.umajin");
    self.set(".unityweb", "application/vnd.unity");
    self.set(".uoml", "application/vnd.uoml+xml");
    self.set(".vcx", "application/vnd.vcx");
    self.set(".vsd,.vst,.vss,.vsw", "application/vnd.visio");
    self.set(".vis", "application/vnd.visionary");
    self.set(".vsf", "application/vnd.vsf");
    self.set(".wbxml", "application/vnd.wap.wbxml");
    self.set(".wmlc", "application/vnd.wap.wmlc");
    self.set(".wmlsc", "application/vnd.wap.wmlscriptc");
    self.set(".wtb", "application/vnd.webturbo");
    self.set(".wpd", "application/vnd.wordperfect");
    self.set(".wqd", "application/vnd.wqd");
    self.set(".stf", "application/vnd.wt.stf");
    self.set(".xar", "application/vnd.xara");
    self.set(".xfdl", "application/vnd.xfdl");
    self.set(".hvd", "application/vnd.yamaha.hv-dic");
    self.set(".hvs", "application/vnd.yamaha.hv-script");
    self.set(".hvp", "application/vnd.yamaha.hv-voice");
    self.set(".osf", "application/vnd.yamaha.openscoreformat");
    self.set(".osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml");
    self.set(".saf", "application/vnd.yamaha.smaf-audio");
    self.set(".spf", "application/vnd.yamaha.smaf-phrase");
    self.set(".cmp", "application/vnd.yellowriver-custom-menu");
    self.set(".zir,.zirz", "application/vnd.zul");
    self.set(".zaz", "application/vnd.zzazz.deck+xml");
    self.set(".vxml", "application/voicexml+xml");
    self.set(".hlp", "application/winhlp");
    self.set(".wsdl", "application/wsdl+xml");
    self.set(".wspolicy", "application/wspolicy+xml");
    self.set(".abw", "application/x-abiword");
    self.set(".ace", "application/x-ace-compressed");
    self.set(".aab,.x32,.u32,.vox", "application/x-authorware-bin");
    self.set(".aam", "application/x-authorware-map");
    self.set(".aas", "application/x-authorware-seg");
    self.set(".bcpio", "application/x-bcpio");
    self.set(".torrent", "application/x-bittorrent");
    self.set(".bz", "application/x-bzip");
    self.set(".bz2,.boz", "application/x-bzip2");
    self.set(".vcd", "application/x-cdlink");
    self.set(".chat", "application/x-chat");
    self.set(".pgn", "application/x-chess-pgn");
    self.set(".cpio", "application/x-cpio");
    self.set(".csh", "application/x-csh");
    self.set(".deb,.udeb", "application/x-debian-package");
    self.set(".dir,.dcr,.dxr,.cst,.cct,.cxt,.w3d,.fgd,.swa", "application/x-director");
    self.set(".wad", "application/x-doom");
    self.set(".ncx", "application/x-dtbncx+xml");
    self.set(".dtb", "application/x-dtbook+xml");
    self.set(".res", "application/x-dtbresource+xml");
    self.set(".dvi", "application/x-dvi");
    self.set(".bdf", "application/x-font-bdf");
    self.set(".gsf", "application/x-font-ghostscript");
    self.set(".psf", "application/x-font-linux-psf");
    self.set(".otf", "application/x-font-otf");
    self.set(".pcf", "application/x-font-pcf");
    self.set(".snf", "application/x-font-snf");
    self.set(".ttf,.ttc", "application/x-font-ttf");
    self.set(".pfa,.pfb,.pfm,.afm", "application/x-font-type1");
    self.set(".spl", "application/x-futuresplash");
    self.set(".gnumeric", "application/x-gnumeric");
    self.set(".gtar", "application/x-gtar");
    self.set(".hdf", "application/x-hdf");
    self.set(".jnlp", "application/x-java-jnlp-file");
    self.set(".latex", "application/x-latex");
    self.set(".prc,.mobi", "application/x-mobipocket-ebook");
    self.set(".application", "application/x-ms-application");
    self.set(".wmd", "application/x-ms-wmd");
    self.set(".wmz", "application/x-ms-wmz");
    self.set(".xbap", "application/x-ms-xbap");
    self.set(".mdb", "application/x-msaccess");
    self.set(".obd", "application/x-msbinder");
    self.set(".crd", "application/x-mscardfile");
    self.set(".clp", "application/x-msclip");
    self.set(".exe,.dll,.com,.bat,.msi", "application/x-msdownload");
    self.set(".mvb,.m13,.m14", "application/x-msmediaview");
    self.set(".wmf", "application/x-msmetafile");
    self.set(".mny", "application/x-msmoney");
    self.set(".pub", "application/x-mspublisher");
    self.set(".scd", "application/x-msschedule");
    self.set(".trm", "application/x-msterminal");
    self.set(".wri", "application/x-mswrite");
    self.set(".nc,.cdf", "application/x-netcdf");
    self.set(".p12,.pfx", "application/x-pkcs12");
    self.set(".p7b,.spc", "application/x-pkcs7-certificates");
    self.set(".p7r", "application/x-pkcs7-certreqresp");
    self.set(".rar", "application/x-rar-compressed");
    self.set(".sh", "application/x-sh");
    self.set(".shar", "application/x-shar");
    self.set(".swf", "application/x-shockwave-flash");
    self.set(".xap", "application/x-silverlight-app");
    self.set(".sit", "application/x-stuffit");
    self.set(".sitx", "application/x-stuffitx");
    self.set(".sv4cpio", "application/x-sv4cpio");
    self.set(".sv4crc", "application/x-sv4crc");
    self.set(".tar", "application/x-tar");
    self.set(".tcl", "application/x-tcl");
    self.set(".tex", "application/x-tex");
    self.set(".tfm", "application/x-tex-tfm");
    self.set(".texinfo,.texi", "application/x-texinfo");
    self.set(".ustar", "application/x-ustar");
    self.set(".src", "application/x-wais-source");
    self.set(".der,.crt", "application/x-x509-ca-cert");
    self.set(".fig", "application/x-xfig");
    self.set(".xpi", "application/x-xpinstall");
    self.set(".xenc", "application/xenc+xml");
    self.set(".xhtml,.xht", "application/xhtml+xml");
    self.set(".xml,.xsl", "application/xml");
    self.set(".dtd", "application/xml-dtd");
    self.set(".xop", "application/xop+xml");
    self.set(".xslt", "application/xslt+xml");
    self.set(".xspf", "application/xspf+xml");
    self.set(".mxml,.xhvml,.xvml,.xvm", "application/xv+xml");
    self.set(".zip", "application/zip");
    self.set(".adp", "audio/adpcm");
    self.set(".au,.snd", "audio/basic");
    self.set(".mid,.midi,.kar,.rmi", "audio/midi");
    self.set(".mp4a", "audio/mp4");
    self.set(".m4a,.m4p", "audio/mp4a-latm");
    self.set(".mpga,.mp2,.mp2a,.mp3,.m2a,.m3a", "audio/mpeg");
    self.set(".oga,.ogg,.spx", "audio/ogg");
    self.set(".eol", "audio/vnd.digital-winds");
    self.set(".dts", "audio/vnd.dts");
    self.set(".dtshd", "audio/vnd.dts.hd");
    self.set(".lvp", "audio/vnd.lucent.voice");
    self.set(".pya", "audio/vnd.ms-playready.media.pya");
    self.set(".ecelp4800", "audio/vnd.nuera.ecelp4800");
    self.set(".ecelp7470", "audio/vnd.nuera.ecelp7470");
    self.set(".ecelp9600", "audio/vnd.nuera.ecelp9600");
    self.set(".aac", "audio/x-aac");
    self.set(".aif,.aiff,.aifc", "audio/x-aiff");
    self.set(".m3u", "audio/x-mpegurl");
    self.set(".wax", "audio/x-ms-wax");
    self.set(".wma", "audio/x-ms-wma");
    self.set(".ram,.ra", "audio/x-pn-realaudio");
    self.set(".rmp", "audio/x-pn-realaudio-plugin");
    self.set(".wav", "audio/x-wav");
    self.set(".cdx", "chemical/x-cdx");
    self.set(".cif", "chemical/x-cif");
    self.set(".cmdf", "chemical/x-cmdf");
    self.set(".cml", "chemical/x-cml");
    self.set(".csml", "chemical/x-csml");
    self.set(".xyz", "chemical/x-xyz");
    self.set(".bmp", "image/bmp");
    self.set(".cgm", "image/cgm");
    self.set(".g3", "image/g3fax");
    self.set(".gif", "image/gif");
    self.set(".ief", "image/ief");
    self.set(".jp2", "image/jp2");
    self.set(".jpeg,.jpg,.jpe", "image/jpeg");
    self.set(".pict,.pic,.pct", "image/pict");
    self.set(".png", "image/png");
    self.set(".btif", "image/prs.btif");
    self.set(".svg,.svgz", "image/svg+xml");
    self.set(".tiff,.tif", "image/tiff");
    self.set(".psd", "image/vnd.adobe.photoshop");
    self.set(".djvu,.djv", "image/vnd.djvu");
    self.set(".dwg", "image/vnd.dwg");
    self.set(".dxf", "image/vnd.dxf");
    self.set(".fbs", "image/vnd.fastbidsheet");
    self.set(".fpx", "image/vnd.fpx");
    self.set(".fst", "image/vnd.fst");
    self.set(".mmr", "image/vnd.fujixerox.edmics-mmr");
    self.set(".rlc", "image/vnd.fujixerox.edmics-rlc");
    self.set(".mdi", "image/vnd.ms-modi");
    self.set(".npx", "image/vnd.net-fpx");
    self.set(".wbmp", "image/vnd.wap.wbmp");
    self.set(".xif", "image/vnd.xiff");
    self.set(".ras", "image/x-cmu-raster");
    self.set(".cmx", "image/x-cmx");
    self.set(".fh,.fhc,.fh4,.fh5,.fh7", "image/x-freehand");
    self.set(".ico", "image/x-icon");
    self.set(".pntg,.pnt,.mac", "image/x-macpaint");
    self.set(".pcx", "image/x-pcx");
    //self.set(".pic,.pct", "image/x-pict");
    self.set(".pnm", "image/x-portable-anymap");
    self.set(".pbm", "image/x-portable-bitmap");
    self.set(".pgm", "image/x-portable-graymap");
    self.set(".ppm", "image/x-portable-pixmap");
    self.set(".qtif,.qti", "image/x-quicktime");
    self.set(".rgb", "image/x-rgb");
    self.set(".xbm", "image/x-xbitmap");
    self.set(".xpm", "image/x-xpixmap");
    self.set(".xwd", "image/x-xwindowdump");
    self.set(".eml,.mime", "message/rfc822");
    self.set(".igs,.iges", "model/iges");
    self.set(".msh,.mesh,.silo", "model/mesh");
    self.set(".dwf", "model/vnd.dwf");
    self.set(".gdl", "model/vnd.gdl");
    self.set(".gtw", "model/vnd.gtw");
    self.set(".mts", "model/vnd.mts");
    self.set(".vtu", "model/vnd.vtu");
    self.set(".wrl,.vrml", "model/vrml");
    self.set(".ics,.ifb", "text/calendar");
    self.set(".css", "text/css");
    self.set(".csv", "text/csv");
    self.set(".html,.htm", "text/html");
    self.set(".txt,.text,.conf,.def,.list,.log,.in", "text/plain");
    self.set(".dsc", "text/prs.lines.tag");
    self.set(".rtx", "text/richtext");
    self.set(".sgml,.sgm", "text/sgml");
    self.set(".tsv", "text/tab-separated-values");
    self.set(".t,.tr,.roff,.man,.me,.ms", "text/troff");
    self.set(".uri,.uris,.urls", "text/uri-list");
    self.set(".curl", "text/vnd.curl");
    self.set(".dcurl", "text/vnd.curl.dcurl");
    self.set(".scurl", "text/vnd.curl.scurl");
    self.set(".mcurl", "text/vnd.curl.mcurl");
    self.set(".fly", "text/vnd.fly");
    self.set(".flx", "text/vnd.fmi.flexstor");
    self.set(".gv", "text/vnd.graphviz");
    self.set(".3dml", "text/vnd.in3d.3dml");
    self.set(".spot", "text/vnd.in3d.spot");
    self.set(".jad", "text/vnd.sun.j2me.app-descriptor");
    self.set(".wml", "text/vnd.wap.wml");
    self.set(".wmls", "text/vnd.wap.wmlscript");
    self.set(".s,.asm", "text/x-asm");
    self.set(".c,.cc,.cxx,.cpp,.h,.hh,.dic", "text/x-c");
    self.set(".f,.for,.f77,.f90", "text/x-fortran");
    self.set(".p,.pas", "text/x-pascal");
    self.set(".java", "text/x-java-source");
    self.set(".etx", "text/x-setext");
    self.set(".uu", "text/x-uuencode");
    self.set(".vcs", "text/x-vcalendar");
    self.set(".vcf", "text/x-vcard");
    self.set(".3gp", "video/3gpp");
    self.set(".3g2", "video/3gpp2");
    self.set(".h261", "video/h261");
    self.set(".h263", "video/h263");
    self.set(".h264", "video/h264");
    self.set(".jpgv", "video/jpeg");
    self.set(".jpm,.jpgm", "video/jpm");
    self.set(".mj2,.mjp2", "video/mj2");
    self.set(".mp4,.mp4v,.mpg4,.m4v", "video/mp4");
    self.set(".mpeg,.mpg,.mpe,.m1v,.m2v", "video/mpeg");
    self.set(".ogv", "video/ogg");
    self.set(".qt,.mov", "video/quicktime");
    self.set(".fvt", "video/vnd.fvt");
    self.set(".mxu,.m4u", "video/vnd.mpegurl");
    self.set(".pyv", "video/vnd.ms-playready.media.pyv");
    self.set(".viv", "video/vnd.vivo");
    self.set(".dv,.dif", "video/x-dv");
    self.set(".f4v", "video/x-f4v");
    self.set(".fli", "video/x-fli");
    self.set(".flv", "video/x-flv");
    //self.set(".m4v", "video/x-m4v");
    self.set(".asf,.asx", "video/x-ms-asf");
    self.set(".wm", "video/x-ms-wm");
    self.set(".wmv", "video/x-ms-wmv");
    self.set(".wmx", "video/x-ms-wmx");
    self.set(".wvx", "video/x-ms-wvx");
    self.set(".avi", "video/x-msvideo");
    self.set(".movie", "video/x-sgi-movie");
    self.set(".ice", "x-conference/x-cooltalk");
    		
	// Not really sure about these...
	self.set(".epub", "application/epub+zip");
	self.set(".mobi", "application/x-mobipocket-ebook");

	// Here's some common special cases without filename extensions
	self.set("README,LICENSE,COPYING,TODO,ABOUT,AUTHORS,CONTRIBUTORS", 
		"text/plain");
	self.set("manifest,.manifest,.mf,.appcache", "text/cache-manifest");

	exports.charset = self.charset;
	exports.catalog = self.catalog;
	exports.lookup = self.lookup;
	exports.set = self.set;
	exports.del = self.del;
	exports.forEach = self.forEach;
	
	return exports;
}(exports));
