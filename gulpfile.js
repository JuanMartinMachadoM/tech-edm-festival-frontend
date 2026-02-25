import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass' //Extraer la dependencia y obtener todas las funciones en este archivo
const sass = gulpSass(dartSass)

export function hola(done){ // export es lo que me permite ejecutar las funciones desde el package
    console.log("Hola desde gulpfile.js")

    done() //done indica que la tarea termina
}

export function js(done){
    src('src/js/app.js')
        .pipe( dest('build/js'))
    done()
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps: true})//Llama al archivo, el sourcemap hace que en la terminal me diga en que doc esta el error
        .pipe( sass().on('error', sass.logError) )//aplica sass
        .pipe( dest('build/css', {sourcemaps: true}))// destino donde almacenar el  archivo
        //Todo esto es lo mismo que tener
        //"scripts": {"sass": "sass --watch src/scss:build/css", ... En el package
    done();
}

export function dev(){ //es un watch entonces no se le pasa el done
    watch('src/scss/**/*.scss', css) //Observa hasta que haya cambios y ejecuta css
    //Busca todos los archivos con extension scss en la carpeta scss
    watch('src/js/**/*.js', js)

}

export default series(js, css, dev) //En el jason el cambio es: De "dev": "gulp dev" a "dev": "gulp"
//Se ejecuta por defualt js, css y, dv en ese orden