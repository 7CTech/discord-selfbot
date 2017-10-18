#include <node/node.h>
#include "util.cc"
#include <QtDBus>
#include <locale>
#include <iostream>

#define STANDLONE


namespace SelfBot {
	namespace CurrentlyPlaying {
#ifndef STANDLONE
		void getCurrentlyPlaying(const v8::FunctionCallbackInfo<v8::Value> &args) {
#else
        void getCurrentlyPlaying() {
#endif
#ifndef STANDLONE
			std::string mediaPlayer = std::string(*v8::String::Utf8Value(args[0]->ToString()));
			v8::Isolate *isolate = args.GetIsolate();
			std::locale::global(std::locale(""));
#endif

            if (!QDBusConnection::sessionBus().isConnected()) {
                std::cout << "not connected to the session bus" << std::endl;
#ifndef STANDLONE
                isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "not connected to the session bus")));
#endif
                return;
            }

            QDBusReply<QStringList> services = QDBusConnection::sessionBus().interface()->registeredServiceNames();

            QStringList::const_iterator constIterator;
            for (constIterator = services.value().constBegin(), constIterator != services.value().constEnd(), ++constIterator) {
                std::cout << (*constIterator).toLocal8Bit().constData() << std::endl;
            }}
		}
	} //namespace CurrentlyPlaying
} //namespace SelfBot

#ifdef STANDLONE
int main(int argc, char **argv) {
    SelfBot::CurrentlyPlaying::getCurrentlyPlaying();
}
#endif
