import { ChangeDetectionStrategy, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as L from 'leaflet';

export type Coords = [number, number];

@Component({
  selector: 'app-my-leaflet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #map class="map"></div>
  `,
  styles: [`
    .map { height: 200px }
  `],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MyLeafletComponent, multi: true}
  ]
})
export class MyLeafletComponent implements ControlValueAccessor{
  @ViewChild('map', { static: true}) mapReference!: ElementRef<HTMLDivElement>;
  @Input() zoom: number = 7;
  map!: L.Map;
  marker!: L.Marker;
  onChange!: (coords: Coords) => void;
  onTouch!: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) {
      this.init();
    }
    if (changes['zoom']) {
      this.setZoom(changes['zoom'].currentValue)
    }
  }

  init() {
    this.map = L.map(this.mapReference.nativeElement);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);
  }

  setCoords(coords: Coords) {
    this.map.setView(coords);
    this.setMarker(coords);
  }

  setZoom(zoom: number) {
    this.map.setZoom(zoom)
  }

  setMarker(coords: Coords) {
    if (!this.marker) {
      this.marker = L.marker(coords, { draggable: true})
        .addTo(this.map);

      this.marker.on('dragend', () => this.onDragEndMarker());
    } else {
      this.marker.setLatLng(coords)
    }
  }

  onDragEndMarker() {
    this.onChange([
      this.marker.getLatLng().lat,
      this.marker.getLatLng().lng
    ]);
    this.onTouch();
  }


  writeValue(coords: Coords): void {
    if (coords) {
      this.setCoords(coords);
    }
  }

  ngOnDestroy() {
    this.marker.off('dragend', this.onDragEndMarker)
  }
}
