# all: pong ../index.html

# pong: pong.cpp text/*
# 	g++ ./text/Text.cpp pong.cpp -o pong -lSDL2 -lSDL2_ttf

../index.html: pong.cpp text/*
	../../../../../../emsdk/upstream/emscripten/emcc text/Text.cpp pong.cpp -o ../index.html -s USE_SDL=2 -s USE_SDL_TTF=2 --preload-file assets -s WASM=1 -s USE_WEBGL2=1 -s FULL_ES3=1