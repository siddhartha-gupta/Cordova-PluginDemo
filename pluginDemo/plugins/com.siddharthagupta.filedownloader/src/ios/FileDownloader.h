//
//  FileDownloader.h
//  
//
//  Created by Siddhartha Gupta on 07/12/14.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>


@interface FileDownloader : CDVPlugin {
    NSMutableArray* params;
}

-(void) downloadFile:(CDVInvokedUrlCommand*)command;

@end