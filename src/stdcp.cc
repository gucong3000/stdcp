#include <windows.h>
#include <node_api.h>
#include <assert.h>

napi_value GetCP(
	napi_env env,
	napi_callback_info info
) {
	napi_status status;

	size_t argc = 1;
	napi_value args[1];
	status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
	bool global = status == napi_ok && argc >= 1;
	if (global) {
		status = napi_get_value_bool(env, args[0], &global);
		global = status == napi_ok && global;
	}

	napi_value code;
	// https://docs.microsoft.com/windows/desktop/api/winnls/nf-winnls-getacp
	// https://docs.microsoft.com/windows/console/getconsoleoutputcp
	status = napi_create_int32(env, global ? GetACP() : GetConsoleOutputCP(), &code);
	assert(status == napi_ok);
	return code;
}

napi_value SetCP(
	napi_env env,
	napi_callback_info info
) {
	napi_status status;

	size_t argc = 1;
	napi_value args[1];
	status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
	bool result = status == napi_ok && argc >= 1;
	if (result) {
		int code;
		status = napi_get_value_int32(env, args[0], &code);
		// https://docs.microsoft.com/windows/console/setconsoleoutputcp
		result = status == napi_ok && SetConsoleOutputCP(code);
	}

	napi_value napiResult;
	status = napi_get_boolean(env, result, &napiResult);
	assert(status == napi_ok);
	return napiResult;
}

#define DECLARE_NAPI_METHOD(name, func)	{ name, 0, func, 0, 0, 0, (napi_property_attributes) (napi_configurable | napi_enumerable | napi_writable), 0 }

napi_value Init(napi_env env, napi_value exports) {
	napi_status status;
	napi_property_descriptor properties[] = {
		DECLARE_NAPI_METHOD("getSync", GetCP),
		DECLARE_NAPI_METHOD("setSync", SetCP),
	};
	status = napi_define_properties(env, exports, 2, properties);
	assert(status == napi_ok);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
