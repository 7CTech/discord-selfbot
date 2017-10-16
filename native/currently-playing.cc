#include <node/node.h>
#include "util.cc"
#include <giomm.h>
#include <locale>
#include <iostream>


namespace SelfBot
	namespace CurrentlyPlaying {
		void getCurrentlyPlaying(const v8::FunctionCallbackInfo<v8::Value> &args) {
			v8::Isolate *isolate = args.GetIsolate();
			std::locale::global(std::locale(""));
			Gio::init();

			auto connection = Gio::DBus::Connection::get_sync(Gio::DBus::BusType::BUS_TYPE_SESSION);

			if (!connection) {
				std::cerr << "unable to connect to session bus" << std::endl;
				isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "unable to connect to session bus")));
			}


		}
	} //namespace CurrentlyPlaying
} //namespace SelfBot
