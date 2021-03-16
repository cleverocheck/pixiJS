const random_int = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export {
    random_int
}