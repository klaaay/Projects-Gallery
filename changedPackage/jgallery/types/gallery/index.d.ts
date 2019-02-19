import Component from '../component';
import Album from '../album';
import Preview from '../preview/index';
import AlbumItem from '../album-item';
import { CancellablePromise } from '../utils/cancellable-promise';
import Params from './parameters';
export declare class Gallery extends Component {
    protected albums: Album[];
    protected album: Album;
    private item;
    protected preview: Preview;
    protected previewElement: HTMLElement;
    private controlsElement;
    protected left: HTMLElement;
    protected right: HTMLElement;
    private title;
    private transitionCanvas;
    private loading;
    protected params: Params;
    private changingItem;
    constructor(albums: Array<Album>, params?: Params);
    protected initialize(): void;
    static create(albums: Array<Album>, params?: Params): Gallery;
    static createElement(html: string): HTMLElement;
    protected goToItemByCurrentHash(): Promise<void>;
    private findAlbumByAlbumItem;
    protected findItemByCurrentHash(): AlbumItem;
    protected appendControlsElements(elements: HTMLElement[]): void;
    private getItems;
    private findItemByHash;
    protected next(): Promise<void>;
    protected prev(): Promise<void>;
    private showTransitionCanvas;
    private hideTransitionCanvas;
    private refreshTransitionCanvasDimensions;
    private showLoading;
    private hideLoading;
    protected goToItem(item: AlbumItem): CancellablePromise<void>;
    protected goToAlbum(value: number, item?: AlbumItem): Promise<void>;
}
export declare type GalleryConstructor = (new (albums: AlbumItem[], params: Params) => Gallery);
export declare type GalleryDecorator = (constructor: GalleryConstructor) => GalleryConstructor;
export default Gallery;
