{
	"targets": [
		{
			"target_name": "native_module",
			"sources": [
				"src/native/currently-playing.cc",
				"src/native/util.cc",
				"src/native/util.hh"
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