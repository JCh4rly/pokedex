export const getSprite = (sprites: any) => 
  JSON.parse(sprites?.nodes[0]?.sprites)?.other?.dream_world?.front_default;