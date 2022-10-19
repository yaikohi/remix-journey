import type { PokemonTypeNames } from "types/pokemon-pokeapi"
import { prisma } from "./prisma.server"

/**
 * MAXES
 */

export async function getHighestHpBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _max: {
                hpBaseStat: true
            }
        })

        return res._max.hpBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            hpBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.hpBaseStat
}

export async function getHighestAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _max: {
                attackBaseStat: true
            }
        })

        return res._max.attackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.attackBaseStat
}

export async function getHighestDefenseBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await await prisma.pokemon.aggregate({
            _max: {
                defenseBaseStat: true
            }
        })

        return res._max.defenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.attackBaseStat
}

export async function getHighestSpecialAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _max: {
                specialAttackBaseStat: true
            }
        })

        return res._max.specialAttackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.attackBaseStat
}

export async function getHighestSpecialDefenseBaseStat(
    type?: PokemonTypeNames
) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _max: {
                specialDefenseBaseStat: true
            }
        })

        return res._max.specialDefenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.attackBaseStat
}

export async function getHighestSpeedBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _max: {
                speedBaseStat: true
            }
        })

        return res._max.speedBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _max: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._max.attackBaseStat
}

/**
 * MINS
 */

export async function getLowestHpBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _min: {
                hpBaseStat: true
            }
        })

        return res._min.hpBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            hpBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.hpBaseStat
}

export async function getLowestAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _min: {
                attackBaseStat: true
            }
        })

        return res._min.attackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.attackBaseStat
}

export async function getLowestDefenseBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await await prisma.pokemon.aggregate({
            _min: {
                defenseBaseStat: true
            }
        })

        return res._min.defenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.attackBaseStat
}

export async function getLowestSpecialAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _min: {
                specialAttackBaseStat: true
            }
        })

        return res._min.specialAttackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.attackBaseStat
}

export async function getLowestSpecialDefenseBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _min: {
                specialDefenseBaseStat: true
            }
        })

        return res._min.specialDefenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.attackBaseStat
}

export async function getLowestSpeedBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _min: {
                speedBaseStat: true
            }
        })

        return res._min.speedBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _min: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._min.attackBaseStat
}

/**
 * AVERAGES
 */

export async function getAverageHpBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _avg: {
                hpBaseStat: true
            }
        })

        return res._avg.hpBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            hpBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.hpBaseStat
}

export async function getAverageAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _avg: {
                attackBaseStat: true
            }
        })

        return res._avg.attackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.attackBaseStat
}

export async function getAverageDefenseBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await await prisma.pokemon.aggregate({
            _avg: {
                defenseBaseStat: true
            }
        })

        return res._avg.defenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.attackBaseStat
}

export async function getAverageSpecialAttackBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _avg: {
                specialAttackBaseStat: true
            }
        })

        return res._avg.specialAttackBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.attackBaseStat
}

export async function getAverageSpecialDefenseBaseStat(
    type?: PokemonTypeNames
) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _avg: {
                specialDefenseBaseStat: true
            }
        })

        return res._avg.specialDefenseBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.attackBaseStat
}

export async function getAverageSpeedBaseStat(type?: PokemonTypeNames) {
    if (!type) {
        const res = await prisma.pokemon.aggregate({
            _avg: {
                speedBaseStat: true
            }
        })

        return res._avg.speedBaseStat
    }
    const res = await prisma.pokemon.aggregate({
        _avg: {
            attackBaseStat: true
        },
        where: {
            types: {
                has: type
            }
        }
    })
    return res._avg.attackBaseStat
}
