#include <node/node.h>
#include "util.cc"
#include <giomm-2.4/giomm.h>

namespace SelfBot {
	namespace CurrentlyPlaying {
		void getCurrentlyPlaying(const v8::FunctionCallbackInfo<v8::Value> &args) {
			v8::Isolate *isolate = args.GetIsolate();
		}
	} //namespace CurrentlyPlaying
} //namespace SelfBot
