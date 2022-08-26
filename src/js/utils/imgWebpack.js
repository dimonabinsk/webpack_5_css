export const createImg = ( rootElem, image ) =>
{

	const imgHtml = document.createElement( "img" );
	imgHtml.src = image;
	imgHtml.className = "webpack-img";
	const titlePage = document.createElement( "h1" );
	titlePage.textContent = "Привет WebPack";
	titlePage.className = "webpack-title";
	rootElem.append( titlePage, imgHtml );
}