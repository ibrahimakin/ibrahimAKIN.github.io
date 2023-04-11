#include <iostream>
#include <random>
#include <SDL2/SDL.h>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif
#include "text/Text.hpp"
//
// Game constants
const int SCREEN_WIDTH = 800;
const int SCREEN_HEIGHT = 600;
const int SCORE_WH = 50;
const int PADDLE_WIDTH = 20;
const int PADDLE_HEIGHT = 100;
const int BALL_SIZE = 20;
const int BALL_SPEED = 5;
const int PADDLE_SPEED = 10;
int ballXVel, ballYVel, lScore = 0, rScore = 0, delay = 10;
std::string font = "assets/FreeSans.ttf";
SDL_Rect leftPaddle, rightPaddle, ball;
SDL_Renderer *renderer;
SDL_Window *window;
Text startGame(font, 26);
Text leftScore(font, 32);
Text rightScore(font, 32);
bool quit, pause, start;

void loop()
{
    // Handle events
    SDL_Event event;
    while (SDL_PollEvent(&event) != 0)
    {
        if (event.type == SDL_QUIT)
        {
            quit = true;
        }
    }

    // Clear the screen
    SDL_SetRenderDrawColor(renderer, 0x00, 0x00, 0x00, 0xFF);
    SDL_RenderClear(renderer);

    // Move paddles
    const Uint8 *state = SDL_GetKeyboardState(NULL);

    if (!start)
    {
        startGame.DrawText(renderer, "Press SPACE to start the game!", SCREEN_WIDTH / 2 - SCORE_WH * 3, SCREEN_HEIGHT / 2 + BALL_SIZE, SCORE_WH * 6, SCORE_WH / 2);
    }
    else if (!pause)
    {
        if (state[SDL_SCANCODE_SPACE])
        {
            pause = !pause;
        }
        return;
    }

    if (state[SDL_SCANCODE_W] && leftPaddle.y >= 0)
    {
        leftPaddle.y -= PADDLE_SPEED;
    }
    if (state[SDL_SCANCODE_S] && leftPaddle.y <= SCREEN_HEIGHT - PADDLE_HEIGHT)
    {
        leftPaddle.y += PADDLE_SPEED;
    }
    if (state[SDL_SCANCODE_UP] && rightPaddle.y >= 0)
    {
        rightPaddle.y -= PADDLE_SPEED;
    }
    if (state[SDL_SCANCODE_DOWN] && rightPaddle.y <= SCREEN_HEIGHT - PADDLE_HEIGHT)
    {
        rightPaddle.y += PADDLE_SPEED;
    }

    // Move ball
    ball.x += ballXVel;
    ball.y += ballYVel;

    // Bounce ball off top/bottom walls
    if (ball.y <= 0 || ball.y >= SCREEN_HEIGHT - BALL_SIZE)
    {
        ballYVel = -ballYVel;
    }

    // Check for collisions with paddles
    if (SDL_HasIntersection(&ball, &leftPaddle) || SDL_HasIntersection(&ball, &rightPaddle))
    {
        if (21 > ballXVel && ballXVel > -21)
            ballXVel = -(ballXVel + (ballXVel > 0 ? 1 : -1));
        else
            ballXVel = -ballXVel;
    }

    // Check for game over
    if (ball.x <= 0 || ball.x >= SCREEN_WIDTH - BALL_SIZE)
    {
        if (ball.x <= 0)
            rScore += 1;
        else if (ball.x >= SCREEN_WIDTH - BALL_SIZE)
            lScore += 1;

        ball.x = SCREEN_WIDTH / 2 - BALL_SIZE / 2;
        ball.y = SCREEN_HEIGHT / 2 - BALL_SIZE / 2;

        // Providing a seed value
        srand((unsigned)time(NULL));

        int x = rand() % 2 ? 1 : -1;
        int y = rand() % 2 ? 1 : -1;

        ballXVel = BALL_SPEED * x;
        ballYVel = BALL_SPEED * y;
    }

    leftScore.DrawText(renderer, std::to_string(lScore), PADDLE_WIDTH, 0, SCORE_WH, SCORE_WH);
    rightScore.DrawText(renderer, std::to_string(rScore), SCREEN_WIDTH - PADDLE_WIDTH - SCORE_WH, 0, SCORE_WH, SCORE_WH);

    // Draw paddles and ball
    SDL_SetRenderDrawColor(renderer, 0xFF, 0xFF, 0xFF, 0xFF);
    SDL_RenderFillRect(renderer, &leftPaddle);
    SDL_RenderFillRect(renderer, &rightPaddle);
    SDL_RenderFillRect(renderer, &ball);
    // Update the screen
    SDL_RenderPresent(renderer);

    // Delay to control frame rate
    SDL_Delay(delay);
    start = true;
}

int main(int argc, char *argv[])
{
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0)
    {
        std::cout << "SDL initialization failed. SDL Error: " << SDL_GetError() << std::endl;
        return 1;
    }

    // Create window
    window = SDL_CreateWindow("Ping Pong", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED,
                              SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (window == nullptr)
    {
        std::cout << "Window creation failed. SDL Error: " << SDL_GetError() << std::endl;
        return 1;
    }

    // Create renderer
    renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
    if (renderer == nullptr)
    {
        std::cout << "Renderer creation failed. SDL Error: " << SDL_GetError() << std::endl;
        return 1;
    }

    // Create paddles and ball
    leftPaddle = {0, SCREEN_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT};
    rightPaddle = {SCREEN_WIDTH - PADDLE_WIDTH, SCREEN_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT};
    ball = {SCREEN_WIDTH / 2 - BALL_SIZE / 2, SCREEN_HEIGHT / 2 - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE};
    srand((unsigned)time(NULL));
    int x = rand() % 2 ? 1 : -1;
    int y = rand() % 2 ? 1 : -1;
    ballXVel = BALL_SPEED * x;
    ballYVel = BALL_SPEED * y;

    // Game loop
    quit = false;
#ifdef __EMSCRIPTEN__
    delay = 10;
    emscripten_set_main_loop(loop, 0, 1);
#else
    delay = 15;
    while (!quit)
    {
        loop();
    }
#endif

    // Clean up SDL
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}