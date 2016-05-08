package gamegrid;

import java.awt.Point;

public class Grid {

    private Node grid[][];
    
    public Grid(int rows, int columns){
        grid = new Node[rows][columns];
        init();
    }
    
    public void init(){
        for (int row=0; row < grid.length; row++){
            for (int col=0; col < grid[row].length; col++){
                grid[row][col] = new Node(new Point(row, col));
            }
        }
    }
    
    public void reset(){
        for (int row=0; row < grid.length; row++){
            for (int col=0; col < grid[row].length; col++){
                grid[row][col].unvisit();
            }
        }
    }
    
    public Node getNode(int row, int col){
        try {
            return grid[row][col];  
        } catch (ArrayIndexOutOfBoundsException e) {
               return null;
          }
    }
    
    public int getRows(){
        return grid.length;
    }
    
    public int getColumns(){
        return grid[0].length;
    }
    
    public int getTotalNodes(){
        return grid.length * grid[0].length;
    }
}
