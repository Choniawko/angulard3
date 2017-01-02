import { Component, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { DataService } from '../services/data.service';
import * as  d3 from 'd3';
import { devConsole } from '../console';
let save = require('save-svg-as-png');

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit {
  
  users:any[];
  margin = { top: 10, right: 20, bottom: 150, left: 40 };
  width  = 700 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  @ViewChild('chart', {read: ViewContainerRef}) svg;
  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this._dataService.getData()
      .subscribe(data => {
        this.users = data;
      }, err => {devConsole.log({err} ) },
      () => {
        this.drawChart();
      });
  }

  generatePDF() {
      devConsole.log(this.svg.nativeElement);
    this.convertToPdf(this.svg, doc => {

    })
  }

  convertToPdf(svg, callback) {
    save.svgAsDataUri(this.svg, {}, svgUri => {
        let $image = document.createElement('img'),
            		image = $image[0];
                    image.src = svgUri;
                    console.log($image, image)
    })
  }

  downloadPdf(fileName, pdfDoc) {
    let $link = document.createElement('a'),
        		link = $link[0],
        		dataUriString = pdfDoc.output('dataurlstring');
  }

  drawChart = () => {
    this.svg = d3.select(".chart")
        .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
                .call(this.responsive) 
                .append("g")
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    
    let yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([this.height, 0]);
    let yAxis = d3.axisLeft(yScale);
    this.svg.call(yAxis);

    let xScale = d3.scaleBand()
        .padding(0.01)
        .domain(this.users.map(d => d.name))
        .range([0, this.width]);

    let xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(10)
        .tickPadding(5);

    this.svg.append("g")
        .attr("transform", `translate(0, ${this.height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");
    

    this.svg.selectAll("rect")
        .data(this.users)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.age))
        .attr("width", () => xScale.bandwidth())
        .attr("height", (d) => this.height - yScale(d.age));
};

responsive = (svg) => {
    let container = d3.select(svg.node().parentNode);
    let width = parseInt(svg.style("width"));
    let height = parseInt(svg.style("height"));
    let aspect = width / height; 

    let resize = () => {
        let targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    };

    svg.attr("viewBox", `0 0 ${width*1.5} ${height*1.5}`)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on(`resize.${container.attr("id")}`, resize); 
};

}
