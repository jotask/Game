var

// Sprite vars //
    s_splash,

    s_play_btn,
    s_menu_btn,

    s_spider,

    s_bomb,

    s_logo,
    s_door,

    s_player,
    s_zombie,
    s_world_block,
    s_world_air;

/**
 * Sprite class bassed on the following link:
 * https://github.com/lostdecade/simple_canvas_game/blob/master/js/game.js
 * Simple sprite class
 *
 * @param {Image}  img    spritesheet image
 * @param {number} x      x-position in spritesheet
 * @param {number} y      y-position in spritesheet
 * @param {number} width  width of sprite
 * @param {number} height height of sprite
 */
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x*2;
    this.y = y*2;
    this.width = width*2;
    this.height = height*2;
}
/**
 * Draw sprite ta canvas context
 * sprite prototype is from the follow link
 * https://github.com/lostdecade/simple_canvas_game/blob/master/js/game.js
 *
 * @param  {number} x   x-position on canvas to draw from
 * @param  {number} y   y-position on canvas to draw from
 */
Sprite.prototype.draw = function(x, y) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
        x, y, this.width, this.height);
};

function initSprites(img) {

    s_splash = new Sprite(img, 32,  0, 16, 15);

    s_door = [
        new Sprite(img, 0,  16 * 3, 16, 16),
        new Sprite(img, 16,  16 * 3, 16, 16)
    ];

    s_play_btn = new Sprite(img, 32,  16, 74, 23);

    s_menu_btn = new Sprite(img, 32,  40, 74, 23);

    s_player  = [
        new Sprite(img, 0,  0, 16, 16),
        new Sprite(img, 16,  0, 16, 16)

    ];

    s_spider  = [
        new Sprite(img, 0,  64, 16, 8),
        new Sprite(img, 0,  64 + 9, 16, 8)


    ];

    s_zombie  = [
        new Sprite(img, 0,  16, 16, 16),
        new Sprite(img, 16,  16, 16, 16)

    ];

    s_bomb = new Sprite(img, 49, 0, 16, 16);

    s_logo = new Sprite(img, 32, 64, 192, 88);

    s_world_block = new Sprite(img, 16,  16 * 2, 16, 16);
    s_world_air =   new Sprite(img, 0,  16 * 2, 16, 16);

}
