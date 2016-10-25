/**
 * Created by kevin on 05/10/15.
 */
/// @param context the context of the canvas
/// @param color color of the grid in string format
/// @param size size of the quads or separation between them
/// @param tickness is the tickness of lines in the grid
function DibujarGrilla(context,  size, tickness)
{

    //Dibujar Plano Cartesiano
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(context.canvas.width/2, 0);
    context.lineTo(context.canvas.width/2, context.canvas.height);
    context.moveTo(0, context.canvas.height/2);
    context.lineTo(context.canvas.width, context.canvas.height/2);
    context.stroke();

    context.save();
    context.strokeStyle = "lightgray";
    context.lineWidth = tickness;
    for (var i = size; i < context.canvas.width; i += size)
    {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
    context.restore();


}

/// @param context the context of the canvas
/// @param x, y position in window/browser/viewport coordinates
function ObtenerPosicionMouse(canvas, x, y)
{
    var rect = canvas.getBoundingClientRect();
    return {
        x:  parseInt((x - rect.left) - canvas.width/2 ),
        y:  parseInt((y - rect.top) - canvas.height/2 )*-1
    };
}
/// @param context the context of the canvas
/// @param x, y position where the color (r,g,b,a) would be placed
/// @param r, g, b color in RGB color space in range [0,255]
/// @param a must be in range 0 - 1, where 1 is fully opaque
function setPixel(context, x,y, r, g, b, a)
{
    /*colorPixel[0] = r;
    colorPixel[1] = g;
    colorPixel[2] = b;
    colorPixel[3] = a;
    context.putImageData(pixel, x + context.canvas.width/2, (y - context.canvas.height/2)*-1);
    */
    context.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
    context.fillRect( x + context.canvas.width/2, (y - context.canvas.height/2)*-1, 1, 1 );
}

function CambiarMetodo(forma,metodo)
{
    window.forma  = forma;
    window.metodo = metodo;
    switch(forma)
    {
        case 0:
            li_forma.textContent = "Línea";
            li_metodo.textContent = methods[forma][metodo]; break;
        case 1:
            li_forma.textContent = "Círculos";
            li_metodo.textContent = methods[forma][metodo]; break;
        case 2:
            li_forma.textContent = "Poligono";
            li_metodo.textContent = methods[0][metodo]; break;
        case 3:
            window.fist_click = true;
            li_forma.textContent = "Recorte";
            li_metodo.textContent = methods[forma][metodo]; break;
        case 4:
            li_forma.textContent = "Transformaciones";
            li_metodo.textContent = methods[forma][metodo]; break;
    }
}

function DibujarObjetosAlmacenados(context,objetos)
{
    for(var i = 0;i<objetos.length;i++)
    {
        switch(objetos[i][2])
        {
            case 0 : Linea(context, objetos[i][0].x, objetos[i][0].y, objetos[i][1].x, objetos[i][1].y, 0, 128, 255, 1,objetos[i][3]); break;
            case 1 : Circulo(context, objetos[i][0].x, objetos[i][0].y, objetos[i][1].x, objetos[i][1].y, 0, 128, 255, 1,objetos[i][3]); break;
        }
    }
}

