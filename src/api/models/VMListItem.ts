/* tslint:disable */
/* eslint-disable */
/**
 * OpenHPC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { VMListItemMount } from './VMListItemMount';
import {
    VMListItemMountFromJSON,
    VMListItemMountFromJSONTyped,
    VMListItemMountToJSON,
    VMListItemMountToJSONTyped,
} from './VMListItemMount';

/**
 * 
 * @export
 * @interface VMListItem
 */
export interface VMListItem {
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    cid: string;
    /**
     * 
     * @type {Array<VMListItemMount>}
     * @memberof VMListItem
     */
    mount: Array<VMListItemMount>;
    /**
     * 
     * @type {Array<VMListItemMount>}
     * @memberof VMListItem
     */
    port: Array<VMListItemMount>;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    svcTag: string;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    sc: string;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    status: string;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    owner: string;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    project: string;
    /**
     * 
     * @type {string}
     * @memberof VMListItem
     */
    image: string;
}

/**
 * Check if a given object implements the VMListItem interface.
 */
export function instanceOfVMListItem(value: object): value is VMListItem {
    if (!('cid' in value) || value['cid'] === undefined) return false;
    if (!('mount' in value) || value['mount'] === undefined) return false;
    if (!('port' in value) || value['port'] === undefined) return false;
    if (!('svcTag' in value) || value['svcTag'] === undefined) return false;
    if (!('sc' in value) || value['sc'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('owner' in value) || value['owner'] === undefined) return false;
    if (!('project' in value) || value['project'] === undefined) return false;
    if (!('image' in value) || value['image'] === undefined) return false;
    return true;
}

export function VMListItemFromJSON(json: any): VMListItem {
    return VMListItemFromJSONTyped(json, false);
}

export function VMListItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): VMListItem {
    if (json == null) {
        return json;
    }
    return {
        
        'cid': json['cid'],
        'mount': ((json['mount'] as Array<any>).map(VMListItemMountFromJSON)),
        'port': ((json['port'] as Array<any>).map(VMListItemMountFromJSON)),
        'svcTag': json['svc_tag'],
        'sc': json['sc'],
        'status': json['status'],
        'owner': json['owner'],
        'project': json['project'],
        'image': json['image'],
    };
}

export function VMListItemToJSON(json: any): VMListItem {
    return VMListItemToJSONTyped(json, false);
}

export function VMListItemToJSONTyped(value?: VMListItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'cid': value['cid'],
        'mount': ((value['mount'] as Array<any>).map(VMListItemMountToJSON)),
        'port': ((value['port'] as Array<any>).map(VMListItemMountToJSON)),
        'svc_tag': value['svcTag'],
        'sc': value['sc'],
        'status': value['status'],
        'owner': value['owner'],
        'project': value['project'],
        'image': value['image'],
    };
}

