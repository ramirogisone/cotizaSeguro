//constructor 
class Seguro{
	constructor(marca, anio, tipo){
		this.marca = marca;
		this.anio = anio;
		this.tipo = tipo;
	}
cotizarSeguro(){
	let precio;
	const precioBase = 2000;
	//El seguro se cotiza teniendo en cuenta la marca
	switch(this.marca){
		case '1': precio = precioBase * 1.15;
		break;
		case '2': precio = precioBase * 1.05;
		break;
		case '3': precio = precioBase * 1.35;
	}
	//Teniendo en cuenta el año del vehículo, cada año de antiguedad el precio se reducira un 3%
	const anioDif = new Date().getFullYear() - this.anio;
	precio -= ((anioDif * 3) * precio) / 100;
	//Teniendo en cuenta el tipo, el basico cuesta un %30 y el completo un %50 mas
	if(this.tipo === 'basico'){
		precio *= 1.30;
	}else{
		precio *= 1.50;
	}
	return precio;
	}	
}

//todo lo que visualiza el usuario
class Interfaz{
	mostrarMensaje(mensaje, tipo){
		const div = document.createElement('div');
		if(tipo === 'error'){
			div.classList.add('mensaje', 'error');
		}else{
			div.classList.add('mensaje', 'correcto');
		}
		div.innerHTML = `${mensaje}`;
		formulario.insertBefore(div, document.querySelector('.form-group'));//tipo de elemento que se quiere insertar, donde se quiere insertar
		//limpio mensaje de error despues de 3 segundos
		setTimeout(function(){
			document.querySelector('.mensaje').remove();
		}, 3000);
	}
	mostrarResultado(seguro, precioFinal){
		const resultado = document.getElementById('resultado');
		let marca;
		switch(seguro.marca){
			case '1': marca = 'Americano';
			break;
			case '2': marca = 'Asiático';
			break;
			case '3': marca = 'Europeo';
			break;
		}
		let precio = precioFinal;
		const div = document.createElement('div');
		div.innerHTML = `
			<p class='header'>Resumen cotización:</p>
			<p>Marca: ${marca}</p>
			<p>Año: ${seguro.anio}</p>
			<p>Tipo: ${seguro.tipo}</p>
			<p>Precio: $ ${precio}</p>
		`;
		const spinnerGif = document.querySelector('#cargando img');
		spinnerGif.style.display = 'block';
		setTimeout(function(){
			spinnerGif.style.display = 'none';
			resultado.appendChild(div);
		}, 3000);
	}
}
//EventListener
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(event){
	event.preventDefault();
	//obtenemos la marca seleccionada en el select option
	const marca = document.getElementById('marca');
	const marcaSelect = marca.options[marca.selectedIndex].value;
	//obtenemos el año seleccionado en el select option
	const anio = document.getElementById('anio');
	const anioSelect = anio.options[anio.selectedIndex].value;
	//obtenemos el tipo seleccionado en RB
	const tipoSeguro = document.querySelector('input[name="tipo"]:checked').value;
	//crea instancia de la interfaz
	const interfaz = new Interfaz();
	//validar que los campos no esten vacios
	if(marcaSelect === '' || anioSelect === '' || tipoSeguro === ''){
		interfaz.mostrarMensaje('Faltan datos por completar, por favor revisar!', 'error');
	}else{
		//limpio los resultados previos 
		const resultado = document.querySelector('#resultado div');
		if(resultado != null){
			resultado.remove();
		}
		const seguro = new Seguro(marcaSelect, anioSelect, tipoSeguro);
		const precio = seguro.cotizarSeguro(seguro);
		// llamado al proto para para visualizar reultado
		interfaz.mostrarResultado(seguro, precio);
		interfaz.mostrarMensaje('Cotizando...', 'exito');
	}
});

const anioMax = new Date().getFullYear(), //limita la variable max al año en curso
anioMin = anioMax - 20; //solo se pueden cotizar vehiculos de hasta 20 años de antigüedad

//genero el select option para la  seleccion del año
const selectAnio = document.getElementById('anio');
for(let i = anioMax; i > anioMin; i--) {
	let option = document.createElement('option');
	option.value = i;
	option.innerHTML = i;
	selectAnio.appendChild(option);
}