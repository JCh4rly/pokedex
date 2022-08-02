const getParsedSprites = (sprites: any) => JSON.parse(sprites)?.other;

export const getSprite = (sprites: any) => 
  getParsedSprites(sprites)?.dream_world?.front_default;

export const getHomeSprite = (sprites: any) => 
  getParsedSprites(sprites)?.home?.front_default;