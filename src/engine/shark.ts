export type Shark = {
  _type: "shark";
  energy: number;
};

export const isShark = (toBeDetermined: any): toBeDetermined is Shark =>
  toBeDetermined._type === "shark";

export const getNewShark = (startingEnergy: number = 60): Shark => ({
  _type: "shark",
  energy: startingEnergy,
});

export const decEnergy = (shark: Shark) => {
  shark.energy--;
};

export const isSharkBreedTime = (shark: Shark, energyLevel: number = 120) =>
  shark.energy >= energyLevel;

export const eatFish = (shark: Shark) => {
  shark.energy += 30;
};

export const breadShark = (shark: Shark) => {
  shark.energy = Math.round(shark.energy / 2);
};

export const isDead = (shark: Shark) => shark.energy <= 0;
