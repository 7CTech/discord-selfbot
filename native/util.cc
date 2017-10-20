#include <string>
#include <array>
#include <memory>
#include <cstdio>
#include "util.hh"
#include <QtDBus>

/*https://stackoverflow.com/questions/478898/how-to-execute-a-command-and-get-output-of-command-within-c-using-posix*/
std::string SelfBot::Util::shell(const std::string &command) {
	std::array<char, 512> buf{};
	std::string res;
	std::shared_ptr<FILE> pipe(popen(command.c_str(), "r"), pclose);
	if (!pipe) return nullptr;
	while (!feof(pipe.get())) {
		if (fgets(buf.data(), 512, pipe.get()) != nullptr) res += buf.data();
	}
	return res;
}

QString SelfBot::Util::joinQStringList(const QStringList &list, const std::string &join) {
	QString joined;
	for (int i = 0; i < list.size() - 1; i++) {
		joined.append(list.value(i));
		joined.append(QString::fromStdString(join));
	}
	joined.append(list.value(list.size() - 1));
	return joined;
}
