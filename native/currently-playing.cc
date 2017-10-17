#include <node/node.h>
#include "util.cc"
#include <giomm.h>
#include <glibmm.h>
#include <locale>
#include <iostream>


namespace SelfBot {
	namespace CurrentlyPlaying {
		void getCurrentlyPlaying(const v8::FunctionCallbackInfo<v8::Value> &args) {
			std::string mediaPlayer = std::string(*v8::String::Utf8Value(args[0]->ToString()));
			v8::Isolate *isolate = args.GetIsolate();
			std::locale::global(std::locale(""));
			Gio::init();

			GError *error;

			GDBusConnection *connection = g_bus_get_sync(G_BUS_TYPE_SESSION, NULL, &error);

			if (!connection) {
                const char *err = "unable to connect to session bus"
				std::cerr << err << std::endl;
				isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, err)));
			}

			GDBusProxy *playerProxy = g_dbus_proxy_new_sync(connection, G_DBUS_PROXY_FLAGS_NONE, nullptr, "org.mpris.MediaPlayer2." + mediaPlayer, );

		}
	} //namespace CurrentlyPlaying
} //namespace SelfBot
