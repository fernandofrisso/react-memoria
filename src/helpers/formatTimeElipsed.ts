export const fomatTimeElapsed = (seconds: number) => {

    let minutes = Math.floor(seconds/60); //vai deixar os minutos como numeros inteiros
    seconds = seconds - (minutes * 60) //

    let secString = `${seconds < 10 ? '0' + seconds: seconds}`
    let minString = `${minutes < 10 ? '0' + minutes: minutes}`

    return `${minString}:${secString}`;

}