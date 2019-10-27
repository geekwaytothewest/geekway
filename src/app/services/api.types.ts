export interface Convention {
    startDate: Date,
    endDate: Date,
    registrationDates: RegistrationDate,
    icon: string,
    theme: string,
    logo: Media,
    playAndWins: Game,
    doorPrizes: Game,
    type: ConventionType,
    venues: Venue,
    registrationUrl: string
}

export interface RegistrationDate {
    type: string,
    date: Date
}

export interface Media {
    id: string,
    name: string,
    sha256: string,
    hash: string,
    ext: string,
    mime: string,
    size: number,
    url: string,
    createdAt: Date,
    updatedAt: Date
}

export interface Game {
    Name: string,
    BGGID: string,
    Boxart: Media,
    libraries: Library[]
}

export interface ConventionType {
    Name: string,
    Description: string,
    Logo: Media,
    Icon: string,
    conventions: Convention[]
}

export interface Venue {
    Name: string,
    Type: string,
    Address: string,
    phoneNumber: string,
    website: string,
    groupCode: string,
    maps: Media[]
}

export interface Library {
    Name: string,
    games: Game[]
}