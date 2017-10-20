{
	"targets": [
		{
			"target_name": "native_module",
			"sources": [
				"native/currently-playing.cc",
				"native/util.cc",
				"native/util.hh"
			],
			"include_dirs": [
				"/usr/include/qt",
				"/usr/include/qt/QtDBus"
			],
			"libraries": [
				"/usr/lib/libQt5Core.so",
				"/usr/lib/libQt5DBus.so"
			]
		}
	]
}
