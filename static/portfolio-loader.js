(() => {
  const data=window.TSM_UPLOADED_PORTFOLIO||{};
  const categories=['thumbnails','logos','banners','posters'];
  const pageCategory=categories.find(key=>location.pathname.endsWith('/'+key+'.html'));
  const makeFigure=(image,key)=>{
    const figure=document.createElement('figure');
    const img=document.createElement('img');
    img.src=image.src;
    img.alt=image.alt||key+' design';
    img.loading='lazy';
    figure.append(img);
    return figure;
  };

  if(pageCategory){
    const grid=document.querySelector('.gallery .grid');
    const images=Array.isArray(data)?data:data[pageCategory];
    if(grid&&Array.isArray(images)){
      grid.replaceChildren(...images.filter(image=>image&&image.src).map(image=>makeFigure(image,pageCategory)));
    }
    return;
  }

  for(const key of categories){
    const shot=document.querySelector('.cards a[href="'+key+'.html"] .shot');
    const images=Array.isArray(data)?[]:data[key];
    if(!shot||!Array.isArray(images)||!images.length)continue;
    const image=images.find(item=>item&&item.src);
    if(!image)continue;
    const img=document.createElement('img');
    img.src=image.src;
    img.alt=image.alt||key+' design';
    img.loading='lazy';
    shot.append(img);
  }
})();
