//
// Created by ctech on 22/10/17.
//

#include <node/node.h>
#include "util.hh"

namespace SelfBot {
    namespace Shell {
        void shell(const v8::FunctionCallbackInfo<v8::Value> &args) {
            v8::Isolate *isolate = args.GetIsolate();

            if (args.Length() < 1) {
                args.GetReturnValue().Set("");
                return;
            }

            if (!args[0]->IsString())  {
                isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "wrong arguments to shell")));
                return;
            }

            args[0]->ToString()->WriteUtf8()

            args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, SelfBot::Util::shell()))
        }
    }
}

void init(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "getCurrentlyPlaying", SelfBot::Shell::shell);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init);
#endif