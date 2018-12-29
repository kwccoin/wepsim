/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    // EP

    examples.es.push({
                       id: 'S1E1',
                       title: "Instrucciones",
                       level: "Inicial",
                       hardware:  "ep",
                       microcode: "s1e1",
                       assembly:  "s1e1",
                       description: "Ejemplo simple con fetch, instrucciones aritm&eacute;ticas y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E2',
                       title: "Acceso a memoria",
                       level: "Inicial",
                       hardware:  "ep",
                       microcode: "s1e2",
                       assembly:  "s1e2",
                       description: "Ejemplo simple con fetch, acceso a memoria y segmento de c&oacute;digo/datos b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E3',
                       title: "Bucles",
                       level: "Inicial",
                       hardware:  "ep",
                       microcode: "s1e3",
                       assembly:  "s1e3",
                       description: "Ejemplo simple con fetch, salto y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Inicial",
                       hardware:  "ep",
                       microcode: "s1e4",
                       assembly:  "s1e4",
                       description: "Ejemplo simple con fetch, salto y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E1',
                       title: "E/S",
                       level: "Intermedio",
                       hardware:  "ep",
                       microcode: "s2e1",
                       assembly:  "s2e1",
                       description: "Ejemplo ampliado con E/S programada, segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E2',
                       title: "Subrutina",
                       level: "Intermedio",
                       hardware:  "ep",
                       microcode: "s2e2",
                       assembly:  "s2e2",
                       description: "Ejemplo ampliado con m&aacute;s instrucciones y E/S (keyboard, display).<br>"
                     });

    examples.es.push({
                       id: 'S2E3',
                       title: "M&aacute;scaras y desplazamientos",
                       level: "Intermedio",
                       hardware:  "ep",
                       microcode: "s2e3",
                       assembly:  "s2e3",
                       description: "Ejemplo ampliado con m&aacute;scaras, desplazamientos y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E4',
                       title: "Matriz",
                       level: "Intermedio",
                       hardware:  "ep",
                       microcode: "s2e4",
                       assembly:  "s2e4",
                       description: "Ejemplo ampliado con subrutina y matriz.<br>"
                     });

    examples.es.push({
                       id: 'S3E1',
                       title: "Interrupciones",
                       level: "Avanzado",
                       hardware:  "ep",
                       microcode: "s3e1",
                       assembly:  "s3e1",
                       description: "<b>Instructive</b> example con interrupciones: fetch, RETI y .ktext/.kdata.<br>"
                     });

    examples.es.push({
                       id: 'S3E2',
                       title: "Llamada al sistema",
                       level: "Avanzado",
                       hardware:  "ep",
                       microcode: "s3e2",
                       assembly:  "s3e2",
                       description: "<b>Instructive</b> example con llamada al sistema.<br>"
                     });

    examples.es.push({
                       id: 'S3E3',
                       title: "Excepci&oacute;n",
                       level: "Avanzado",
                       hardware:  "ep",
                       microcode: "s3e3",
                       assembly:  "s3e3",
                       description: "<b>Instructive</b> example con excepci&oacute;n de coma flotante.<br>"
                     });

    examples.es.push({
                       id: 'S3E4',
                       title: "Int. + syscall + except.",
                       level: "Avanzado",
                       hardware:  "ep",
                       microcode: "s3e4",
                       assembly:  "s3e4",
                       description: "Ejemplo avanzado con interrupci&oacute;n, llamada al sistema y excepci&oacute;n.<br>"
                     });

    examples.es.push({
                       id: 'S4E1',
                       title: "addv + seqv.",
                       level: "Laboratorio",
                       hardware:  "ep",
                       microcode: "s4e1",
                       assembly:  "s4e1",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: addv + seqv.<br>"
                     });

    examples.es.push({
                       id: 'S4E2',
                       title: "strlen_2 + skipasciicode_2",
                       level: "Laboratorio",
                       hardware:  "ep",
                       microcode: "s4e2",
                       assembly:  "s4e2",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: strlen_2 + skipasciicode_2.<br>"
                     });

    examples.es.push({
                       id: 'S4E3',
                       title: "madd, mmul, mxch",
                       level: "Laboratorio",
                       hardware:  "ep",
                       microcode: "s4e3",
                       assembly:  "s4e3",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: madd + mmul + mxch.<br>"
                     });

    examples.es.push({
                       id: 'S4E4',
                       title: "syscall 1, 4-5, 8, 11-12",
                       level: "Laboratorio",
                       hardware:  "ep",
                       microcode: "s4e4",
                       assembly:  "s4e4",
                       description: "Ejemplo de llamada al sistema para imprimir/leer entero y cadena de caracteres.<br>"
                     });

    examples.es.push({
                       id: 'S5E1',
                       title: "Para completar",
                       level: "Especial",
                       hardware:  "ep",
                       microcode: "s5e1",
                       assembly:  "s5e1",
                       description: "Ejemplo para pruebas.<br>"
                     });

    // POC

    examples.es.push({
                       id: 'S1E1',
                       title: "Instrucciones",
                       level: "Inicial",
                       hardware:  "poc",
                       microcode: "s1e1",
                       assembly:  "s1e1",
                       description: "Ejemplo simple.<br>"
                     });

    examples.es.push({
                       id: 'S5E1',
                       title: "Para completar",
                       level: "Especial",
                       hardware:  "poc",
                       microcode: "s5e1",
                       assembly:  "s5e1",
                       description: "Ejemplo para pruebas.<br>"
                     });

