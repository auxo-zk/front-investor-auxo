export type TWitness = {
    path: string[];
    isLeft: boolean[];
};

export type TWitnessLevel = {
    level1: TWitness;
    level2: TWitness;
};

export type TRef = {
    address: string;
    witness: TWitness;
};

export type TFileSaved = {
    fileName: string;
    fileSize: number;
    URL: string;
};
