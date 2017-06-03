export default = (<styl jsx>{`.root {
  border-radius: 0.3rem;
  -webkit-box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.16);
  -moz-box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.16);
  box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.16);
  cursor: pointer;
  display: inline-block;
  background: #ffead3;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffead3), to(#f9dcbd));
  background-image: -webkit-linear-gradient(top, #ffead3, #f9dcbd);
  background-image: -moz-linear-gradient(top, #ffead3, #f9dcbd);
  background-image: -ms-linear-gradient(top, #ffead3, #f9dcbd);
  background-image: -o-linear-gradient(top, #ffead3, #f9dcbd);
  background-image: linear-gradient(top, #ffead3, #f9dcbd);
  height: 6.5rem;
  text-align: center;
  transition: box-shadow 0.2s ease-in-out;
  white-space: nowrap;
  width: 29rem;
/**
    Color alterations
  **/
/**
    Size alterations
  **/
}
.root.hallow {
  background: none;
  border: 1px solid #ffead3;
}
.root:hover {
  -webkit-box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.2);
  -moz-box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.2);
  box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.2);
}
.root .label {
  color: #575653;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 6.5rem;
}
.root.color_black {
  background: rgba(93,93,93,0.72);
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(93,93,93,0.72)), to(rgba(58,58,58,0.72)));
  background-image: -webkit-linear-gradient(top, rgba(93,93,93,0.72), rgba(58,58,58,0.72));
  background-image: -moz-linear-gradient(top, rgba(93,93,93,0.72), rgba(58,58,58,0.72));
  background-image: -ms-linear-gradient(top, rgba(93,93,93,0.72), rgba(58,58,58,0.72));
  background-image: -o-linear-gradient(top, rgba(93,93,93,0.72), rgba(58,58,58,0.72));
  background-image: linear-gradient(top, rgba(93,93,93,0.72), rgba(58,58,58,0.72));
}
.root.color_black.hallow {
  background: none;
  border: 1px solid #5d5d5d;
}
.root.color_black.hallow .label {
  color: #5d5d5d;
}
.root.color_black:hover {
  background: #5d5d5d;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#5d5d5d), to(#3a3a3a));
  background-image: -webkit-linear-gradient(top, #5d5d5d, #3a3a3a);
  background-image: -moz-linear-gradient(top, #5d5d5d, #3a3a3a);
  background-image: -ms-linear-gradient(top, #5d5d5d, #3a3a3a);
  background-image: -o-linear-gradient(top, #5d5d5d, #3a3a3a);
  background-image: linear-gradient(top, #5d5d5d, #3a3a3a);
}
.root.color_black:hover.hallow {
  background: rgba(93,93,93,0.14);
}
.root.color_black .label {
  color: #ddd;
}
.root.color_pink {
  background: #ff8ede;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#ff8ede), to(#ff7ed9));
  background-image: -webkit-linear-gradient(top, #ff8ede, #ff7ed9);
  background-image: -moz-linear-gradient(top, #ff8ede, #ff7ed9);
  background-image: -ms-linear-gradient(top, #ff8ede, #ff7ed9);
  background-image: -o-linear-gradient(top, #ff8ede, #ff7ed9);
  background-image: linear-gradient(top, #ff8ede, #ff7ed9);
}
.root.color_pink.hallow {
  background: none;
  border: 1px solid #ff8ede;
}
.root.color_pink.hallow .label {
  color: #ff8ede;
}
.root.color_pink .label {
  color: #322f33;
}
.root.color_purple {
  background: #fed3ff;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#fed3ff), to(#c2a3d2));
  background-image: -webkit-linear-gradient(top, #fed3ff, #c2a3d2);
  background-image: -moz-linear-gradient(top, #fed3ff, #c2a3d2);
  background-image: -ms-linear-gradient(top, #fed3ff, #c2a3d2);
  background-image: -o-linear-gradient(top, #fed3ff, #c2a3d2);
  background-image: linear-gradient(top, #fed3ff, #c2a3d2);
  border: 1px solid #c2a3d2;
}
.root.color_purple.hallow {
  background: none;
}
.root.color_purple.hallow .label {
  color: #c2a3d2;
}
.root.color_purple .label {
  color: #503a4b;
}
.root.size_small {
  height: 3.2rem;
  width: 9rem;
}
.root.size_small .label {
  font-size: 1rem;
  font-weight: normal;
  line-height: 3.2rem;
}
`}</style>);
