#include <node.h>
#include <windows.h>
namespace stdcp {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

void GetCP(const FunctionCallbackInfo<Value>& args) {
	args.GetReturnValue().Set(
		Number::New(
			args.GetIsolate(),
			GetConsoleOutputCP()
		)
	);
}

void SetCP(const FunctionCallbackInfo<Value>& args) {
	int error = 0;
	if(!SetConsoleOutputCP(args[0].As<Number>()->Value())){
		error = GetLastError();
	}
	args.GetReturnValue().Set(
		Number::New(
			args.GetIsolate(),
			error
		)
	);
}

void Init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "get", GetCP);
	NODE_SET_METHOD(exports, "set", SetCP);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace stdcp
